
# ACM SYNANTO 24 - Image Puzzle Game

Welcome to the **ACM SYNANTO 24**! This is an engaging image puzzle game designed to challenge players with progressively complex puzzles. The game encourages logical thinking and pattern recognition through an interactive leaderboard system and dynamic gameplay.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Gameplay](#gameplay)
- [API Documentation](#api-documentation)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Overview

**ACM SYNANTO 24** is a web-based image puzzle game where players rearrange scrambled images to form complete pictures. Each level increases in difficulty, and players can track their scores and rankings on the leaderboard.

## Features

- **Dynamic Levels**: Progressive puzzle levels that increase in complexity.
- **Leaderboard**: Tracks top player scores across all levels.
- **Username Validation**: Ensures unique usernames upon registration.
- **Real-Time Feedback**: Score updates upon puzzle completion.
- **Image Randomization**: Randomly selects images for each level.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Deployment**: Hosted on Vercel

## Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Chinmay1635/ACM-SYNANTO-24.git
    ```
2. **Install Dependencies**:
    ```bash
    cd ACM-SYNANTO-24
    npm install
    ```
3. **Configure the Database**:
    - Ensure MongoDB is running locally or configure a remote connection.
    - Create a database named `game`.
4. **Run the Server**:
    ```bash
    npm start
    ```

5. **Access the Game**:
    - Open a browser and go to `http://localhost:3000`.

## Gameplay

- **Objective**: Solve each puzzle by rearranging tiles to form the correct image.
- **Score Submission**: Scores are recorded upon puzzle completion.
- **Leaderboard**: Accessible after each level, displaying top scores.

## API Documentation

### User Registration

- **Endpoint**: `POST /api/user/register`
- **Description**: Registers a new user with a unique username.
- **Body Parameters**:
    - `username`: The player's chosen username.

### Score Submission

- **Endpoint**: `POST /api/score/submit-score`
- **Description**: Submits the score for a completed level.
- **Body Parameters**:
    - `username`: Player's username.
    - `level`: The level completed.
    - `score`: Player's score.

### Leaderboard

- **Endpoint**: `GET /api/user/leaderboard`
- **Description**: Retrieves top players' scores.

