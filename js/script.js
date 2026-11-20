
function showMember(name, unit, generation, status, description) {
    document.getElementById("modalName").textContent = name;
    document.getElementById("modalUnit").textContent = unit;
    document.getElementById("modalGeneration").textContent = generation;
    document.getElementById("modalStatus").textContent = status;
    document.getElementById("modalDescription").textContent = description;

    document.getElementById("memberModal").style.display = "flex";
}

function closeMember() {
    document.getElementById("memberModal").style.display = "none";
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.trim().toLowerCase();
    const memberCards = document.querySelectorAll(".member-card");

    memberCards.forEach(function (card) {
        const memberName = card.querySelector("h3").textContent.toLowerCase();

        if (memberName.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

function toggleFavorite(event, button) {
    event.stopPropagation();

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
        button.textContent = "★";
    } else {
        button.textContent = "☆";
    }

    saveFavorites();
}
function saveFavorites() {
    const favorites = [];

    document.querySelectorAll(".member-card").forEach(function (card) {
        const button = card.querySelector(".favorite-button");

        if (button && button.classList.contains("active")) {
            favorites.push(card.querySelector("h3").textContent);
        }
    });

    localStorage.setItem("stelliveFavorites", JSON.stringify(favorites));
}

function loadFavorites() {
    const favorites = JSON.parse(
        localStorage.getItem("stelliveFavorites") || "[]"
    );

    document.querySelectorAll(".member-card").forEach(function (card) {
        const name = card.querySelector("h3").textContent;
        const button = card.querySelector(".favorite-button");

        if (button && favorites.includes(name)) {
            button.classList.add("active");
            button.textContent = "★";
        }
    });
}

loadFavorites();
function filterMembers(mode, button) {
    const memberCards = document.querySelectorAll(".member-card");

    memberCards.forEach(function (card) {
        const favoriteButton = card.querySelector(".favorite-button");

        if (mode === "all") {
            card.style.display = "block";
        } else {
            if (favoriteButton && favoriteButton.classList.contains("active")) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });

    document.querySelectorAll(".filter-button").forEach(function (btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");
}