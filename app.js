const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://chinmaykulkarni165:chinmay1635@cluster0.ojg8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    scores: [{ level: Number, score: Number }],
    totalScore: { type: Number, default: 0 }
});

// User Model
const User = mongoose.model('User', userSchema);

// API Routes

// Submit Score
app.post('/api/score/submit-score', async (req, res) => {
    const { username, level, score } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            // Create a new user if they don't exist
            user = new User({ username, scores: [{ level, score }], totalScore: score });
        } else {
            // Update the score for the current level or add a new level
            const levelIndex = user.scores.findIndex(s => s.level === level);

            if (levelIndex >= 0) {
                // Update score for existing level
                user.totalScore -= user.scores[levelIndex].score; // Subtract old score
                user.scores[levelIndex].score = score;
            } else {
                // Add a new level score
                user.scores.push({ level, score });
            }

            // Update total score
            user.totalScore += score;
        }

        await user.save();
        res.json({ message: 'Score submitted successfully!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error submitting score' });
    }
});

// Get Leaderboard
app.get('/api/user/leaderboard', async (req, res) => {
    try {
        const leaderboard = await User.find().sort({ totalScore: -1 }).limit(10);
        res.json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
