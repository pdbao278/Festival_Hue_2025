document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const img = carouselTrack.querySelectorAll('img');
    const numsPic = img.length / 2;
    let totalWidth = 0;
    if (img.length > 0) {
        for (let i = 0; i < numsPic; i++) {
            totalWidth += img[i].offsetWidth + parseFloat(getComputedStyle(img[i]).marginRight);
        }
    }
    document.documentElement.style.setProperty('--total-original-content-width', `${totalWidth}px`);

    let currentPosition = 0;
    const speed = 1;
    let isPaused = false;
    function animateScroll() {
        if(!isPaused) {
            currentPosition -= speed;
            if (currentPosition <= (-totalWidth - 2) / 2) {
                currentPosition = 0;
            }
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        }
        requestAnimationFrame(animateScroll);
    }

    carouselTrack.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    carouselTrack.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    animateScroll();
});