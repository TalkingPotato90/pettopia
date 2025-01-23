package kr.co.pettopia.config;

import kr.co.pettopia.model.oauth.handler.CustomAuthenticationSuccessHandler;
import kr.co.pettopia.model.oauth.service.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
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
                // CORS 필터 추가
                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class)

                // 권한 및 인증 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(PathRequest.toH2Console()).permitAll() // H2 Console 허용
                        .requestMatchers("/profileImages/**").permitAll() // 프로필 이미지 경로 허용
                        .requestMatchers("/freeboard/**").permitAll() // 자유 게시판 경로 허용
                        .requestMatchers("/oauth/**").permitAll() // OAuth 관련 경로 허용
                        .requestMatchers("/home/login/**").permitAll() // 로그인 관련 경로 허용
                        .anyRequest().authenticated() // 나머지 요청은 인증 필요
                )

                // OAuth2 로그인 설정
                .oauth2Login(oauth -> oauth
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(principalOauth2UserService)) // 사용자 정보를 처리하는 서비스 지정
                        .loginProcessingUrl("/login/oauth2/code/{registrationId}") // OAuth2 로그인 URL 처리
                        .successHandler(new CustomAuthenticationSuccessHandler()) // 로그인 성공 시 처리 핸들러
                )

                // 로그아웃 설정
                .logout(logout -> logout
                        .logoutUrl("/logout") // 로그아웃 URL
                        .logoutSuccessUrl("http://localhost:3000/home") // 로그아웃 성공 후 이동 경로
                        .invalidateHttpSession(true) // 세션 무효화
                        .clearAuthentication(true) // 인증 정보 제거
                        .permitAll()
                )

                // CSRF 비활성화 설정
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers(PathRequest.toH2Console()) // H2 Console 관련 CSRF 비활성화
                        .ignoringRequestMatchers("/oauth/**") // OAuth 경로 관련 CSRF 비활성화
                        .disable()
                )

                // H2 Console 관련 헤더 설정
                .headers(headers -> headers
                        .frameOptions(frame -> frame.sameOrigin()) // 동일 출처에서 iframe 허용
                )

                // 예외 처리 설정
                .exceptionHandling(exceptions -> exceptions
                        // 인증되지 않은 요청 처리 (401 Unauthorized 반환)
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.sendError(401, "Unauthorized Access");
                        })
                        // 인증은 되었지만 권한이 없는 요청 처리 (403 Forbidden 반환)
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.sendError(403, "Forbidden");
                        })

                );

        return http.build();
    }
}
