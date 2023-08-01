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

@Aspect
@Component
public class Mp3UploadAspect {

    @Value("${upload.dir}")
    private Resource uploadDir;
    @Pointcut("execution(* com.resteel.podcast_web_app.Service.PodcastService.addPodcast(..))")
    public void uploadPodcast(){}

    @AfterReturning(pointcut = "uploadPodcast()", returning = "result")
    public void uploadFile(JoinPoint joinPoint, Object result){
        if (result.toString() == "Success"){
            Object[] args = joinPoint.getArgs();
            for (Object arg : args){
                if(arg instanceof MultipartFile){
                    MultipartFile file = (MultipartFile) arg;
                    if (file.isEmpty()) {
                        throw new RuntimeException("File Upload Failed");
                    }
                    else {
                        try {
                            String originalFileName = file.getOriginalFilename().toString().split("\\.")[0];
                            System.out.println(originalFileName);
                            String newFileName = utils.toSlug(originalFileName) + ".mp3";
                            File directory = new File(uploadDir.getURL().toURI());
                            if(!directory.exists()){
                                directory.mkdirs();
                            }
                            File destFile = new File(directory.getAbsolutePath() + File.separator + newFileName);
                            file.transferTo(destFile);
                        }
                        catch (Exception ex){
                            System.out.println("Save failed.");
                        }
                    }
                }
            }
        }
    }
}
