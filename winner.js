// Optionally, if you want balloons to appear after some delay
// window.onload = function() {
//     const balloons = document.querySelectorAll('.balloon');
//     balloons.forEach((balloon, index) => {
//         setTimeout(() => {
//             balloon.style.display = 'block';
//         }, index * 500); // Balloons appear one after the other
//     });
// };
// script.js

document.getElementById("score").innerText = localStorage.getItem("totalScore");
window.onload = function() {
    console.log("Page loaded, balloons are rising!");
};
