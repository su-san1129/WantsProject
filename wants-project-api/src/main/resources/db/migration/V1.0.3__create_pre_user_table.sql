CREATE TABLE IF NOT EXISTS pre_users (
 id serial not null primary key
 , user_id varchar not null
 , name varchar not null
 , email varchar not null unique
 , password varchar not null
 , created_at TIMESTAMP not null
);
