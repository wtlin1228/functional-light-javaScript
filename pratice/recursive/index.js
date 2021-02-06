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

// for loop
function countVowels(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    if (isVowel(str[i])) {
      count++;
    }
  }
  return count;
}

// normal recursion
function countVowelsRecursion(str) {
  if (str.length == 0) return 0;
  var first = (isVowel(str[0]) ? 1 : 0);
  return first + countVowelsRecursion( str.slice(1) );
}


// PTC (Proper Tail Calls)
var countVowelsPTC = curry(2, function countVowelsPTC(count, str) {
  count += (isVowel(str[0]) ? 1 : 0);
  if (str.length <= 1) return count;
  return countVowelsPTC( count, str.slice(1) );
})(0);

// CPS (Continuation Passing Style)
function countVowelsCPS(str, cont = v => v) {
  var first = (isVowel(str[0]) ? 1 : 0);
  if (str.length <= 1) return cont(first);
  return countVowelsCPS(str.slice(1), function f(v) {
    return cont(first + v);
  })
}

// Example:
// str = The, cont = v => v
// var first = 0
// str = he, cont = v => cont(0 + v)
// var first = 0
// str = e, cont = v => cont(0 + cont(0 + v))
// var first = 1
//
// return cont(0 + cont(0 + 1))
// return cont(0 + cont(1))
// return cont(0 + 1)
// return cont(1)
// return 1


// Trampolines
function trampolines(fn) {
  return function trampolined(...args) {
    var result = fn(...args);

    while(typeof result == 'function') {
      result = result();
    }

    return result;
  }
}

var countVowelsTrampolined = trampolines(
  function countVowelsTrampolined(count, str) {
    count += (isVowel(str[0]) ? 1 : 0);
    if (str.length <= 1) return count;
    return function f() {
      return countVowelsTrampolined(count, str.slice(1));
    };
  });

var countVowelsTrampolined = curry(2, countVowelsTrampolined)(0);

var testString = "The quick brown fox jumps over the lazy dog";
console.log(countVowels(testString));
console.log(countVowelsRecursion(testString));
console.log(countVowelsPTC(testString));
console.log(countVowelsCPS(testString));
console.log(countVowelsTrampolined(testString));