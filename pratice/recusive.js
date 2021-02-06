"use strict"

function isVowel(char) {
  return ["a", "e", "i", "o", "u"].includes(char);
}

function curry(arity,fn) {
	return (function nextCurried(prevArgs){
		return function curried(nextArg){
			var args = prevArgs.concat([nextArg]);
			if (args.length >= arity) {
				return fn(...args);
			}
			else {
				return nextCurried(args);
			}
		};
	})([]);
}

/*************************************/

// loop
function countVowelsLoop(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (isVowel(str[i])) {
      count++;
    }
  }
  return count;
}

// normal recursion
function countVowelRecursive(str) {
	if (str.length == 0) return 0;
	var first = isVowel(str[0]) ? 1 : 0;
	return first + countVowelRecursive(str.slice(1));
}

// PTC (Proper Tail Calls)
var countVowelRecursivePTC = curry(
	2, 
	function countVowelRecursivePTC(count, str) {
		if (str.length == 0) return count;
		var first = isVowel(str[0]) ? 1 : 0;
		return countVowelRecursivePTC(first + count, str.slice(1));
	}
)(0);

// CPS (Continuation Passing Style)
function countVowelRecursiveCPS(str, cont = v => v) {
	if (str.length == 0) return cont(0);
	var first = isVowel(str[0]) ? 1 : 0;
	return countVowelRecursiveCPS(str.slice(1), function f(v) {
		return cont(first + v);
	});
}

// Trampolines
function trampolines(fn) {
	return function trampolined(...args) {
		var result = fn(...args);
		
		while (typeof result == 'function') {
			result = result();
		}

		return result;
	};
}

var countVowelRecursiveTrampolines = curry(
	2,
	trampolines(
		function countVowelRecursiveTrampolines(count, str) {
			if (str.length == 0) return count;
			var first = isVowel(str[0]) ? 1 : 0;
			return function f() {
				return countVowelRecursiveTrampolines(first + count, str.slice(1));
			};
		}
	) 
)(0);

var testString = "The quick brown fox jumps over the lazy dog";
console.log(countVowelsLoop(testString));
console.log(countVowelRecursive(testString));
console.log(countVowelRecursivePTC(testString));
console.log(countVowelRecursiveCPS(testString));
console.log(countVowelRecursiveTrampolines(testString));