var TrandingSlider = new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });


const progress = parseInt(localStorage.getItem('progress')) || 1; // Get the saved progress

const levels = document.querySelectorAll('.level');

// Filter out duplicate slides created by Swiper.js
const originalLevels = Array.from(levels).filter(level => !level.classList.contains('swiper-slide-duplicate'));


originalLevels.forEach((level, index) => {
  
    // Add your level logic here
    if(index+1<=progress){
      level.addEventListener("click", ()=>{
        startLevel(index+1);
      })
    }else{
      
      level.addEventListener("click", ()=>{
        console.log(level)
        alert("Level is locked!")
      })
    }
});

  function startLevel(level) {
          console.log('level staring')
          window.location.href = `../game.html?level=${level}`; // Redirect to game page with selected level
      
  }

