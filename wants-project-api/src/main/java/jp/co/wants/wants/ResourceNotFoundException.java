package jp.co.wants.wants;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Resource is not Found")
public class ResourceNotFoundException extends Exception {
    public ResourceNotFoundException(String msg) {
        super(msg);
    }
}
