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
function toggleMenuButton() {
    const toggle = document.getElementById("mobile-menu");
    const nav = document.getElementById("nav-links");

    if (!toggle || !nav) return;

    if (window.innerWidth <= 768) {
        toggle.style.display = "block";
    } else {
        toggle.style.display = "none";
        nav.classList.remove("active"); // reset nav
    }
}

window.addEventListener("resize", toggleMenuButton);
window.addEventListener("DOMContentLoaded", toggleMenuButton);
