"use strict";

function lotteryNum() {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(num, arr) {
	if (!arr.includes(num)) {
		arr = [...arr, num];
		arr.sort(function compare(a, b) { return a - b; })
	}
	return arr;
}

var luckyLotteryNumbers = [];
const howMany = 6;

while (luckyLotteryNumbers.length < howMany) {
	luckyLotteryNumbers = pickNumber(
		lotteryNum(),
		Object.freeze(luckyLotteryNumbers)
	);
}

console.log(luckyLotteryNumbers);
