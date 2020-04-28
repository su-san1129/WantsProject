package jp.co.wants.wants;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WantsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WantsApplication.class, args);
		System.out.println("ResourcePath.USERS = " + ResourcePath.USERS);
	}

}
