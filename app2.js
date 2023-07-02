//! Selectors

const selectionArticle = document.querySelector(".selection");

//Secilen elemanlarin tasiyicilari
const yourChoiceDiv = document.getElementById("your-choice");
const pcChoiceDiv = document.getElementById("pc-choice");

//Message
const messagePar = document.querySelector(".message");

//Score
const scoreCardSection = document.querySelector(".score-card");
const pcScoreSpan = document.querySelector("#pc-score");
const yourScoreSpan = document.querySelector("#your-score");
const domTopScore = document.querySelector("#top-score")

 //Modal
const modalCardSection = document.querySelector(".modal-card")
const finalMessagePar = document.querySelector("#final-message")
const playAgainButton = document.querySelector("#play-again")

//!Variables
let userSelectImg = document.createElement("img");
let pcSelectImg = document.createElement("img");
let pcArr;
let pcRandom;
let imgRandom;

// Colors
const YELLOW = "#ffc538";
const RED = "#fb778b";
const GREEN = "#5ab7ac";

//Image
const bgImg = document.querySelector("#bgImg");


//!Event Listeners
domTopScore.textContent = localStorage.getItem("topScoreText") || null;


selectionArticle.addEventListener("click", (e) => {
  console.log(e.target.id);
  if (e.target.id) {
    userSelectImg.src = `./assets/${e.target.id}.png`;
    userSelectImg.alt = e.target.id;
    yourChoiceDiv.appendChild(userSelectImg);
    createPcSelection();

  }
});

const imgChange = () => {
    imgRandom = Math.trunc(Math.random() * 1000);
    bgImg.src = `https://picsum.photos/id/${imgRandom}/1200/800`;
  };
  
  imgChange();
  
playAgainButton.addEventListener("click",() => {
    modalCardSection.style.display = "none";
    imgChange();
    window.location.reload()
  
})
//!Functions

const createPcSelection = () => {
  pcArr = ["rock", "paper", "scissor"];
  pcRandom = pcArr[Math.floor(Math.random() * 3)];
  pcSelectImg.src = `./assets/${pcRandom}.png`;
  pcSelectImg.alt = pcRandom;
  pcChoiceDiv.appendChild(pcSelectImg);
  calculteResult();
};
//Its a draw"
const calculteResult = () => {
  if (userSelectImg.alt === pcRandom) {
    result(1);
  }
    else {
    result(userSelectImg.alt === "rock" ? (pcRandom === "paper" ? 2 : 3) : userSelectImg.alt === "scissor" ? (pcRandom === "rock" ? 2 : 3): userSelectImg.alt === "paper" ? (pcRandom === "scissor" ? 2 : 3):null);
    }
};
  const result = (x) => {
    const mes = {t1: "Its a draw", s1: YELLOW, t2: "You lost", s2: RED, t3: "You win", s3: GREEN,};

    messagePar.textContent = mes[`t${x}`];
    scoreCardSection.style.color = mes[`s${x}`];
    messagePar.style.backgroundColor = mes[`s${x}`];
    x === 2 ? pcScoreSpan.textContent++ : x === 3 ? yourScoreSpan.textContent++ : null
    
  if (pcScoreSpan.textContent === "10" || yourScoreSpan.textContent === "10") {
    // domTopScore.textContent = `${yourScoreSpan.textContent}:${pcScoreSpan.textContent}`
    
    openModal()
    topScore()
}  
  };
  const topScore = () => {
    let topScoreText = `${yourScoreSpan.textContent}:${pcScoreSpan.textContent}`;
    let storedScore = localStorage.getItem("topScoreText");
  
    if (!storedScore || compareScores(topScoreText, storedScore)) {
      localStorage.setItem("topScoreText", topScoreText);
      domTopScore.textContent = topScoreText;
    }
  };
  
  const compareScores = (newScore, storedScore) => {
    const [newYourScore, newPcScore] = newScore.split(":");
    const [storedYourScore, storedPcScore] = storedScore.split(":");
  
    return (
      parseInt(newYourScore) > parseInt(storedYourScore) ||
      parseInt(newPcScore) < parseInt(storedPcScore)
    );
  };
    // const topScore = () => {
    //     let topScoreText =  domTopScore.textContent; 
        
    //     localStorage.setItem("topScoreText",topScoreText)
    //     let localScore = localStorage.getItem("topScoreText")
    //     console.log(localScore);
    // }

    const openModal = () => {
        modalCardSection.classList.add("show")
        if (yourScoreSpan.textContent === "10") {
            finalMessagePar.textContent = "💃 You win"
            document.querySelector(".modal").style.backgroundColor = GREEN
            playAgainButton.style.color = GREEN
        }
        else {
            finalMessagePar.textContent = "☹️ You Lost"
            document.querySelector(".modal").style.backgroundColor = RED
            playAgainButton.style.color = RED
        }
    }

    // const imgChange = () => {
    //     imgRandom = Math.trunc(Math.random()*1000)
    //     bgImg.src = `https://picsum.photos/id/${imgRandom}/1200/800`
    //     console.log(bgImg.src);
    // }