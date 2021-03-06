CREATE TABLE IF NOT EXISTS wish_items (
  id serial NOT NULL
  , user_id VARCHAR(255) NOT NULL
  , name VARCHAR(255) DEFAULT NULL
  , price INT DEFAULT NULL
  , sale_price INT DEFAULT NULL
  , url VARCHAR NOT NULL
  , image_path VARCHAR(255) NOT NULL
  , created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  , updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  , PRIMARY KEY(id)
);