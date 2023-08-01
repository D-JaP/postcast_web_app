package com.resteel.podcast_web_app.Utils;

public class utils {
    public static String toSlug(String input) {
        if (input == null) {
            return "";
        }
        String slug = input.replaceAll("[^\\w\\-]", " ");
        slug = slug.trim();
        slug = slug.replaceAll("\\s+", "-");
        slug = slug.toLowerCase();

        return slug;
    }
}
