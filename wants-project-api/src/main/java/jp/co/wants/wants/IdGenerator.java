package jp.co.wants.wants;

import java.util.UUID;

public class IdGenerator {
    public static final String setPrimaryKey() {
        return UUID.randomUUID().toString();
    }
}
