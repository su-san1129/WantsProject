-- ユーザー
DROP TABLE if exists users cascade;

CREATE TABLE users (
 id serial not null primary key
 , user_id varchar not null
 , name varchar not null
 , email varchar not null unique
 , password varchar not null
 , role varchar not null
) ;

-- ユーザー　サンプル (password: admin)
INSERT INTO users (user_id, name, email, password, role) VALUES ('user1', 'user1', 'user@wants.co.jp', '$2a$10$Yj/Vp9YW6r0RwsUWa4bvTecsu0jRLYMZgMziXFapsKggLF5vNJguO', 'ADMIN');