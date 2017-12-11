/// <reference path="Deck.ts" />
/// <reference path="Card.ts" />

class Casino {

    public gameLogic(): void {

        alert("Welcome to Blackjack!");

        //playingDeck will be the deck the dealer holds
        let playingDeck: Deck = new Deck();
        playingDeck.createDeck();
        playingDeck.shuffle();

        //playerCards will be the cards the player has in their hand
        let playerCards: Deck = new Deck();
        playingDeck.createDeck();
        playingDeck.shuffle();

        let playerMoney: number = 10000.0;
        //dealerCards will be the cards that the dealer has in their hand
        let dealerCards: Deck = new Deck();

        //Play the game while the player has money
        //Game loop
        while (playerMoney > 0) {
            //Take Bet
            let playerBet: any = prompt("You have $" + playerMoney + ", how much would you like to bet?");

            //if player does not enter Number, message to user and try again
            playerBet = Number(playerBet);
            if (isNaN(playerBet) || playerBet === null || playerBet === undefined) {
                alert("That's not a valid bet!");
                continue;
            }
            let endRound = false;
            if (playerBet > playerMoney) {
                //Issue reminder and reprompt if they bet too much
                alert("You cannot bet more than you have...");
                continue;
            }
            if (playerBet <= 0) {
                //Reminder and reprompt if they try to bet 0 or a negative amount
                alert("You cannot make a zero or negative bet!");
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
                let dealerCard: Card = dealerCards.getCard(0);
                alert("Your Hand:" + playerCards.toString() +
                    "\nYour hand is currently valued at: " + playerCards.cardsValue() +
                    "\nDealer Hand: " + dealerCard.toString() + " and [hidden]");

                let response: number = 0;
                //handle any bad response (anything that is not a 1 for hit or 2 for stay)
                let badResponse: boolean = true;
                while (badResponse === true) {
                    response = Number(prompt("Would you like to (1)Hit or (2)Stand"));
                    if (response == 1 || response == 2)
                        badResponse = false;
                    else alert("That's not a valid response");

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
            //Determine if player or dealer wins
            if ((playerCards.cardsValue() > dealerCards.cardsValue()) && !endRound) {
                alert("You win the hand.");
                playerMoney += playerBet;
                endRound = true;
            } else if (!endRound) //dealer wins
            {
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

    }

}