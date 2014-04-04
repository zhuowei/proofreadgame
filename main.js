"use strict";
var leftQuestionOutput, rightQuestionOutput;
var isSame, leftSentence, rightSentence;
var gameRunning = false;
var timerId;
var timeOutput;
var timeRemaining;
var score;
function loadHandler() {
	leftQuestionOutput = document.getElementById("word1");
	rightQuestionOutput = document.getElementById("word2");
	timeOutput = document.getElementById("time-output");
}

function generateSource() {
	var myint = Math.floor(Math.random() * 100000000000);
	return myint.toString();
	//todo: more sources
}

function mangleSource(source) {
	while(true) {
		var splitted = source.split("");
		splitted[Math.floor(Math.random() * splitted.length)] = Math.floor(Math.random() * 10);
		var returnval = splitted.join("");
		if (returnval != source) return returnval;
	}
}

function generateQuestion() {
	isSame = Math.random() < 0.5;
	var orig = generateSource();
	var newsentence = isSame? orig: mangleSource(orig);
	if (Math.random() < 0.5) {
		leftSentence = orig;
		rightSentence = newsentence;
	} else {
		leftSentence = newsentence;
		rightSentence = orig;
	}
	leftQuestionOutput.textContent = leftSentence;
	rightQuestionOutput.textContent = rightSentence;
}

function startGame() {
	score = 0;
	gameRunning = true;
	timeRemaining = 120;
	generateQuestion();
	timerId = setInterval(timerTick, 1000);
	timerTick();
}

function endGame() {
	gameRunning = false;
	clearInterval(timerId);
}

function timerTick() {
	timeOutput.textContent = timeRemaining + " seconds";
	if (timeRemaining-- <= 0) {
		endGame();
		alert("Time up! score: " + score);
	}
}

function checkCorrect(myanswer) {
	if (myanswer == isSame) {
		score += 1;
		generateQuestion();
	} else {
		endGame();
		alert("FAIL: is actually " + (isSame? "same": "different") + ": score " + score);
	}
}

function keyDownHandler(e) {
	if (gameRunning) {
		checkCorrect(e.keyCode == 32);
	} else {
		startGame();
	}
}

window.onload = loadHandler;
window.onkeydown = keyDownHandler;