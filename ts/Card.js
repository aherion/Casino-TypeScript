var Card = /** @class */ (function () {
    //indexes of suit and value in their respective arrays
    function Card(s, val) {
        this.s = s;
        this.val = val;
        this.suit = s;
        this.value = val;
    }
    Card.prototype.toString = function () {
        return "The " + Card.values[this.value] + " of " + Card.suits[this.suit];
    };
    ;
    Card.suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
    Card.values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
        "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
    return Card;
}());
