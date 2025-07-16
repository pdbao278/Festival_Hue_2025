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
    function animateScroll() {
        currentPosition -= speed;
        if (currentPosition <= (-totalWidth - 2) / 2) {
            currentPosition = 0;
        }
        carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(animateScroll);
    }
    animateScroll();
});

window.addEventListener('load', () => {
    const carouselTrack = document.querySelector('.carousel-tracks');
    const totalWidth = carouselTrack.scrollWidth;
    let currentPosition = 0;
    const speed = 1;
    function animateScroll() {
        currentPosition -= speed;
        if (currentPosition <= -totalWidth / 2) {
            currentPosition = 0;
        }
        carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(animateScroll);
    }
    animateScroll();
});

document.addEventListener('DOMContentLoaded', function () {
    const seeMoreButton = document.querySelector('.btn-more');
    const foodGrids = document.querySelectorAll('.food-grids');
    const foodCards = document.querySelectorAll('.food-card');
    const cardsToShowPerClick = 3;
    let currentIndex = 1;
    let a = 0;
    function showCards(startIndex, count) {
        for (let i = 0; i < count; i++) {
            const cardIndex = startIndex + i;
            if (cardIndex < foodCards.length) {
                foodCards[cardIndex].classList.add('active');
            } else {
                break;
            }
        }
    }
    function checkLoadMoreButton() {
        if (currentIndex >= foodCards.length) {
            seeMoreButton.style.display = 'none';
        }
    }

    // HIỂN THỊ 3 CARD ĐẦU TIÊN KHI TRANG TẢI LẦN ĐẦU
    showCards(currentIndex, cardsToShowPerClick);
    currentIndex += cardsToShowPerClick;
    checkLoadMoreButton();

    seeMoreButton.addEventListener('click', function () {
        showCards(currentIndex, cardsToShowPerClick);
        currentIndex += cardsToShowPerClick;
        foodGrids[a++].classList.add('actives');
        checkLoadMoreButton();
    });
});