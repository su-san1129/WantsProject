CREATE TABLE IF NOT EXISTS pre_users (
 id serial not null primary key
 , user_id varchar not null
 , mail_address varchar not null unique
);
