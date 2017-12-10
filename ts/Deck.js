var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = new Array(0);
    }
    Deck.prototype.createDeck = function () {
        this.cards = new Array(52);
        for (var card in this.cards) {
            for (var value = 0; value < 13; value++) {
                for (var suit = 0; suit < 4; suit++) {
                    this.cards[card] = new Card(suit, value);
                }
            }
        }
    };
    Deck.prototype.shuffle = function () {
        //Create a new arraylist to hold the shuffled cards temporarily
        var tmpDeck = new Array(52);
        //Randomly pick from the old deck and copy values to the new deck
        var randomCardIndex = 0;
        var originalSize = this.cards.length;
        for (var i = 0; i < originalSize; i++) {
            //gen random num according to int randomNum = rand.nextInt((max - min) + 1) + min;
            randomCardIndex = (Math.random() * (this.cards.length - 1) + 1);
            //throw random card into new deck
            tmpDeck[i] = this.cards[randomCardIndex];
            //remove picked from old deck
            this.cards.splice(randomCardIndex, 1);
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
        this.cards.splice(0, 0, addCard);
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
