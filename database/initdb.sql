/*
Database Schema and Data Initialization Script
This script creates tables for storing groups, users, and messages in a MySQL database.
It also inserts sample data into these tables.
Sample data only used in local testing enviroment!
*/

-- Create a table to store groups
CREATE TABLE `groups`(
    id CHAR(36) PRIMARY KEY,    -- Unique identifier for the group
    name VARCHAR(255)           -- Name of the group
);

-- Insert sample data into the groups table
INSERT INTO `groups` (id, name)
VALUES
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', '397ba23209b6b298315e88adda88b4d478b54415e67202157ac6f6c69da336a43cae46344d7ef444193a4794202a5a158442c19ed99a7dd2ad3582c894975239');

-- Create a table to store users
CREATE TABLE users(
    id CHAR(36) PRIMARY KEY,    -- Unique identifier for the user
    username VARCHAR(255),      -- User's username
    password VARCHAR(255)       -- User's password (Note: This should be encrypted in a real application)
);

-- Insert sample data into the users table
INSERT INTO users (id, username, password) 
VALUES
    ('efa8c647-81f2-4512-bbf1-601526006939', 'ef2c8fde52eaba2e9b86f2c42b10eb72fc9f3b7aebb410cf53068870110fc1f3c7e20cb7fec56a6d9e41a7ce6ae907548f3b2fced13c22d281ee37f8c6b60d4d', 'cf2ed8f4580c8f3aaf03bdd2e3b5046a806b7ab303531835b63af92fe770232e13421641ff547098447d6365804897861962d1e8a684697c9fcda0de9dcef5b4'),
    ('1b7f80bb-7985-419d-aed3-25ea8ea985fa', 'fa670be93ae02a1af6a02b35b248d85d93782f3d11ad52b2bbf2411638ec4dd4b36ad8bc8015725b875e53fb480e55708670e568214699f38dd20210c8514e28', 'ac8bff9b8ff59f39677b0f6e9d1161d5fdbf3fa4466e5bad7f478f84f59c878aab13888bf4e7247122a57cac001ed3bb31c81a057ed45438a30cae63ea1c5e71');

-- Create a table to store messages
CREATE TABLE messages(
    id INT PRIMARY KEY AUTO_INCREMENT,    -- Unique identifier for the message
    groupId CHAR(36),                     -- ID of the group to which the message belongs
    sender VARCHAR(255),                  -- Sender of the message
    timestamp DATETIME,                   -- Timestamp of the message
    text TEXT                             -- Content of the message
);

-- Insert sample data into the messages table
INSERT INTO messages (groupId, sender, timestamp, text)
VALUES
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX1+NQmZW5qzIy1J9bo601Cm4+TuCpOFxdKZKNZIyPlVAvsA+9GqAaPHE'),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX1+51AyzUr7CCfBs4+O0/fmYCNg5vE2ec0XewQtjo6iYdfuCu8mqMxFc'),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX18a4km4xMlQNnZCKci2ADN2eEPhXHpmUrluYUHaJbLThXEaG2Q9ls2JWQvyND4qlyBimDkVmvMvLWiwX9Rh7HLYsDT/HauXRDo='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX18mvEK4IvlmfY9Nd+nvX8Xsh2ivy1xIYbErWAp7Ih8ZDpc5eZLIBDEdp7uBEzFD7WB03IOAU6k/aTPjHQHBddCLE489Z71gvl8='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX1+gQZNkkK4/oWZP/Es94Z3hWz8ktM4LJeBg3rYdEUS1ezwr/B3VLVnrL7/9XHEd7Jmkp4p+1XEMObtZJnSFQ4wJqtuhStakKTS8UKlpMYdJMLn1Z2gef/en'),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX1+/FwTO2U1N2vWLTGLuejSpZTbPSlWFre5WsCY+VJYHrMPB+52dPlyu3UAL8HXs7L4gOlI5yAbotA=='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX1+rSPDVprmj/DXXj5THOxgLcW9iy3CSgiQkZDCv8vv0mcB9q/A3uqaCugIiSbmaTnnfFNAGQ30ztA=='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX1+KQC9whMiSrR+yVCnkc6bpu0qaBtL2eSQW7Pj150KnwDl89pctfFNo'),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX19I1fqwzQ6XqCW+yQQE1T8/lUOA4DD03vEqZzb+2W8GftH7NqzP8hdB'),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX18suInlZt2apZBWbvTVECE8V1EGGvrT/9oO80dHFeOuBbAGo2XU2w31GdJqCN7IvilYyfMKlgXKvA=='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX1+150PLxHV2CoOgIL/NXR5ya1O8XtkCAHkAVY8hjWKGBPhm15s1SuBx'),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX18XqdV5oED60gzosrRg2ihvc/Ddo+SbYcqWpqh4gKKKA391dz9Wsc6rsmu6wS8pkZZ6oQFjCfvHng=='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX18+v04og1f2xWJylBT4ozPPo8LrxwsXOxeW2n2oGP0/yAiw6PRJpwwQnH81Kq/eG762z1PeoxyZHQ=='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX19M4imXPkc9O74Ulfy9Rq85dxnLKF9VEq8='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX19vbfxzQ/1mJqv2/65S84hVo+laa4jCWKH0QwK/Mn4W5tpm9YeujDd9IZ+PPbzDTc3EEBczhlhHBg=='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+JzvVf5dktCXLoK83akmnxOef6sTjLer8=', NOW(), 'U2FsdGVkX1+od/gcweqwDhLcbOVXz7XmEWz0kMTANuQ='),
    ('7c60877f-d00e-4321-b8a7-d2d4d06195af', 'U2FsdGVkX1+2FbvG2sHjaf6zb/7VALsGX4Hd7HrXW8U=', NOW(), 'U2FsdGVkX19JChEqsDphdTp1xbefN10E+bJtUJL6yCo=');

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; flush privileges;