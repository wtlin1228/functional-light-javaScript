"use strict";


function when(fn) {
	return function(predicate){
		return function(...args){
			if (predicate(...args)) {
				return fn(...args);
			}
		};
	};
}

function not(fn) {
	return function negated(...arg) {
		return !fn(...arg);
	}
}

/**************************************/

var output = console.log.bind(console);
var printIf = when(output);
function isShortEnough(str) {
	return str.length <= 5;
}
var isLongEnough = not(isShortEnough);

var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1);		// Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2);		// Hello World
