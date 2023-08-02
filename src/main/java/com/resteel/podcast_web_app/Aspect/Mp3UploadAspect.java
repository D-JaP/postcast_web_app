package com.resteel.podcast_web_app.Aspect;

import com.resteel.podcast_web_app.Utils.utils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.Instant;

@Aspect
@Component
public class Mp3UploadAspect {
    @Value("${upload.dir}")
    private Resource uploadDir;
    @Value("classpath:static/images/cover_img")
    private Resource imgUploadDir;

    @Pointcut("execution(* com.resteel.podcast_web_app.Service.PodcastService.addPodcast(..))")
    public void uploadPodcast(){}

    @AfterReturning(pointcut = "uploadPodcast()", returning = "result")
    public void uploadFile(JoinPoint joinPoint, Object result){
        if (result.toString() == "Success"){
            Object[] args = joinPoint.getArgs();
            String title = Instant.now().getEpochSecond() + "";
            for (Object arg : args){
                if (arg == args[0]){
                    title = (String) arg;
                }
                if(arg instanceof MultipartFile){
                    MultipartFile file = (MultipartFile) arg;

                    if (file.isEmpty()) {
                        throw new RuntimeException("File Upload Failed");
                    }
                    else {
                        if (file.getContentType().startsWith("audio/")){
                            try {
                                String originalFileName = file.getOriginalFilename().toString().split("\\.")[0];
                                String newFileName = utils.toSlug(originalFileName) + ".mp3";
                                File directory = new File(uploadDir.getURL().toURI());
                                if(!directory.exists()){
                                    directory.mkdirs();
                                }
                                File destFile = new File(directory.getAbsolutePath() + File.separator + newFileName);
                                file.transferTo(destFile);
                            }
                            catch (Exception ex){
                                System.out.println("Save video failed.");
                            }
                        }
                        else if (file.getContentType().startsWith("image/")){
                            try {
                                String[] fileName = file.getOriginalFilename().toString().split("\\.");
                                String newFileName = utils.toSlug(title) + "." + fileName[fileName.length-1];
                                File directory = new File(imgUploadDir.getURL().toURI());
                                if(!directory.exists()){
                                    directory.mkdirs();
                                }
                                File destFile = new File(directory.getAbsolutePath() + File.separator + newFileName);
                                file.transferTo(destFile);
                            }
                            catch (Exception ex){
                                System.out.println("Save images failed." + ex.getMessage());
                            }
                        }

                    }
                }
            }
        }
    }
}
