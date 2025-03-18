//modules
//import fx from 'fireworks';

//déclaration
let flippedCard = 0;
let paires = 0;
let cardAId = "";
let cardBId = "";
const allCards = document.querySelectorAll(".img-card");
//const container = document.querySelector('.container')


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
       /*fx({
            x: 50, // required
            y: 50 // required

          })*/
        const winPaire = document.querySelectorAll(".flipped")
        for (let winCard of winPaire) {           
            winCard.setAttribute("class", "img-card no-display");
            winCard.setAttribute("id", "");
        }
    }
    else {
        const badA = document.querySelector("#cardA");        
        const badB = document.querySelector("#cardB");
        badA.setAttribute("id", "")
        badB.setAttribute("id", "")
        badA.classList.remove("flipped");
        badB.classList.remove("flipped");
        flip(badA);
        flip(badB);
    }   
    flippedCard = 0;   
    cardAId = "";
    cardBId = "";
}

//run
for (const card of allCards) {
    card.addEventListener('click', function () {
        if (card.classList.contains("flipped")) { }
        else if (flippedCard === 2) { }
        else {
            flip(card);
            flippedCard++;


            if (cardAId === "") {
                card.setAttribute("class", "flipped" + " " + card.getAttribute("class"));
                card.setAttribute("id", "cardA")
                cardAId = (card.getAttribute("class"))                
            }
            else if (cardBId === "") {
                card.setAttribute("class", "flipped" + " " + card.getAttribute("class"));
                card.setAttribute("id", "cardB")
                cardBId = (card.getAttribute("class"))
            }            
            if (flippedCard === 2) {                
                setTimeout(compare, 1500);

            }
        }
    })
}