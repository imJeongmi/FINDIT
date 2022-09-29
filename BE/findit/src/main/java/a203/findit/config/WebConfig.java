package a203.findit.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    private String frontUrl = "http://localhost:3000";

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
//                .allowedOrigins("frontUrl")
//                .allowedOriginPatterns("*")
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
//                .allowCredentials(true)
                .allowedHeaders("*")
                .maxAge(6000);
    }
}
