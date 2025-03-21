//MODULES

//DECLARATIONS
//(a)variables
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
let timerInterval = null;
const deck = ["card0", "card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card0", "card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9"]
//(b)selectors
const playBtn = document.querySelector(".play-btn")
const allCards = document.querySelectorAll(".img-card");
const selectCurrentMoves = document.querySelector(".current-moves")
const selectCurrentTime = document.querySelector(".current-time")
const selectBestMoves = document.querySelector(".best-moves")
const selectBestTime = document.querySelector(".best-time")
const giveupBtn = document.querySelector(".giveup-main")
const cancelBtn = document.querySelector(".giveup-no")
const confirmBtn = document.querySelector(".giveup-yes")
//FONCTIONS
function remove(element) {
    element.setAttribute("class", `remove ${element.getAttribute("class")}`)
}
function activate(element) {
    element.classList.remove("remove");
    element.setAttribute("class", `appear ${element.getAttribute("class")}`)
    // biome-ignore lint/complexity/useArrowFunction: <explanation>
    setTimeout(function () {
        element.classList.remove("appear");
    }, 1501)
}
function shuffle(cardlist) {
    let buffer;
    let index;
    for (let i = 0; i < cardlist.length; i++) {
        buffer = cardlist[i];
        index = Math.floor(Math.random() * cardlist.length);
        cardlist[i] = cardlist[index];
        cardlist[index] = buffer;
    }
}
function flip(card) {
    card.setAttribute("class", `img-card-active ${card.getAttribute("class")}`);
    // biome-ignore lint/complexity/useArrowFunction: <explanation>
    setTimeout(function () {
        const verso = "verso.jpg";
        if (card.src.includes(verso)) {
            const cardClass = (card.getAttribute("class"));
            card.src = `${card.src.slice(0, -"verso.jpg".length) + cardClass.slice(-1)}.jpg`;
        }
        else {
            card.src = `${card.src.slice(0, -5)}verso.jpg`;
        }
    }, 250)
    // biome-ignore lint/complexity/useArrowFunction: <explanation>
    setTimeout(function () {
        card.classList.remove("img-card-active");
    }, 501)
}
function compare() {
    movesCurrent++;
    selectCurrentMoves.innerHTML = movesCurrent;
    if (cardAId === cardBId) {
        paires++;
        const winPaire = document.querySelectorAll(".flipped")
        // biome-ignore lint/style/useConst: <explanation>
        for (let winCard of winPaire) {
            const jsConfetti = new JSConfetti({ winCard })
            jsConfetti.addConfetti()
            winCard.setAttribute("class", "img-card no-display");
            winCard.setAttribute("data-type", "");
        }
        if (paires === 10) {
            playOn = false;
            movesEnd = movesCurrent;
            clearInterval(timerInterval);
            openPopup();
        }
    }
    else {
        const badA = document.querySelector('[data-type="cardA"]');
        const badB = document.querySelector('[data-type="cardB"]');
        badA.setAttribute("data-type", "")
        badB.setAttribute("data-type", "")
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
    // biome-ignore lint/style/useConst: <explanation>
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
//RUN
// biome-ignore lint/complexity/useArrowFunction: <explanation>
playBtn.addEventListener('click', function () {
    shuffle(deck);
    remove(playBtn);
    for (let i = 0; i < allCards.length; i++) {
        activate(allCards[i]);
        allCards[i].classList.add(deck[i]);
    }
    giveupBtn.classList.remove("remove");
})
// biome-ignore lint/complexity/useArrowFunction: <explanation>
giveupBtn.addEventListener('click', function () {
    remove(giveupBtn);
    cancelBtn.classList.remove("remove");
    confirmBtn.classList.remove("remove");
})
// biome-ignore lint/complexity/useArrowFunction: <explanation>
cancelBtn.addEventListener('click', function () {
    remove(cancelBtn);
    remove(confirmBtn);
    giveupBtn.classList.remove("remove");
})
// biome-ignore lint/complexity/useArrowFunction: <explanation>
confirmBtn.addEventListener('click', function () {
    location.reload();
})
for (const card of allCards) {
    // biome-ignore lint/complexity/useArrowFunction: <explanation>
    card.addEventListener('click', function () {
        if (isFirst) {
            startTime = Date.now();
            timerInterval = setInterval(() => {
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
                card.setAttribute("class", `flipped ${card.getAttribute("class")}`);
                card.setAttribute("data-type", "cardA")
                cardAId = (card.getAttribute("class"))
            }
            else if (cardBId === "") {
                card.setAttribute("class", `flipped ${card.getAttribute("class")}`);
                card.setAttribute("data-type", "cardB")
                cardBId = (card.getAttribute("class"))
            }
            if (flippedCard === 2) {
                setTimeout(compare, 1500);

            }
        }
    })
}
function openPopup() {
    const popup = document.querySelector(".pop-container");
    popup.style.display = "flex";
    
}
const closeBtn = document.querySelector(".closepopup-button");
closeBtn.addEventListener('click', closePopup);
function closePopup() { 

    location.reload();
    const popup = document.querySelector(".pop-container");
    popup.style.display = "none";
}
