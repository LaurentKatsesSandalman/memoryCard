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
const vfx = document.querySelectorAll(".vfx")
//FONCTIONS
function remove(element) {
    element.setAttribute("class", "remove " + element.getAttribute("class"))
}
function activate(element) {
    element.classList.remove("remove");
    element.setAttribute("class", "appear " + element.getAttribute("class"))
    setTimeout(function () {
        element.classList.remove("appear");
    }, 1501)
}
function displayVFX(element) {
    element.classList.remove("remove");
    element.setAttribute("class", "appearVFX " + element.getAttribute("class"))
    setTimeout(function () {
        element.classList.remove("appearVFX");
        element.setAttribute("class", "remove " + element.getAttribute("class"))
    }, 1000)
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
        const winPaire = document.querySelectorAll(".flipped")
        for (let i = 0; i < 2; i++) {
            // let tempObject = winPaire[i].getBoundingClientRect();
            // let tempTop = (tempObject.top + tempObject.bottom) / 2
            // let tempLeft = tempObject.left
            // let tempWidth = tempObject.right - tempObject.left
            // vfx[i].style.top = `${Math.floor(tempTop)}px`
            // vfx[i].style.left = `${Math.floor(tempLeft)}px`
            // vfx[i].style.width = `${Math.floor(tempWidth)}px`
            //displayVFX(vfx[i])
            let tempCard = winPaire[i];
            const jsConfetti = new JSConfetti({ tempCard })
            jsConfetti.addConfetti()
            //setTimeout(function () {
            winPaire[i].setAttribute("class", "img-card no-display");
            winPaire[i].setAttribute("data-type", "");
            //}, 500)
        }
        if (paires === 10) {
            playOn = false;
            movesEnd = movesCurrent;
            clearInterval(timerInterval);
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
playBtn.addEventListener('click', function () {
    shuffle(deck);
    remove(playBtn);
    for (let i = 0; i < allCards.length; i++) {
        activate(allCards[i]);
        allCards[i].classList.add(deck[i]);
    }
    giveupBtn.classList.remove("remove");
})
giveupBtn.addEventListener('click', function () {
    remove(giveupBtn);
    cancelBtn.classList.remove("remove");
    confirmBtn.classList.remove("remove");
})
cancelBtn.addEventListener('click', function () {
    remove(cancelBtn);
    remove(confirmBtn);
    giveupBtn.classList.remove("remove");
})
confirmBtn.addEventListener('click', function () {
    location.reload();
})
for (const card of allCards) {
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
                card.setAttribute("class", "flipped" + " " + card.getAttribute("class"));
                card.setAttribute("data-type", "cardA")
                cardAId = (card.getAttribute("class"))
            }
            else if (cardBId === "") {
                card.setAttribute("class", "flipped" + " " + card.getAttribute("class"));
                card.setAttribute("data-type", "cardB")
                cardBId = (card.getAttribute("class"))
            }
            if (flippedCard === 2) {
                setTimeout(compare, 1500);

            }
        }
    })
}
