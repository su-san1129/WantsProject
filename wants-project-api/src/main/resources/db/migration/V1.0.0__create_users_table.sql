-- ユーザー
DROP TABLE if exists users cascade;

CREATE TABLE users (
 id serial not null primary key
 , user_id varchar not null
 , name varchar not null
 , mail_address varchar not null unique
 , password varchar not null
 , role varchar not null
 , is_member boolean default false
) ;

-- ユーザー　サンプル (password: admin)
INSERT INTO users (user_id, name, mail_address, password, role, is_member) VALUES ('user1', 'user1', 'user@wants.co.jp', '$2a$10$Yj/Vp9YW6r0RwsUWa4bvTecsu0jRLYMZgMziXFapsKggLF5vNJguO', 'ADMIN', 'true');