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
        currentInfo.querySelectorAll(".event-detail").forEach((d, i) => {
            d.style.display = i === 0 ? "block" : "none";
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
