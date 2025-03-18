//modules
//import fx from 'fireworks';

//déclaration
//variables
let flippedCard = 0;
let paires = 0;
let cardAId = "";
let cardBId = "";
let movesCurrent = 0;
let movesEnd = 0;
let playOn = true;
let isFirst = true;
let startTime;
let endTime;
let currentTime = 0;
//selectors
const allCards = document.querySelectorAll(".img-card");
//const container = document.querySelector('.container')
const selectCurrentMoves = document.querySelector(".current-moves")
const selectCurrentTime = document.querySelector(".current-time")
const selectBestMoves = document.querySelector(".best-moves")
const selectBestTime = document.querySelector(".best-time")

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
    movesCurrent++;
    selectCurrentMoves.innerHTML = movesCurrent;
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

function displayTime(timeInMS) {
    let hh = Math.floor(timeInMS / 3600000);
    let mm = "";
    let ss = "";
    if (Math.floor((timeInMS % 3600000) / 60000) < 10) {
        mm = `0${Math.floor((timeInMS % 3600000) / 60000)}`
    }
    else {
        mm = `${Math.floor((timeInMS % 3600000) / 60000)}`
    }
    if (Math.floor((timeInMS % 3600000) % 60000 / 1000) < 10) {
        ss = `0${Math.floor((timeInMS % 3600000) % 60000 / 1000)}`
    }
    else {
        ss = `${Math.floor((timeInMS % 3600000) % 60000 / 1000)}`
    }
    return `${hh}:${mm}:${ss}`;
}

//run
for (const card of allCards) {
    card.addEventListener('click', function () {
        if (isFirst) {
            startTime = Date.now();
            setInterval(() => {
                currentTime = Date.now() - startTime;
                selectCurrentTime.innerHTML = displayTime(currentTime);
            }, 1000)
            isFirst = false;
        }
        if (card.classList.contains("flipped") || !playOn) { }
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
        if (paires === 5) {
            playOn = false;
            movesEnd = movesCurrent
        }
    })
}
