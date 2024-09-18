async function fetchLeaderboard() {
    try {
        const response = await fetch('http://localhost:5000/api/user/leaderboard');
        const leaderboard = await response.json();

        // Display the leaderboard on the frontend
        const leaderboardElement = document.getElementById('leaderboard');
        leaderboardElement.innerHTML = '<h2>Leaderboard</h2>';
        leaderboard.forEach((user, index) => {
            leaderboardElement.innerHTML += `<p>${index + 1}. ${user.username} - Total Score: ${user.totalScore}</p>`;
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
}
