package jp.co.wants.wants.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jp.co.wants.wants.IdGenerator;
import jp.co.wants.wants.domain.LoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class SuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        final var principal = (LoginUser) authentication.getPrincipal();
        // TODO: tokenのセットを行う
        String token = JwtTokenGenerator.generate(principal);
        response.setHeader("Authorization", String.format("Bearer %s", token));

        // ユーザー情報をレスポンスに含める
        PrintWriter writer = response.getWriter();
        ObjectMapper objectMapper = new ObjectMapper();
        writer.println(objectMapper.writeValueAsString(principal.getUser()));
        writer.flush();
        writer.close();
        clearAuthentication(request);
    }

    private void clearAuthentication(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }
}
