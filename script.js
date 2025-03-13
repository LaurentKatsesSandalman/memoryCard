

const allCards = document.querySelectorAll(".img-card");


for (const card of allCards) {

    card.addEventListener('click', function () {
        card.setAttribute("class", "img-card-active" + " " + card.getAttribute("class"));

        setTimeout(function () {
            const verso = "verso.jpg";
            if (card.src.includes(verso)) {

                const cardClass = (card.getAttribute("class"));
                card.src = card.src.slice(0, -"verso.jpg".length) + cardClass.slice(-1) + ".jpg";
            }
            else {
                card.src = card.src.slice(0, -5) + "verso.jpg";
            }
        }, 250)

        setTimeout(function () {
            card.classList.remove("img-card-active");
        }, 501)
    })
}