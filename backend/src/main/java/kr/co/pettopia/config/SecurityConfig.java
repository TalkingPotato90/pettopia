package kr.co.pettopia.config;

import kr.co.pettopia.model.oauth.handler.CustomAuthenticationSuccessHandler;
import kr.co.pettopia.model.oauth.service.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Autowired
    private CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class) // corsFilter 추가
                .authorizeHttpRequests(
                        request -> request
                                .requestMatchers(PathRequest.toH2Console()).permitAll() // H2 Console 허용
//                        .requestMatchers("/user/**").permitAll()
                                .requestMatchers("/profileImages/**").permitAll()
                                .requestMatchers("/freeboard/**").permitAll()
                                .requestMatchers("/oauth/**").permitAll()
                                .requestMatchers("/home/login/**").permitAll()
                                .anyRequest().authenticated()) // 나머지는 인증 필요
                .oauth2Login(oauth -> oauth //ouath 로그인
                        .userInfoEndpoint(userinfo -> userinfo 
                                .userService(principalOauth2UserService))  // PrincipalOauth2UserService 사용
                        .loginProcessingUrl("/login/oauth2/code/{registrationId}")  // Spring Security가 자동으로 {registrationId}에 해당하는 로그인 URL 처리
                        .successHandler(new CustomAuthenticationSuccessHandler()))  // 로그인 성공 후 처리 핸들러
                .logout(logout -> logout
                        .logoutUrl("/logout")  // 로그아웃 경로 설정
                        .logoutSuccessUrl("http://localhost:3000/home")  // 로그아웃 후 이동할 URL
                        .invalidateHttpSession(true)  // 세션 무효화
                        .clearAuthentication(true)  // 인증 정보 삭제
                        .permitAll()) // 로그아웃은 모두 용
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers(PathRequest.toH2Console())// H2 Console CSRF 비활성화
                        .ignoringRequestMatchers("/oauth/**")// OAuth CSRF 비활성화
                        .disable()) // API 요청 CSRF 비활성화

                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)); // H2 Console 설정
        return http.build();
    }
}