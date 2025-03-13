function flip(card) {
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
}

let flippedCard = 0;
let paires = 0;
let cardAId = "";
let cardBId = "";
const allCards = document.querySelectorAll(".img-card");


for (const card of allCards) {

    card.addEventListener('click', function () {
        flip(card);
        flippedCard++;
        card.setAttribute("class", "flipped" + " " + card.getAttribute("class"));
        if (cardAId === "") {
            cardAId = (card.getAttribute("class"))
        }
        else if (cardBId === "") {
            cardBId = (card.getAttribute("class"))
        }
    })
}

while (paires !== 10) {
    if (flippedCard === 2) {
        if (cardAId === cardBId) {
            paires++;
            const winPaire = document.querySelectorAll(`.${CardAId}`)
            for (let winCard in winPaire) {
                winCard.setAttribute("class", "no-display")
            }
        }
        else {
            const badA = document.querySelector(cardAId);
            const badB = document.querySelector(cardBId);
            badA.classList.remove("flipped");
            badB.classList.remove("flipped");
            flip(badA);
            flip(badB);
        }
        flippedCard = 0;
    }

}