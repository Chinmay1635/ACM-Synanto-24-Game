function loaderAnime() {
    gsap.to("#loader", {
        transform: "translateY(-100%)",
        duration: 2,
        delay: 1.8,
    }, "anim")

    //text anime

    var loaderh1 = document.querySelector("#loader h1");

    var loadertext = loaderh1.textContent.split("");

    var loaderclutter = "";
    loadertext.forEach(function (elem) {
        if (elem === " ") {
            loaderclutter += `<span>&nbsp;</span>`
        } else {
            loaderclutter += `<span>${elem}</span>`
        }

    })

    loaderh1.innerHTML = loaderclutter;
    let tl = gsap.timeline();
    tl.from("#loader span", {
        y: -100,
        duration: 0.3,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.1,

    }, "anim")

    var loaderh2 = document.querySelector("#h2");

    var loadertext2 = loaderh2.textContent.split("");

    var loaderclutter2 = "";
    loadertext2.forEach(function (elem) {

        if (elem === " ") {
            loaderclutter2 += `<span>&nbsp;</span>`
        } else {
            loaderclutter2 += `<span>${elem}</span>`
        }

    })
    loaderh2.innerHTML = loaderclutter2;
    tl.from("#h2 span", {
        y: 100,
        duration: 0.3,
        opacity: 0,
        ease: "expo.out",
        stagger: 0.1,

    })

}
loaderAnime();




var loaderh1 = document.getElementById("title");
var loadertext = loaderh1.textContent.split("");

var loaderclutter = "";
loadertext.forEach(function (elem) {
    loaderclutter += `<span>${elem}</span>`
})

loaderh1.innerHTML = loaderclutter;
gsap.from("#title span", {
    y: 100,
    duration: 0.5,
    opacity: 0,
    ease: "expo.out",
    stagger: 0.1,
    delay: 2.9,

})

// Function to save username and show the game container
async function saveUsername() {
    const username = document.getElementById('username').value;

    if (username.trim() === "") {
        await Swal.fire({
            title: "Oops..",
            text: "Please enter a valid username.",
            icon: "error"
        });
        return;
    } else {
        fetch('https://acm-synanto-24-game.onrender.com/api/user/check-username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.trim().toLowerCase()
            })
        })
            .then(res => res.json())
            .then(async res => {
                if (res.userExists) {
                    await Swal.fire({
                        title: "Oops..",
                        text: "Username already exists. Please choose a different username.",
                        icon: "error"
                    });
                    return;
                } else {
                    fetch('https://acm-synanto-24-game.onrender.com/api/user/save-user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username.trim().toLowerCase()
                        })
                    })
                        .then(res => res.json())
                        .then(async res => {
                            if (res.registered) {
                                await Swal.fire({
                                    title: "Hurray...",
                                    text: "Username saved successfully!",
                                    icon: "success"
                                });
                                document.cookie = `username=${res.user._id}; max-age=86400`;
                                localStorage.setItem('username', res.user.username);
                                localStorage.setItem('progress', 1);
                                startGame();
                            } else {
                                await Swal.fire({
                                    title: "Oops..",
                                    text: "Error saving username. Please try again.",
                                    icon: "error"
                                });
                            }
                        }).catch(error => {
                            console.error('Error:', error);
                        });
                }
            }).catch(error => {
                console.error('Error:', error);
            });
    }
}

function startGame() {
    window.location.href = '/ACM-SLIDER/levels.html';
}