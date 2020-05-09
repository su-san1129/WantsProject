package jp.co.wants.wants.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jp.co.wants.wants.domain.LoginUser;

import java.util.Date;

public class JwtTokenGenerator {
    private static final Long EXPIRATION_TIME = 1000L * 60L * 100L;

    public static String generate(LoginUser loginUser) {
        String secretKey = "SecretKey";
        Date issuedAt = new Date();
        Date expiresAt = new Date(issuedAt.getTime() + EXPIRATION_TIME);

        Algorithm algorithmHS = Algorithm.HMAC256(secretKey);
        return JWT.create()
                .withSubject(loginUser.getUser().getUserId())
                .withIssuedAt(issuedAt)
                .withExpiresAt(expiresAt)
                .sign(algorithmHS);
    }


}
