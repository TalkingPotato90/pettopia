package kr.co.pettopia.config;

import kr.co.pettopia.util.FilePathManager;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry resourceHandlerRegistry) {
        String absolutePath = FilePathManager.getImageAbsolutePath();
        resourceHandlerRegistry.addResourceHandler("/profileImages/**")
                .addResourceLocations("file:" + absolutePath + "/");
    }
}
