"use strict";

// partial(...) and curry(...)
function shippingRate(size, weight, speed) {
  return (size + 1) * weight + speed;
}

function partial(fn, ...args1) {
  return function parted(...args2) {
    return fn(...args1, ...args2);
  };
}

function curry(n, fn) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];
      if (args.length >= n) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

var partialShippingRate = partial(shippingRate, 1, 10);
var curriedShippingRate = curry(3, shippingRate);

console.log(curriedShippingRate);

console.log(partialShippingRate(3) == 23);
console.log(curriedShippingRate(1)(10)(3) == 23);
