
//déclaration
let flippedCard = 0;
let paires = 0;
let cardAId = "";
let cardBId = "";
const allCards = document.querySelectorAll(".img-card");

//fonctions
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

function compare() {
    if (cardAId === cardBId) {
        paires++;
        const winPaire = document.querySelectorAll(".flipped")
        for (let winCard of winPaire) {
            console.log(winCard)
            winCard.setAttribute("class", "img-card no-display");
            winCard.setAttribute("Id", "");
        }
    }
    else {
        const badA = document.querySelector("#cardA");
        console.log(badA)
        const badB = document.querySelector("#cardB");
        badA.setAttribute("Id", "")
        badB.setAttribute("Id", "")
        badA.classList.remove("flipped");
        badB.classList.remove("flipped");
        flip(badA);
        flip(badB);
    }
    console.log("before : flipped cards " + flippedCard);
    flippedCard = 0;
    console.log("after : flipped cards " + flippedCard);
    cardAId = "";
    cardBId = "";

}
//run

console.log("start" + flippedCard)

for (const card of allCards) {

    card.addEventListener('click', function () {
        if (card.classList.contains("flipped")) { }
        else if (flippedCard === 2) { }
        else {
            flip(card);
            flippedCard++;

            if (cardAId === "") {
                card.setAttribute("class", "flipped" + " " + card.getAttribute("class"));
                card.setAttribute("Id", "cardA")
                cardAId = (card.getAttribute("class"))
                console.log(cardAId)
            }
            else if (cardBId === "") {
                card.setAttribute("class", "flipped" + " " + card.getAttribute("class"));
                card.setAttribute("Id", "cardB")
                cardBId = (card.getAttribute("class"))
                console.log(cardBId)
            }
            console.log("turn" + flippedCard)
            if (flippedCard === 2) {
                console.log("check" + flippedCard);
                setTimeout(compare, 1500);
            }
        }
    })
}

