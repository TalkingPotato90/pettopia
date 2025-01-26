package kr.co.pettopia.util;

import java.nio.file.Path;
import java.nio.file.Paths;

public class FilePathManager {
    private FilePathManager() {}

    public static String getImageAbsolutePath() {
        Path currentPath = Paths.get("").toAbsolutePath();
        Path backendPath;

        if (currentPath.endsWith("backend")) {
            backendPath = currentPath;
        } else {
            backendPath = currentPath.resolve("backend");
        }

        return backendPath.resolve("src/main/resources/static/profileImages").toString();
    }
}
