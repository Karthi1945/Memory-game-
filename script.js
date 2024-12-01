

const cardcontainer = document.querySelector(".card-container");
let card =[];
let firstcard,secondcard;
let lockboard = false;
let score = 0;

document.querySelector(".score").textcontent = score;



fetch("./card/card.json")
.then((res) => res.json())
.then((data) => {
card = [...data,...data];
shufflecard();
generatescard();
});


function shufflecard()
{
    let currentIndex = card.length,
         randomIndex,temporaryvalue;

    while(currentIndex !==0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        temporaryvalue = card[currentIndex];
    card[currentIndex] = card[randomIndex];
    card[randomIndex] = temporaryvalue;

    }
}



 function generatescard() {
    for (let card1 of card) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card1");
      cardElement.setAttribute("data-name", card1.name);
      cardElement.innerHTML = `
        <div class="front">
          <img class="front-image"   src=${card1.image} />
        </div>
        <div class="back"></div>
      `;
    
      cardElement.addEventListener("click", flipCard);
      cardcontainer.appendChild(cardElement);
    }
  }
function flipCard() {
    if (lockboard) 
        return;
    if (this === firstcard) 
        
        return;
  
    this.classList.add("flipped");
  
    if (!firstcard) {
      firstcard = this;
      return;
    }
  
    secondcard = this;
    
 
    lockboard = true;
    
  
    checkForMatch();
  }
  
  function checkForMatch() {
    let isMatch = firstcard.dataset.name === secondcard.dataset.name;
    let name2 = secondcard.dataset.name;

    isMatch ? disableCards() : unflipCards();

    if(isMatch){
      score++;
      document.querySelector(".match").textContent = name2;
      document.querySelector(".score").textContent = score;
      
    }

  }
  
  function disableCards() {
    firstcard.removeEventListener("click", flipCard);
    secondcard.removeEventListener("click", flipCard);
   
    resetBoard();
  }
  
  function unflipCards() {
    setTimeout(() => {
      firstcard.classList.remove("flipped");
      secondcard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
  
  function resetBoard() {
    firstcard = null;
    secondcard = null;
    lockboard = false;
  }
  
  function restart() {
    resetBoard();
    shufflecard();
    score = 0;
    document.querySelector(".score").textContent = score;
    cardcontainer.innerHTML = "";
    generatescard();
  }

