var Card = /** @class */ (function () {
    //indexes of suit and value in their respective arrays
    function Card(s, val) {
        this.suit = s;
        this.value = val;
    }
    Card.prototype.toString = function () {
        return "the " + Card.values[this.value] + " of " + Card.suits[this.suit];
    };
    ;
    Card.suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    Card.values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
        "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
    return Card;
}());
/// <reference path="Card.ts" />
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = new Array(0);
    }
    //put card in deck into string
    Deck.prototype.toString = function () {
        var deckString = "";
        var size = this.deckSize();
        for (var i = 0; i < size; i++) {
            deckString += this.getCard(i).toString();
            //if there's already a card in hand then we list that AND the next card
            if (i < size - 1)
                deckString += " and ";
        }
        return deckString;
    };
    Deck.prototype.createDeck = function () {
        for (var value = 0; value < 13; value++) {
            for (var suit = 0; suit < 4; suit++) {
                this.cards.unshift(new Card(suit, value));
            }
        }
    };
    Deck.prototype.shuffle = function () {
        //Create a new arraylist to hold the shuffled cards temporarily
        var tmpDeck = new Array(0);
        //Randomly pick from the old deck and copy values to the new deck
        var randomCardIndex = 0;
        var originalSize = this.cards.length;
        var _loop_1 = function (i) {
            var currentSize = this_1.cards.length;
            //gen random num according to int randomNum = rand.nextInt((max - min) + 1) + min;
            //get a random card and recurse on failure (b/c for some unknown reason, as of now, there are fandom undefined
            //cards making it into the deck
            var randomCard = void 0;
            var getRandomCard = function (deck) {
                randomCardIndex = Math.round(Math.random() * (currentSize - 1));
                var randomCard = deck.cards[randomCardIndex];
                if (randomCard === undefined)
                    return getRandomCard(deck);
                return randomCard;
            };
            randomCard = getRandomCard(this_1);
            //throw random card into new deck
            tmpDeck.unshift(randomCard);
            //remove picked from old deck
            this_1.cards.splice(randomCardIndex, 1);
        };
        var this_1 = this;
        for (var i = 0; i < originalSize; i++) {
            _loop_1(i);
        }
        //set this.deck to our newly shuffled deck
        this.cards = tmpDeck;
    };
    //Remove a card from the deck
    Deck.prototype.removeCard = function (i) {
        this.cards.splice(i, 1);
    };
    //Get card from deck
    Deck.prototype.getCard = function (i) {
        return this.cards[i];
    };
    //Add card to deck
    Deck.prototype.addCard = function (addCard) {
        this.cards.unshift(addCard);
    };
    //Draw a top card from deck
    Deck.prototype.draw = function (comingFrom) {
        //Add card to this deck from whatever deck its coming from
        this.addCard(comingFrom.getCard(0));
        //Remove the card in the deck its coming from
        comingFrom.removeCard(0);
    };
    Deck.prototype.deckSize = function () {
        return this.cards.length;
    };
    Deck.prototype.moveAllToDeck = function (moveTo) {
        var thisDeckSize = this.cards.length;
        //put cards in moveTo deck
        for (var i = 0; i < thisDeckSize; i++) {
            moveTo.addCard(this.getCard(i));
        }
        //empty out the deck
        for (var i = 0; i < thisDeckSize; i++) {
            this.removeCard(0);
        }
    };
    //Calculate the value of deck
    Deck.prototype.cardsValue = function () {
        var totalValue = 0;
        var aces = 0;
        var aCard;
        //For every card in the deck
        for (var index in this.cards) {
            aCard = this.cards[index];
            if (aCard === undefined || aCard === null)
                continue;
            //Switch of possible values
            switch (aCard.value) {
                case 1:
                    totalValue += 2;
                    break;
                case 2:
                    totalValue += 3;
                    break;
                case 3:
                    totalValue += 4;
                    break;
                case 4:
                    totalValue += 5;
                    break;
                case 5:
                    totalValue += 6;
                    break;
                case 6:
                    totalValue += 7;
                    break;
                case 7:
                    totalValue += 8;
                    break;
                case 8:
                    totalValue += 9;
                    break;
                case 9:
                    totalValue += 10;
                    break;
                case 10:
                    totalValue += 10;
                    break;
                case 11:
                    totalValue += 10;
                    break;
                case 12:
                    totalValue += 10;
                    break;
                case 0:
                    aces += 1;
                    break;
            }
        }
        //Determine the total current value with aces
        //Aces worth 11 or 1 - if 11 would go over 21 make it worth 1
        for (var i = 0; i < aces; i++) {
            //If they're already at over 10 getting an ace valued at 11 would put them up to 22, so make ace worth one
            if (totalValue > 10) {
                totalValue += 1;
            }
            else {
                totalValue += 11;
            }
        }
        //Return
        return totalValue;
    };
    return Deck;
}());
/// <reference path="Deck.ts" />
/// <reference path="Card.ts" />
var Casino = /** @class */ (function () {
    function Casino() {
    }
    Casino.prototype.gameLogic = function () {
        alert("Welcome to Blackjack!");
        //playingDeck will be the deck the dealer holds
        var playingDeck = new Deck();
        playingDeck.createDeck();
        playingDeck.shuffle();
        //playerCards will be the cards the player has in their hand
        var playerCards = new Deck();
        playingDeck.createDeck();
        playingDeck.shuffle();
        var playerMoney = 10000.0;
        //dealerCards will be the cards that the dealer has in their hand
        var dealerCards = new Deck();
        //Play the game while the player has money
        //Game loop
        while (playerMoney > 0) {
            //Take Bet
            var playerBet = prompt("You have $" + playerMoney + ", how much would you like to bet?");
            //if player does not enter Number, message to user and try again
            playerBet = Number(playerBet);
            if (isNaN(playerBet) || playerBet === null || playerBet === undefined) {
                alert("That's not number!");
                continue;
            }
            var endRound = false;
            if (playerBet > playerMoney) {
                //Break if they bet too much
                alert("You cannot bet more than you have.");
                continue;
            }
            if (playerBet <= 0) {
                //Break if they cheat-500
                alert("You cannot bet zero or a negative amount!");
                continue;
            }
            //Player gets two cards
            playerCards.draw(playingDeck);
            playerCards.draw(playingDeck);
            //Dealer gets two cards
            dealerCards.draw(playingDeck);
            dealerCards.draw(playingDeck);
            //While loop for drawing new cards
            while (true) {
                //Display cards
                var dealerCard = dealerCards.getCard(0);
                alert("Your Hand:" + playerCards.toString() +
                    "\nYour hand is currently valued at: " + playerCards.cardsValue() +
                    "\nDealer Hand: " + dealerCard.toString() + " and [hidden]");
                //What do they want to do
                var response = 0;
                //handle any bad response (anything that is not a 1 for hit or 2 for stay)
                var badResponse = true;
                while (badResponse) {
                    response = Number(prompt("Would you like to (1)Hit or (2)Stand"));
                    if (response == 1 || response == 2)
                        badResponse = false;
                    else
                        alert("That's not a valid response");
                }
                //They hit
                if (response == 1) {
                    playerCards.draw(playingDeck);
                    alert("You draw a:" + playerCards.getCard(playerCards.deckSize() - 1).toString());
                    //Bust if they go over 21
                    if (playerCards.cardsValue() > 21) {
                        alert("Bust. Currently valued at: " + playerCards.cardsValue());
                        playerMoney -= playerBet;
                        endRound = true;
                        break;
                    }
                }
                //Stand
                if (response == 2) {
                    break;
                }
            }
            //Reveal Dealer Cards
            alert("Dealer Cards:" + dealerCards.toString());
            //See if dealer has more points than player
            if ((dealerCards.cardsValue() > playerCards.cardsValue()) && !endRound) {
                alert("Dealer beats you " + dealerCards.cardsValue() + " to " + playerCards.cardsValue());
                playerMoney -= playerBet;
                endRound = true;
            }
            //Dealer hits at 16 stands at 17
            while ((dealerCards.cardsValue() < 17) && !endRound) {
                dealerCards.draw(playingDeck);
                alert("Dealer draws: " + dealerCards.getCard(dealerCards.deckSize() - 1).toString());
            }
            //Display value of dealer
            alert("Dealers hand value: " + dealerCards.cardsValue());
            //Determine if dealer busted
            if ((dealerCards.cardsValue() > 21) && !endRound) {
                alert("Dealer Busts. You win!");
                playerMoney += playerBet;
                endRound = true;
            }
            //Determine if push
            if ((dealerCards.cardsValue() == playerCards.cardsValue()) && !endRound) {
                alert("Push.");
                endRound = true;
            }
            //Determine if player wins
            if ((playerCards.cardsValue() > dealerCards.cardsValue()) && !endRound) {
                alert("You win the hand.");
                playerMoney += playerBet;
                endRound = true;
            }
            else if (!endRound) {
                alert("Dealer wins.");
                playerMoney -= playerBet;
            }
            //End of hand - put cards back in deck
            playerCards.moveAllToDeck(playingDeck);
            dealerCards.moveAllToDeck(playingDeck);
            alert("End of Hand.");
        }
        //Game is over
        alert("Game over! You lost all your money. :(");
    };
    return Casino;
}());
/// <reference path="Casino.ts" />
var casino = new Casino();
document.getElementById("startButton").addEventListener("click", function () { return casino.gameLogic(); });
//# sourceMappingURL=app.js.map