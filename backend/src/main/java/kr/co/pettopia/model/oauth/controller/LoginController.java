package kr.co.pettopia.model.oauth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class LoginController {

    @GetMapping("/home/login")
    public void loginPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 현재 요청 URL을 세션에 저장
        String currentPage = request.getRequestURL().toString();
        System.out.println("현재 페이지 URL: " + currentPage);

        // 쿼리 파라미터로 전달된 prevPage 값 읽기
        String prevPage = request.getParameter("prevPage");
        System.out.println("이전 페이지 URL (prevPage 파라미터): " + prevPage);

        if (prevPage != null) {
            request.getSession().setAttribute("prevPage", prevPage); // 세션에 저장
        }

        // 프론트엔드의 /home/login으로 리디렉션
        response.sendRedirect("http://localhost:3000/home/login");
    }
}
