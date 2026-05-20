TRUNCATE TABLE options, event_images, scores, questions, scenarios, users RESTART IDENTITY;

INSERT INTO scenarios (initial_setting, name, category)
VALUES
    ('You find yourself on a dusty platform, white smoke all around you...The platform is really busy, with all sorts of people, and someone starts to approach you...', 'Invention of the Steam Engine', 'The Industrial Revolution (1760-1840)'),
    ('', 'The Railway Revolution', 'The Industrial Revolution (1760-1840)'),
    ('', 'Child Labour and Factory Conditions', 'The Industrial Revolution (1760-1840)');

INSERT INTO questions (scenario_id, question, answer, correct_response, incorrect_response, explanation)
VALUES
    (1, 'I don''t know, I just build things. Got this fancy engine from a bloke named James. The efficiency of this steam engine''s incredible! Can''t remember his last name though. Do you know it?',
    'Watt', 'Ah yes, that''s his name!!', 'Nah, I don''t think that''s quite right ...',
    'James Watt improved the steam engine in the late 1700s. Steam power transformed factories, mining, and transport.'),

    (1, 'The engine''s going to be used on one of those famous trains built by George Stephenson! What was the name of it again?',
    'The Rocket', 'Ah yes, that sounds right!', 'I don''t think that''s quite right',
    'During the Industrial Revolution, railways expanded rapidly. George Stephenson built famous foundational steam locomotives, including the Blücher, Locomotion No. 1, and the famous Rocket. Railways transformed travel and trade.'),

    (1, 'We''ve had kids filling the numbers for years now. Shame we can''t get as many in as we used to. Lots of them were under thirteen, but bloody Parliament brought in a new law stopping them from working. What was that act called again?',
    'Factory Act 1844', 'Yes, that''s it.', 'Nah, that doesn''t sound right',
    'The government introduced laws to improve working conditions, especially for children. These laws limited working hours and introduced inspections. The Factory Act of 1833 prohibited children under 9 from working in textile mills, restricted hours for children, banned night work, and introduced inspectors. The Factory Act 1844 reduced the minimum age for factory work to 8 and limited hours for children under 13.'),

    (1, 'Thanks so much for your help! Now, you looked quite lost before but I think you''ve figured out where you are now...Why don''t you take a guess!', 'The Industrial Revolution (1760-1840)', 'Yes, of course we are! Where did you think we were?', 'What are you talking about? Had too much to drink?', '');

INSERT INTO options (question_id, option_1, option_2)
VALUES
    (1, 'Watt', 'Witt'),
    (2, 'The Salamanca', 'The Rocket'),
    (3, 'Factory Act 1833', 'Factory Act 1844');
