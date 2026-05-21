# TARDIS Time Travel Game

## Overview
 TARDIS is an educational deduction game designed to make learning more interactive and engaging for students. Players travel back in time to different historical scenarios without knowing the exact time period or event they are in. By interacting with NPCs, analysing clues, and answering questions, players gradually uncover the scenario and progress through the game. The project combines education and gameplay through immersive storytelling and interactive dialogue. The current MVP focuses on scenarios based around the Industrial Revolution.

## Current Features

- Interactive historical scenario
- NPC dialogue and clue-based gameplay
- Multiple-choice questions
- Educational explanations after answers with results
- User login and registration

# How to Install and Run
1. Clone the repository to your machine using 'git clone' 

2. cd into tardis_game and open
3. cd into the 'api' folder
4. Install the required dependencies using: <br>
 'npm i -y' <br>
 then enter: <br>
  'npm install express cors pg dotenv, nodemon, bcrypt, jsonwebtoken'
  5. Create a '.env' file in the root folder 'TARDIS_game' <br>
  Set PORT=3000
  DB_URL=your_postgresql_connection_url
  6. Run the script in your terminal to setup the database 'npm run setup-db'
  7. Run the application 'npm run dev'. The API will run on http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | / | Returns API information |
| GET | /scenarios | Returns gameplay questions |
| GET | /explanations | Returns explanations and feedback |

  # Future Features
- **More Scenarios** – Adds variety and improves replayability.
- **Audio Support** – Improves accessibility for auditory learners.
- **Teacher-Created Scenarios** – Allows lessons to be tailored to students.
- **Subject Categories** – Makes navigation and organisation easier.
- **AI-Generated NPC Dialogue** – Creates more immersive interactions.
- **Score & Leaderboards** – Encourages engagement and competition.

## Contributors
- **Vikram** - Project Facilitator & Backend Developer
- **Tooba** - Front End Developer
- **Ash** - Front End Developer
- **Anthony** - Backend Developer
- **Sajanth** - Front & Backend Developer
