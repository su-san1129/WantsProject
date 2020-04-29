-- ユーザー
DROP TABLE if exists users cascade;

CREATE TABLE users (
 id serial primary key
 , name varchar not null
 , mail_address varchar not null unique
 , password varchar not null
 , role varchar not null
) ;

-- ユーザー　サンプル (password: admin)
INSERT INTO users (name, mail_address, password, role) VALUES ('user1', 'user@wants.co.jp', '$2a$10$Yj/Vp9YW6r0RwsUWa4bvTecsu0jRLYMZgMziXFapsKggLF5vNJguO', 'MEMBER');