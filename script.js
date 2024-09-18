function loaderAnime(){
    gsap.to("#loader",{
        transform:"translateY(-100%)",
        duration:2,
        delay:1.8,
    },"anim")

    //text anime

    var loaderh1 = document.querySelector("#loader h1");
    
        var loadertext = loaderh1.textContent.split("");

    var loaderclutter = "";
    loadertext.forEach(function (elem) {
        if(elem === " "){
            loaderclutter += `<span>&nbsp;</span>`
        }else{
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
        
        if(elem === " "){
            loaderclutter2 += `<span>&nbsp;</span>`
        }else{
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
        delay:2.9,
        
    })

    // Function to save username and show the game container
function saveUsername() {
    const username = document.getElementById('username').value;

    if (username.trim() === "") {
        alert("Please enter a valid username.");
        return;
    }

    // Store the username in localStorage
    localStorage.setItem('username', username);

    startGame();
}

    function startGame(){
        window.location.href = '/ACM-SLIDER/levels.html';
    }