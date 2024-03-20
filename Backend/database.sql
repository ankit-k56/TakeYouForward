CREATE TABLE submissions(
    id UUID PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(20) NOT NULL,
    stdin TEXT ,
    stdout TEXT 
)