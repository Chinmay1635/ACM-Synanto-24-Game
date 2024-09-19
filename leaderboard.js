window.onload = async function () {
    await fetch('https://acm-synanto-2024-game.vercel.app/api/user/leaderboard')
        .then(response => response.json())
        .then(data => {
            const leaderboardDiv = document.getElementById('leaderboard');

            data.forEach((entry, index) => {
                const card = document.createElement('div');
                card.classList.add('card', 'card1', 'w-[27vw]', 'rounded-md', 'py-20', 'my-5', 'px-[20px]', 'flex', 'flex-col', 'gap-4', 'items-center', 'bg-gradient-to-b', 'from-pink-950', 'to-pink-600');

                card.innerHTML = `
                <img src="/images/numbers/${10 - index}.png" alt="Player Avatar" class="w-[200px] aspect-square" />
                <h1 class="capitalize flex flex-col gap-4  font-light text-2xl tracking-tight">
                   Score - ${entry.totalScore}
                    <span class="font-bold uppercase text-4xl">${entry.username}</span>
                </h1>
            `;

                document.querySelectorAll(".card").forEach(card => {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.7,
                        scrollTrigger: {
                            trigger: card,
                            start: "top 15%",
                            end: "bottom 15%",
                            stagger: 0.4,
                            scrub: true
                        }
                    })
                })

                leaderboardDiv.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching leaderboard:', error);
        });
};

document.querySelectorAll(".card").forEach(card => {
    gsap.to(card, {
        opacity: 0,
        scale: 0.7,
        scrollTrigger: {
            trigger: card,
            start: "top 15%",
            end: "bottom 15%",
            scrub: true
        }
    });
});