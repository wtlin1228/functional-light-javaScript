"use strict"

function compose(...fns) {
  return function composed(v) {
    var result = v;
    for (let fn of fns.reverse()) {
      result = fn(result);
    }
    return result;
  };
}

function pipe(...fns) {
  return function piped(v) {
    var result = v;
    for (let fn of fns) {
      result = fn(result);
    }
    return result;
  };
}

// function shippingRate(x) {
//   return ((x + 1) * 3) - 2;
// }

function add(y) {
  return function added(x) {
    return x + y;
  };
}

function multiply(y) {
  return function multiplied(x) {
    return x * y;
  };
}

var add1 = add(1);
var multiply3 = multiply(3);
var minus2 = add(-2);

function shippingRate(x) {
  return minus2(multiply3(add1(x)));
}

var shippingRateByCompose = compose(minus2, multiply3, add1);
var shippingRateByPipe = pipe(add1, multiply3, minus2);

console.log(shippingRate(5) == 16);
console.log(shippingRate(5) == shippingRateByCompose(5));
console.log(shippingRate(5) == shippingRateByPipe(5));

