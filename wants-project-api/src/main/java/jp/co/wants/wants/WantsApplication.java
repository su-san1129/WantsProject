package jp.co.wants.wants;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class WantsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WantsApplication.class, args);
	}

}
