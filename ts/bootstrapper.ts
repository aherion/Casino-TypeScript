/// <reference path="Casino.ts" />
var casino:Casino = new Casino();
document.getElementById("startButton").addEventListener("click", () => casino.gameLogic());
