document.addEventListener("DOMContentLoaded", () => {
  let currentPlayer = 1;
  let player1Score = 0;
  let player2Score = 0;
  let player1Name = "";
  let player2Name = "";

  const cardArray = [
    {
      name: "image1",
      img: "images/Alpha_card1.png",
    },
    {
      name: "image2",
      img: "images/Anden_Card.png",
    },
    {
      name: "image3",
      img: "images/Apkallu_card1.png",
    },
    {
      name: "image4",
      img: "images/Archbishop_thordan_vii_card1.png",
    },
    {
      name: "image5",
      img: "images/Azeyma_card1.png",
    },
    {
      name: "image6",
      img: "images/Bomb_card1.png",
    },
    {
      name: "image7",
      img: "images/Cloud_strife_card1.png",
    },
    {
      name: "image8",
      img: "images/Delivery_moogle_card1.png",
    },
    {
      name: "image9",
      img: "images/Ea_card1.png",
    },
    {
      name: "image10",
      img: "images/Gaelicat_card1.png",
    },
    {
      name: "image11",
      img: "images/fatchocob.png",
    },
    {
      name: "image12",
      img: "images/drag.png",
    },

    {
      name: "image1",
      img: "images/Alpha_card1.png",
    },
    {
      name: "image2",
      img: "images/Anden_Card.png",
    },
    {
      name: "image3",
      img: "images/Apkallu_card1.png",
    },
    {
      name: "image4",
      img: "images/Archbishop_thordan_vii_card1.png",
    },
    {
      name: "image5",
      img: "images/Azeyma_card1.png",
    },
    {
      name: "image6",
      img: "images/Bomb_card1.png",
    },
    {
      name: "image7",
      img: "images/Cloud_strife_card1.png",
    },
    {
      name: "image8",
      img: "images/Delivery_moogle_card1.png",
    },
    {
      name: "image9",
      img: "images/Ea_card1.png",
    },
    {
      name: "image10",
      img: "images/Gaelicat_card1.png",
    },
    {
      name: "image11",
      img: "images/fatchocob.png",
    },
    {
      name: "image12",
      img: "images/drag.png",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  var cardsChosen = [];
  var cardsChosenId = [];
  const cardsWon = [];

  //skapa spelplan
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement("img");
      card.setAttribute("src", "images/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  //kolla efter matchande
  function checkForMatch() {
    var cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      alert("Du tröck på samma kort!");
    } else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute("src", cardArray[cardsChosenId[0]].img);
      cards[optionTwoId].setAttribute("src", cardArray[cardsChosenId[1]].img);
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);

      if (currentPlayer === 1) {
        player1Score++;
      } else {
        player2Score++;
      }

      updateScores();
      declareCurrentPlayer();
    } else {
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      declareCurrentPlayer();
    }

    cardsChosen = [];
    cardsChosenId = [];

    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      declareWinner();
    }
  }

  //flippa korten
  function flipCard() {
    var cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  function updateScores() {
    const resultPlayer1 = document.querySelector("#resultPlayer1");
    const resultPlayer2 = document.querySelector("#resultPlayer2");

    resultPlayer1.textContent = `${player1Name}: ${player1Score}`;
    resultPlayer2.textContent = `${player2Name}: ${player2Score}`;
  }

  function declareWinner() {
    const resultDisplay = document.querySelector("#result");
    if (player1Score > player2Score) {
      resultDisplay.textContent = `${player1Name} wins!`;
    } else if (player2Score > player1Score) {
      resultDisplay.textContent = `${player2Name} wins!`;
    } else {
      resultDisplay.textContent = "It's a tie!";
    }
  }

  function refresh() {
    location.reload();
  }

  function startGame() {
    player1Name = document.getElementById("player1Name").value;
    player2Name = document.getElementById("player2Name").value;
    updateScores();
    declareCurrentPlayer();
    createBoard();
    document.getElementById("currentPlayer").textContent = "";
  }

  function declareCurrentPlayer() {
    const currentPlayerDisplay = document.querySelector("#currentPlayer");
    currentPlayerDisplay.textContent =
      currentPlayer === 1 ? `${player1Name}'s tur` : `${player2Name}'s tur`;
  }

  // Event listeners för knappar
  document.getElementById("startGameBtn").addEventListener("click", startGame);
  document.getElementById("restartBtn").addEventListener("click", refresh);
});
