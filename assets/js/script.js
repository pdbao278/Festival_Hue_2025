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

// window.addEventListener('load', () => {
//     const carouselTrack = document.querySelector('.carousel-tracks');
//     const totalWidth = carouselTrack.scrollWidth;
//     let currentPosition = 0;
//     const speed = 1;
//     function animateScroll() {
//         currentPosition -= speed;
//         if (currentPosition <= -totalWidth / 2) {
//             currentPosition = 0;
//         }
//         carouselTrack.style.transform = `translateX(${currentPosition}px)`;
//         requestAnimationFrame(animateScroll);
//     }
//     animateScroll();
// });

document.addEventListener('DOMContentLoaded', () => {
  const carouselTrack = document.querySelector('.carousel-tracks');

  const images = carouselTrack.querySelectorAll('img');
  let loaded = 0;

  images.forEach((img) => {
    if (img.complete) {
      loaded++;
    } else {
      img.addEventListener('load', () => {
        loaded++;
        if (loaded === images.length) startAnimation();
      });
    }
  });

  if (loaded === images.length) startAnimation();

  function startAnimation() {
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
  }
});

document.addEventListener('DOMContentLoaded', function () {
    const seeMoreButton = document.querySelector('.food-wrapper .btn-more');
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

document.addEventListener('DOMContentLoaded', function () {
    const artNavLinks = document.querySelectorAll('.artnav a');
    const selectElement = document.querySelector('.wrap-select select');
    const artLoadMoreBtn = document.querySelector('.artmenu-wrapper .btn-more');
    const artSectionsContainer = document.querySelector('.artmenu-wrapper.containers');

    let currentActiveSectionId = '#art-all';

    function showSection(targetId) {
        document.querySelectorAll('.artmenu-wrapper.containers > div').forEach(section => {
            section.classList.remove('active');
            section.querySelectorAll('.row').forEach(row => {
                row.classList.remove('active');
            });
        });

        setTimeout(() => {
        
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                currentActiveSectionId = targetId;

                const initialRows = targetSection.querySelectorAll('.row');
                for (let i = 0; i < Math.min(2, initialRows.length); i++) {
                    initialRows[i].classList.add('active');
                }
            }
            updateArtLoadMoreButtonVisibility();
        }, 10);
    }

    function updateArtLoadMoreButtonVisibility() {
        if (!artLoadMoreBtn || !artLoadMoreBtn.parentElement) {
            return;
        }

        const activeSection = document.querySelector(currentActiveSectionId);
        if (!activeSection) {
            artLoadMoreBtn.parentElement.style.display = 'none';
            return;
        }
        const hiddenRows = activeSection.querySelectorAll('.row:not(.active)');
        artLoadMoreBtn.parentElement.style.display = hiddenRows.length > 0 ? 'block' : 'none';
    }
    artNavLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            artNavLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.dataset.container;
            showSection(targetId);

            if (selectElement) {
                selectElement.value = targetId;
            }
        });
    });


    if (artLoadMoreBtn) {
        artLoadMoreBtn.addEventListener('click', function () {
            const activeSection = document.querySelector(currentActiveSectionId);
            if (!activeSection) return;

            const hiddenRows = activeSection.querySelectorAll('.row:not(.active)');
            let rowsToShow = 2;

            for (let i = 0; i < hiddenRows.length && rowsToShow > 0; i++) {
                hiddenRows[i].classList.add('active');
                rowsToShow--;
            }
            updateArtLoadMoreButtonVisibility();
        });
    }

    const initialActiveLink = document.querySelector('.artnav a.active');
    if (initialActiveLink) {
        currentActiveSectionId = initialActiveLink.dataset.container || '#art-all';
        if (selectElement) {
            selectElement.value = currentActiveSectionId;
        }
    }
    showSection(currentActiveSectionId);
});