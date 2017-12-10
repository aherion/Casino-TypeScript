/// <reference path="Card.ts" />

class Deck {
    private cards: Array<Card>;

    constructor() {
        this.cards = new Array<Card>(0);
    }

    //put card in deck into string
    toString(): string {
        let deckString: string = "";
        let size: number = this.deckSize();
        for(let i = 0; i < size; i++){
            deckString += this.getCard(i).toString();
            //if there's already a card in hand then we list that AND the next card
            if(i < size-1) deckString += " and ";
        }
        return deckString;
    }

    createDeck(): void {
            for (let value = 0; value < 13; value++) {
                for (let suit = 0; suit < 4; suit++) {
                    this.cards.unshift(new Card(suit, value));
                }
            }
    }

    shuffle(): void {
        //Create a new arraylist to hold the shuffled cards temporarily
        let tmpDeck: Card[] = new Array<Card>(0);
        //Randomly pick from the old deck and copy values to the new deck
        let randomCardIndex = 0;
        let originalSize = this.cards.length;
        for (let i = 0; i < originalSize; i++) {
            let currentSize = this.cards.length;
            //gen random num according to int randomNum = rand.nextInt((max - min) + 1) + min;
            //get a random card and recurse on failure (b/c for some unknown reason, as of now, there are fandom undefined
            //cards making it into the deck
            let randomCard: Card;
            let getRandomCard = function(deck:Deck) {
                randomCardIndex = Math.round(Math.random() * (currentSize - 1));
                let randomCard = deck.cards[randomCardIndex];
                if (randomCard === undefined) return getRandomCard(deck);
                return randomCard;
            }
             randomCard = getRandomCard(this);

            //throw random card into new deck
            tmpDeck.unshift(randomCard);
            //remove picked from old deck
            this.cards.splice(randomCardIndex, 1);
        }
        //set this.deck to our newly shuffled deck
        this.cards = tmpDeck;
    }

    //Remove a card from the deck
    public removeCard(i: number): void {
        this.cards.splice(i, 1);
    }

//Get card from deck
    public getCard(i: number): Card {
        return this.cards[i];
    }

//Add card to deck
    public addCard(addCard: Card): void {
        this.cards.unshift(addCard);
    }

//Draw a top card from deck
    public draw(comingFrom: Deck): void {
        //Add card to this deck from whatever deck its coming from
        this.addCard(comingFrom.getCard(0));
        //Remove the card in the deck its coming from
        comingFrom.removeCard(0);
    }

    public deckSize(): number {
        return this.cards.length;
    }

    public moveAllToDeck(moveTo: Deck): void {
        let thisDeckSize = this.cards.length;
        //put cards in moveTo deck
        for (let i = 0; i < thisDeckSize; i++) {
            moveTo.addCard(this.getCard(i));
        }
//empty out the deck
        for (let i = 0; i < thisDeckSize; i++) {
            this.removeCard(0);
        }
    }

    //Calculate the value of deck
    public cardsValue(): number {
        let totalValue: any = 0;
        let aces: any = 0;
        let aCard: Card;
        //For every card in the deck
        for (let index in this.cards) {
            aCard = this.cards[index];
            if(aCard === undefined || aCard === null) continue;
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
        for (let i = 0; i < aces; i++) {
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

    }
}