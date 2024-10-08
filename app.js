const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://chinmaykulkarni165:chinmay1635@cluster0.ojg8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    scores: [{ level: Number, score: Number }],
    totalScore: { type: Number, default: 0 }
});

// User Model
const User = mongoose.model('User', userSchema);

app.post('/api/user/check-username', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user)
            res.json({ userExists: true });
        else
            res.json({ userExists: false });
    } catch (error) {
        console.log('Reached');
        res.status(500).json({ error: 'Error checking username' });
    }
});

app.post('/api/user/save-user', async (req, res) => {
    const { username } = req.body;

    try {
        const user = new User({ username });
        await user.save();
        res.json({ registered: true, user });
    } catch (error) {
        res.status(500).json({ error: 'Error saving user' });
    }
})

// Submit Score
app.post('/api/score/submit-score', async (req, res) => {
    const { username, level, score } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
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
        const reversedLeaderboard = leaderboard.reverse();
        res.json(reversedLeaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching leaderboard' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to the game server!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
