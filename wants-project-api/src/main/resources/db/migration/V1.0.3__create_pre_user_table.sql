CREATE TABLE IF NOT EXISTS pre_users (
 id serial not null primary key
 , user_id varchar not null
 , email varchar not null unique
);
