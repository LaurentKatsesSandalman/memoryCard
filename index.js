//MODULES: directly declared in html (failed tu use an import)

//DECLARATIONS
//(a)variables
let flippedCard = 0;
let paires = 0;
let cardAId = "";
let cardBId = "";
let movesBest = Number.parseInt(localStorage.getItem("movesBest")) || 999;
let movesCurrent = 0;
let movesEnd = 0;
let playOn = true;
let isFirst = true;
let isBestTime = false;
let isBestMove = false;
let startTime;
let endTime;
let timeBest = Number.parseInt(localStorage.getItem("timeBest")) || 86400000;
let timeCurrent = 0;
let timerInterval = null;
const deck = ["card0", "card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card0", "card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9"]
//(b)selectors
const playBtn = document.querySelector(".play-btn")
const allCards = document.querySelectorAll(".img-card");
const selectMovesCurrent = document.querySelector(".current-moves")
const selectTimeCurrent = document.querySelector(".current-time")
const selectBestMoves = document.querySelector(".best-moves")
const selectBestTime = document.querySelector(".best-time")
const selectMovesCurrentPop = document.querySelector(".current-moves-pop")
const selectTimeCurrentPop = document.querySelector(".current-time-pop")
const selectBestMovesPop = document.querySelector(".best-moves-pop")
const selectBestTimePop = document.querySelector(".best-time-pop")
const giveupBtn = document.querySelector(".giveup-main")
const cancelBtn = document.querySelector(".giveup-no")
const confirmBtn = document.querySelector(".giveup-yes")
const vfx = document.querySelectorAll(".vfx")
//FONCTIONS
function remove(element) {
    element.setAttribute("class", `remove ${element.getAttribute("class")}`)
}
function activate(element) {
    element.classList.remove("remove");
    element.setAttribute("class", `appear ${element.getAttribute("class")}`)
        setTimeout(() => {
        element.classList.remove("appear");
    }, 1501)
}
function displayVFX(element) {
    element.classList.remove("remove");
    element.setAttribute("class", `appearVFX ${element.getAttribute("class")}`)
    setTimeout(() => {
        element.classList.remove("appearVFX");
        element.setAttribute("class", `remove ${element.getAttribute("class")}`)
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
    card.setAttribute("class", `img-card-active ${card.getAttribute("class")}`);
        setTimeout(() => {
        const verso = "verso.jpg";
        if (card.src.includes(verso)) {
            const cardClass = (card.getAttribute("class"));
            card.src = `${card.src.slice(0, -"verso.jpg".length) + cardClass.slice(-1)}.jpg`;
        }
        else {
            card.src = `${card.src.slice(0, -5)}verso.jpg`;
        }
    }, 250)
        setTimeout(() => {
        card.classList.remove("img-card-active");
    }, 501)
}
function compare() {
    movesCurrent++;
    selectMovesCurrent.innerHTML = movesCurrent;
    if (cardAId === cardBId) {
        paires++;
        const winPaire = document.querySelectorAll(".flipped")
        for (let i = 0; i < 2; i++) {
            let winCard=winPaire[i]
            const jsConfetti = new JSConfetti({ winCard })

        //for (let i = 0; i < 2; i++) {

            // CODE DE L'ANIMATION FAITE A LA MANO
            // let tempObject = winPaire[i].getBoundingClientRect();
            // let tempTop = (tempObject.top + tempObject.bottom) / 2
            // let tempLeft = tempObject.left
            // let tempWidth = tempObject.right - tempObject.left
            // vfx[i].style.top = `${Math.floor(tempTop)}px`
            // vfx[i].style.left = `${Math.floor(tempLeft)}px`
            // vfx[i].style.width = `${Math.floor(tempWidth)}px`
            //displayVFX(vfx[i])
            //let tempCard = winPaire[i];
            //const jsConfetti = new JSConfetti({ tempCard })

           jsConfetti.addConfetti() 
            //LE TIME OUT N'EST NECESSAIRE QUE POUR L'ANIM FAITE A LA MANO
            //setTimeout(function () {
            winCard.setAttribute("class", "img-card no-display");
            winCard.setAttribute("data-type", "");
            //}, 500)
        }
        if (paires === 10) {
            playOn = false;
            movesEnd = movesCurrent;
            clearInterval(timerInterval);
            endTime = timeCurrent;
            updateBest();
            displayResult();
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
function updateBest(){
    if(endTime<timeBest){
        timeBest=endTime;
        isBestTime=true;
        localStorage.setItem("timeBest",timeBest)
    }
    if(movesEnd<movesBest){
        movesBest=movesEnd;
        isBestMove=true;
        localStorage.setItem("movesBest",movesBest)
    }
}
function displayResult(){
    selectTimeCurrentPop.innerHTML=displayTime(endTime)
    selectMovesCurrentPop.innerHTML=movesEnd
    selectBestTimePop.innerHTML = displayTime(timeBest);
    selectBestMovesPop.innerHTML = movesBest;

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
selectBestTime.innerHTML = displayTime(timeBest);
selectBestMoves.innerHTML = movesBest;

playBtn.addEventListener('click', () => {
    shuffle(deck);
    remove(playBtn);
    for (let i = 0; i < allCards.length; i++) {
        activate(allCards[i]);
        allCards[i].classList.add(deck[i]);
    }
    giveupBtn.classList.remove("remove");
})
giveupBtn.addEventListener('click', () => {
    remove(giveupBtn);
    cancelBtn.classList.remove("remove");
    confirmBtn.classList.remove("remove");
})
cancelBtn.addEventListener('click', () => {
    remove(cancelBtn);
    remove(confirmBtn);
    giveupBtn.classList.remove("remove");
})
confirmBtn.addEventListener('click', () => {
    location.reload();
})
for (const card of allCards) {  
    card.addEventListener('click', () => {
        if (isFirst) {
            startTime = Date.now();
            timerInterval = setInterval(() => {
                timeCurrent = Date.now() - startTime;
                selectTimeCurrent.innerHTML = displayTime(timeCurrent);
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