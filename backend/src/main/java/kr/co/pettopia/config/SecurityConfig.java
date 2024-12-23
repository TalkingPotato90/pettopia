package kr.co.pettopia.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(
                request -> request
                        .requestMatchers(PathRequest.toH2Console()).permitAll() // H2 Console 허용
                        .requestMatchers("/api/**").permitAll() // API 요청 허용
                        .requestMatchers("/oauth/**").permitAll()
                        .anyRequest().authenticated()) // 나머지는 인증 필요
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers(PathRequest.toH2Console())// H2 Console CSRF 비활성화
                        .ignoringRequestMatchers("/oauth/**")// OAuth CSRF 비활성화
                        .disable()) // API 요청 CSRF 비활성화
                .cors(Customizer.withDefaults()) // 기본 CORS 설정
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)); // H2 Console 설정
        return http.build();
    }
}
