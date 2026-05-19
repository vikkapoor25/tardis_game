DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS event_images;
DROP TABLE IF EXISTS scenarios;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(100) NOT NULL,
    is_student BOOLEAN DEFAULT TRUE,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE scenarios (
    scenario_id INT GENERATED ALWAYS AS IDENTITY,
    initial_setting VARCHAR(200),
    name VARCHAR(100),
    PRIMARY KEY (scenario_id)
);

CREATE TABLE questions (
    question_id INT GENERATED ALWAYS AS IDENTITY,
    scenario_id INT NOT NULL,
    question VARCHAR(100) NOT NULL,
    answer VARCHAR(30) NOT NULL,
    correct_response VARCHAR(100) NOT NULL,
    incorrect_response VARCHAR(100) NOT NULL,
    PRIMARY KEY (question_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id)
);

CREATE TABLE options (
    option_id INT GENERATED ALWAYS AS IDENTITY,
    question_id INT NOT NULL,
    option_value VARCHAR(30) NOT NULL,
    PRIMARY KEY (option_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE event_images (
    image_id INT GENERATED ALWAYS AS IDENTITY,
    scenario_id INT NOT NULL,
    image_url VARCHAR(200) NOT NULL,
    PRIMARY KEY (image_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id)
);

CREATE TABLE scores (
    score_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    scenario_id INT NOT NULL,
    score INT,
    PRIMARY KEY (score_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id)
);