DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS options;
DROP TABLE IF EXISTS event_images;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS scenarios;
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
    initial_setting VARCHAR(200) NOT NULL,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    PRIMARY KEY (scenario_id)
);

INSERT INTO scenarios (initial_setting, name, category)
VALUES
    ('You find yourself on a dusty platform, white smoke all around you...The platform is really busy, with all sorts of people, and someone starts to approach you...', 'Invention of the Steam Engine', 'The Industrial Revolution (1760-1840)'),
    ('', 'The Railway Revolution', 'The Industrial Revolution (1760-1840)'),
    ('', 'Child Labour and Factory Conditions', 'The Industrial Revolution (1760-1840)');

CREATE TABLE questions (
    question_id INT GENERATED ALWAYS AS IDENTITY,
    scenario_id INT NOT NULL,
    question VARCHAR(500) NOT NULL,
    answer VARCHAR(30) NOT NULL,
    correct_response VARCHAR(100) NOT NULL,
    incorrect_response VARCHAR(100) NOT NULL,
    explanation VARCHAR(1000) NOT NULL,
    PRIMARY KEY (question_id),
    FOREIGN KEY (scenario_id) REFERENCES scenarios(scenario_id)
);

INSERT INTO questions (scenario_id, question, answer, correct_response, incorrect_response, explanation)
VALUES
    (1, 'Why hello there! Can you help me out? I''ve got a payment to send for a fancy engine from a guy named James. I can''t remember his last name though...Do you know it?',
    'Watt', 'Ah yes, that''s his name!!', 'Nah, I don''t think that''s quite right ...',
    'James Watt improved the steam engine in the late 1700s. Steam power transformed factories, mining, and transport.'),

    (1, 'The engine''s going to be used on one of those famous trains built by George Stephenson! What was the name of it again?',
    'The Rocket', 'Ah yes, that sounds right!', 'I don''t think that''s quite right',
    'During the Industrial Revolution, railways expanded rapidly. George Stephenson built famous foundational steam locomotives, including the Blücher, Locomotion No. 1, and the famous Rocket. Railways transformed travel and trade.'),

    (1, 'Anyway, got some kids coming to help with the construction. Pity we can''t get in as many as we used to - that''s parliament! The new law they passed in a real pain...',
    'Factory Act 1844', 'Yes, that''s it.', 'Nah, that doesn''t sound right',
    'The government introduced laws to improve working conditions, especially for children. These laws limited working hours and introduced inspections. The Factory Act of 1833 prohibited children under 9 from working in textile mills, restricted hours for children, banned night work, and introduced inspectors. The Factory Act 1844 reduced the minimum age for factory work to 8 and limited hours for children under 13.'),

    (1, 'Thanks so much for your help! Now, you looked quite lost before but I think you''ve figured out where you are now...Why don''t you take a guess!',
    'Railway Revolution','Yes, that''s it.', 'Nah, that doesn''t sound right',
    'The answer is Railway revolution');

CREATE TABLE options (
    option_id INT GENERATED ALWAYS AS IDENTITY,
    question_id INT NOT NULL,
    option_1 VARCHAR(30) NOT NULL,
    option_2 VARCHAR(30) NOT NULL,
    PRIMARY KEY (option_id),
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

INSERT INTO options (question_id, option_1, option_2)
VALUES
    (1, 'Watt', 'Witt'),
    (2, 'The Salamanca', 'The Rocket'),
    (3, 'Factory Act 1833', 'Factory Act 1844'),
    (4, 'Railway Revolution', 'The Act of Union');

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
