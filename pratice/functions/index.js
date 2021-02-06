// unspread(...)
function unspreadArgs(fn) {
  return function unspread(...args) {
    return fn(args);
  };
}

function f1([x, y, z, w]) {
  return x + y + z + w;
}

var g1 = unspreadArgs(f1);

console.log(g1(1, 2, 3, 4) == 10);

// spread(...)
function spreadArgs(fn) {
  return function spread(args) {
    return fn(...args);
  };
}

function f2(x, y, z, w) {
  return x + y + z + w;
}

var g2 = spreadArgs(f2);

console.log(g2([1, 2, 3, 4]) == 10);

// not(...)
function not(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

function isOdd(v) {
  return v % 2 == 1;
}

var isEven = not(isOdd);

console.log(isEven(5) == false);
console.log(isEven(6) == true);

// compose(...)
function compose(...fns) {
  return function composed(v) {
    var result = v;
    for (let fn of fns.reverse()) {
      result = fn(result);
    }
    return result;
  };
}

function mod(y) {
  return function forX(x) {
    return x % y;
  };
}

function eq(y) {
  return function forX(x) {
    return x === y;
  };
}

// var isOdd = compose(eq(1), mod(2));
// var isEven = compose(eq(0), mod(2));
console.log(compose(eq(1), mod(2))(3) == true);

// partial(...) and curry(...)
function shippingRate(size, weight, speed) {
  return ((size + 1) * weight) + speed;
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

console.log(partialShippingRate(3) == 23);
console.log(curriedShippingRate(1)(10)(3) == 23);

