CREATE TABLE submissions(
    id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    code TEXT NOT NULL,
    language VARCHAR(30) NOT NULL,
    stdin TEXT NOT NULL,    
)