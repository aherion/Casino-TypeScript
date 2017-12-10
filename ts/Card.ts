    class Card {
        static suits: string[] = ["Clubs", "Diamonds", "Hearts", "Spades"];
        static values: string[] = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven",
            "Eight", "Nine", "Ten", "Jack", "Queen", "King"];
        public suit: number;
        public value: number;

        //indexes of suit and value in their respective arrays
        constructor(s: number, val: number) {
            this.suit = s;
            this.value = val;
        }

        public toString(): string {
            return "the " + Card.values[this.value] + " of " + Card.suits[this.suit];
        };
    }
