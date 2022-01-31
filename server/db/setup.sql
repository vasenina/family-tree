-- DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS wall_messages;
DROP TABLE IF EXISTS relations;
DROP TABLE IF EXISTS members;


CREATE TABLE members(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255) ,
      image_url VARCHAR(255),
      birth DATE,
      death DATE,
      gender VARCHAR(255), -- male female, 
      city VARCHAR(255), 
      bio VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE relations(
      id SERIAL PRIMARY KEY,
      member_id INT REFERENCES members(id) NOT NULL,
      relative_id INT REFERENCES members(id) NOT NULL, 
      type VARCHAR(255) NOT NULL, 
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
-- type: parent, child, sibling, other, spouse




CREATE TABLE wall_messages(
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL REFERENCES members(id),
      sender_id INT REFERENCES members(id) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- CREATE TABLE friendships( 
--   id SERIAL PRIMARY KEY, 
--   sender_id INT REFERENCES users(id) NOT NULL,
--   recipient_id INT REFERENCES users(id) NOT NULL,
--   accepted BOOLEAN DEFAULT false);


-- CREATE TABLE chat_messages(
--       id SERIAL PRIMARY KEY,
--       user_id INT NOT NULL REFERENCES users(id),
--       message TEXT NOT NULL,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);












