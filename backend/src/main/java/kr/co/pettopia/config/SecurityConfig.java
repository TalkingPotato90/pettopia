package kr.co.pettopia.config;

import kr.co.pettopia.model.oauth.service.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(
                        request -> request
                                .requestMatchers(PathRequest.toH2Console()).permitAll() // H2 Console 허용
                                .requestMatchers("/user/**").permitAll()
                                .requestMatchers("/freeboard/**").permitAll()
                                .requestMatchers("/oauth/**").permitAll()
                                .anyRequest().authenticated()) // 나머지는 인증 필요

                .oauth2Login(oauth -> oauth
                        .userInfoEndpoint(userinfo -> userinfo
                                .userService(principalOauth2UserService))  // PrincipalOauth2UserService 사용

                        // 각 소셜 로그인 경로에 대해 공통으로 처리
                        .loginProcessingUrl("/login/oauth2/code/{registrationId}")  // Spring Security가 자동으로 {registrationId}에 해당하는 로그인 URL 처리
                        .defaultSuccessUrl("/home", true)  // 로그인 후 리디렉션되는 페이지
                        .successHandler((request, response, authentication) -> {
                            String redirectUri = request.getParameter("redirect_uri");
                            System.out.println("===============");
                            System.out.println(redirectUri);
                            if (redirectUri != null) {
                                // redirect_uri가 존재하면 해당 URI로 리디렉션
                                response.sendRedirect(redirectUri);
                            } else {
                                // 기본 리디렉션 페이지로 이동
                                response.sendRedirect("http://localhost:3000/home");                            }
                        })
                )

                .logout(logout -> logout
                        .logoutUrl("/logout")  // 로그아웃 경로 설정
                        .logoutSuccessUrl("/home")  // 로그아웃 후 이동할 URL
                        .invalidateHttpSession(true)  // 세션 무효화
                        .clearAuthentication(true)  // 인증 정보 삭제
                        .permitAll()) // 로그아웃은 모두 허용

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
