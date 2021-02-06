function mod(y) {
  return function forX(x) {
    return x % y;
  }
}

function eq(y) {
  return function forX(x) {
    return x === y;
  }
}

function compose(fn1, fn2) {
  return function composed(v) {
    return fn1(fn2(v));
  }
}

/**************************************/

var isOdd = compose(eq(1), mod(2));

console.log(isOdd(1));
console.log(isOdd(2))