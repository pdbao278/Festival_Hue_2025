let currentSeason = "spring";
document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.addEventListener("click", () => {
        const seasons = ["spring", "summer", "autumn", "winter"];
        currentSeason = seasons[index];

        // Ẩn tất cả mùa
        document.querySelectorAll(".event-info").forEach(info => {
            info.style.display = "none";
        });

        // Hiện mùa đang chọn, reset về index 0
        const currentInfo = document.getElementById(currentSeason);
        currentInfo.style.display = "flex";
        const allDetails = currentInfo.querySelectorAll(".event-detail");
        allDetails.forEach((d, i) => {
            if (currentSeason === "winter") {
                d.style.display = i < 2 ? (i === 0 ? "block" : "none") : "none";
            } else {
                d.style.display = i === 0 ? "block" : "none";
            }
        });

// Ẩn/hiện nút tròn tương ứng
        document.querySelectorAll(".color-circle").forEach((circle, i) => {
            if (currentSeason === "winter") {
                circle.style.display = i < 2 ? "inline-block" : "none";
            } else {
                circle.style.display = "inline-block";
            }
        });

    });
});
document.querySelectorAll(".color-circle").forEach((circle, index) => {
    circle.addEventListener("click", () => {
        const info = document.getElementById(currentSeason);
        info.querySelectorAll(".event-detail").forEach((d, i) => {
            d.style.display = i === index ? "block" : "none";
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".timeline-item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            // Gỡ class đỏ của tất cả
            items.forEach(i => i.classList.remove("bg-red-corners"));

            // Gán class đỏ cho thằng vừa click
            item.classList.add("bg-red-corners");
        });
    });
});



// Miracle
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

    if (selectElement) {
        selectElement.addEventListener('change', function () {
            const selectedValue = this.value;

            // Cập nhật active cho artnav
            artNavLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.container === selectedValue);
            });

            showSection(selectedValue);
        });
    }

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
//End Miracle


// Lala

//Bắt đầu lala
// fix hien 1 hang card-điaiem

// Xử lý sự kiện click vào nút đóng bản đồ
        document.querySelector('.control-info').addEventListener('click', function () {
            const mapContainer = document.querySelector('.map-info');
            if (mapContainer) {
                mapContainer.style.display = 'none';
            }
        });

        // click vào icon info để hiển thị thông tin bản đồ
        document.querySelector('.icon-info').addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            // Xóa vùng chọn văn bản nếu có
            if (window.getSelection) {
                const sel = window.getSelection();
                if (sel && sel.removeAllRanges) sel.removeAllRanges();
            } else if (document.selection) {
                document.selection.empty();
            }
            const mapInfo = document.querySelector('.map-info');
            if (!mapInfo) return;
            const isVisible = (mapInfo.style.display !== 'none' && getComputedStyle(mapInfo).display !== 'none');
            mapInfo.style.display = isVisible ? 'none' : 'block';
        });


        // click vào icon location để thay đổi thông tin info

        const locationList = [
            {
                title: 'Đại Nội Huế',
                content: `Đại Nội Huế là quần thể kiến trúc cung đình của triều Nguyễn, nằm trong Kinh thành Huế.
                Nơi đây từng là trung tâm chính trị, hành chính và lễ nghi của triều đình suốt hơn một thế kỷ.
                Đại Nội gồm Hoàng thành và Tử Cấm Thành với nhiều công trình nguy nga, cổ kính.
                Di sản này được UNESCO công nhận là Di sản Văn hóa Thế giới từ năm 1993.`,
                address: '23-25 Lê Huân, Thuận Thành, Thành phố Huế, Thừa Thiên Huế'
            },
            {
                title: 'Lăng vua Tự Đức',
                content: `Lăng vua Tự Đức là một trong những lăng tẩm nổi tiếng của triều Nguyễn, nằm ở ngoại ô thành phố Huế.
                Lăng được xây dựng từ năm 1864 và hoàn thành vào năm 1867, là nơi an nghỉ của vua Tự Đức và hoàng hậu.
                Kiến trúc lăng tẩm mang đậm phong cách cung đình với nhiều công trình kiến trúc độc đáo.`,
                address: 'Thôn Thượng Ba, Xã Thủy Xuân, Thành phố Huế, Thừa Thiên Huế'
            },
            {
                title: 'Cầu ngói Thanh Toàn',
                content: `Cầu ngói Thanh Toàn là một trong những cây cầu cổ kính và đẹp nhất ở Huế, được xây dựng vào thế kỷ 18.
                Cầu có kiến trúc độc đáo với mái ngói cong vút, nằm bắc qua một con kênh nhỏ, tạo nên khung cảnh thơ mộng.
                Đây là điểm đến yêu thích của du khách khi đến Huế.`,
                address: 'Thôn Thanh Thủy Chánh, Xã Thủy Thanh, Thị xã Hương Thủy, Thừa Thiên Huế'
            },
            {
                title: 'Lăng vua Gia Long',
                content: `Lăng vua Gia Long là lăng tẩm đầu tiên của triều Nguyễn, nằm ở ngoại ô thành phố Huế.
                Lăng được xây dựng từ năm 1814 và hoàn thành vào năm 1820, là nơi an nghỉ của vua Gia Long - vị vua sáng lập triều Nguyễn.
                Kiến trúc lăng tẩm mang đậm phong cách cung đình với nhiều công trình kiến trúc độc đáo.`,
                address: 'Xã Hương Thọ, Thị xã Hương Trà, Thừa Thiên Huế'
            },
            {
                title: 'Làng cổ Phước Tích',
                content: `Làng cổ Phước Tích là một trong những làng cổ truyền thống của Việt Nam, nằm cách trung tâm thành phố Huế khoảng 30km về phía Tây.
                Làng có lịch sử hơn 500 năm, nổi tiếng với những ngôi nhà cổ kính, kiến trúc độc đáo và nghề thủ công truyền thống.
                Đây là điểm đến yêu thích của du khách khi muốn tìm hiểu về văn hóa và lịch sử của vùng đất Cố đô.`,
                address: 'Xã Phong Hòa, Huyện Phong Điền, Thừa Thiên Huế'
            },
            {
                title: 'Đồi Thiên An',
                content: `Đồi Thiên An là một trong những địa điểm du lịch nổi tiếng ở Huế, nằm cách trung tâm thành phố khoảng 7km về phía Tây Nam.
                Đồi có độ cao khoảng 200m so với mực nước biển, từ đỉnh đồi có thể nhìn thấy toàn cảnh thành phố Huế và dòng sông Hương thơ mộng.
                Đồi Thiên An còn được biết đến với những cánh rừng thông xanh mướt, tạo nên khung cảnh thơ mộng và yên bình.`,
                address: 'Xã Thủy Bằng, Thành phố Huế, Thừa Thiên Huế'
            },
            {
                title: 'Cầu Trường Tiền',
                content: `Cầu Trường Tiền là cây cầu nổi tiếng nhất ở Huế, bắc qua sông Hương.
                Cầu được xây dựng vào năm 1899 và hoàn thành vào năm 1904, là biểu tượng của thành phố Huế.
                Cầu có kiến trúc độc đáo với 6 nhịp, mỗi nhịp dài 68m, tạo nên khung cảnh thơ mộng và lãng mạn.`,
                address: 'Đường Lê Lợi - Trần Hưng Đạo, Thành phố Huế, Thừa Thiên Huế'
            },
            {
                title: 'Chùa Thiên Mụ',
                content: `Chùa Thiên Mụ là một trong những ngôi chùa cổ kính và nổi tiếng nhất ở Huế, nằm trên đồi Hà Khê bên bờ sông Hương.
                Chùa được xây dựng vào năm 1601, là nơi thờ Phật và cũng là nơi lưu giữ nhiều di sản văn hóa quý giá.
                Chùa có kiến trúc độc đáo với tháp Phước Duyên cao 21m, là biểu tượng của chùa Thiên Mụ.`,
                address: 'Đường Nguyễn Phúc Nguyên, Phường Kim Long, Thành phố Huế, Thừa Thiên Huế'
            }
        ];

        // Hàm cập nhật thông tin bản đồ khi click vào icon location
        function updateMapInfo(title, content, address) {
            const mapTitle = document.querySelector('.map-title h2');
            const mapContent = document.querySelector('.map-info p');
            const mapAddress = document.querySelector('.map-address');
            if (mapTitle && mapContent && mapAddress) {
                mapTitle.textContent = title;
                mapContent.textContent = content;
                mapAddress.textContent = 'Địa chỉ: ' + (address || 'Đang cập nhật');
            }
        }


        // Quản lý hiển thị danh sách địa điểm
        // Hiển thị 5 địa điểm mỗi lần

        let itemsPerPage = 5;
        let startIndex = 0;
        const list = document.querySelectorAll('.card-dia-diem');
        const leftBtn = document.querySelector('.fa-caret-left');
        const rightBtn = document.querySelector('.fa-caret-right');
        let maxIndex = list.length - itemsPerPage;

        function updateItemsPerPage() {
            const width = window.innerWidth;
            if (width <= 600) {
                itemsPerPage = 1;
            } else if (width <= 900) {
                itemsPerPage = 2;
            } else {
                itemsPerPage = 5;
            }
            maxIndex = list.length - itemsPerPage;
            if (startIndex > maxIndex) startIndex = Math.max(0, maxIndex);
            showWindow(startIndex);
        }

        window.addEventListener('resize', updateItemsPerPage);
        // Gọi 1 lần khi load
        updateItemsPerPage();

        function updateBtnState() {
            if (startIndex <= 0) {
                leftBtn.classList.add('disabled');
            } else {
                leftBtn.classList.remove('disabled');
            }
            if (startIndex >= maxIndex || list.length <= itemsPerPage) {
                rightBtn.classList.add('disabled');
            } else {
                rightBtn.classList.remove('disabled');
            }
        }

        function showWindow(start) {
            list.forEach((item, i) => {
                if (i >= start && i < start + itemsPerPage) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            updateBtnState();
        }

        leftBtn.onclick = function () {
            if (startIndex > 0) {
                startIndex--;
                showWindow(startIndex);
            }
        };
        rightBtn.onclick = function () {
            if (startIndex < maxIndex) {
                startIndex++;
                showWindow(startIndex);
            }
        };

        // showWindow(startIndex); // Đã gọi trong updateItemsPerPage

        // Tự động chuyển trang sang phải sau mỗi 4 giây, dừng khi hover card
        let autoSlide = null;
        function startAutoSlide() {
            if (autoSlide) clearInterval(autoSlide);
            autoSlide = setInterval(function () {
                if (startIndex < maxIndex) {
                    startIndex++;
                    showWindow(startIndex);
                } else if (startIndex >= maxIndex) {
                    startIndex = 0;
                    showWindow(startIndex);
                }
            }, 4000);
        }
        startAutoSlide();

        // Dừng khi hover card, chạy lại khi rời chuột khỏi tất cả card
        document.querySelectorAll('.card-dia-diem').forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                if (autoSlide) clearInterval(autoSlide);
            });
            card.addEventListener('mouseleave', function () {
                startAutoSlide();
            });

        });

        // Đổi map và cập nhật info khi click icon location
        document.querySelectorAll('.card-overlay i').forEach(function (icon, idx) {
            icon.addEventListener('click', function (e) {
                const card = icon.closest('.card-dia-diem');
                const mapUrl = card.getAttribute('data-map-url');
                if (mapUrl) {
                    const iframe = document.querySelector('.map iframe');
                    if (iframe) iframe.src = mapUrl;
                }
                // Cập nhật info theo vị trí card
                if (locationList[idx]) {
                    updateMapInfo(locationList[idx].title, locationList[idx].content, locationList[idx].address);
                }
                e.stopPropagation();
                const mapContainer = document.querySelector('.map-info');
                if (mapContainer) {
                    mapContainer.style.display = 'block';
                }
            });
        });

        // Back to top button
        const backToTopBtn = document.querySelector('.back-to-top');
        // Ẩn nút khi ở đầu trang, hiện khi cuộn xuống 200px
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        // Mặc định ẩn nếu ở đầu trang
        if (window.scrollY <= 200) backToTopBtn.style.display = 'none';
        // Sự kiện click để cuộn lên đầu trang
        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });


//End Lala