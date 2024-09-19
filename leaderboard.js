
// List of dynamic images to assign (you can update with actual player images)
const playerImages = [
    "/images/player1.png",  // Image for player 1
    "/images/player2.png",  // Image for player 2
    "/images/player3.png",  // Image for player 3
    "/images/player4.png",  // Image for player 4
    "/images/player5.png",  // Image for player 5
];

window.onload = function() {
    fetch('https://acm-synanto-2024-game.vercel.app/api/user/leaderboard')
    .then(response => response.json())
    .then(data => {
        const leaderboardDiv = document.getElementById('leaderboard');
        
        data.forEach((entry, index) => {
            const card = document.createElement('div');
            card.classList.add('card', 'card1', 'w-[27vw]', 'rounded-lg', 'py-20', 'my-5', 'px-[20px]', 'flex', 'flex-col', 'gap-4', 'items-center', 'bg-[#2e251e]');
            
            // Dynamically assign images based on the rank or player data
            const playerImage = playerImages[index % playerImages.length]; // Loop through images for each player

            card.innerHTML = `
                <img src="${playerImage}" alt="Player Avatar" class="w-[150px] aspect-square" />
                <h1 class="capitalize font-thin text-3xl">
                    ${entry.totalScore} <br />
                    <span class="font-bold uppercase">${entry.username}</span>
                </h1>
            `;

            document.querySelectorAll(".card").forEach(card=>{
                gsap.to(card,{
                    opacity:0,
                    scale:0.7,
                    scrollTrigger:{
                        trigger:card,
                        start:"top 12%",
                        end:"bottom 12%",
                        stagger:0.5,
                        scrub:true
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

// document.querySelectorAll(".card").forEach(card=>{
//     gsap.to(card,{
//         opacity:0,
//         scale:0.7,
//         scrollTrigger:{
//             trigger:card,
//             start:"top 15%",
//             end:"bottom 15%",
//             scrub:true
//         }    
//     })
// })

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