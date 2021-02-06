"use strict"

/*********************************/

// map: transformation
function map(mapper, arr) {
  var newList = [];
  for (let elem of arr) {
    newList.push(mapper(elem));
  }
  return newList;
}

// filter: exclusion
function filterIn(predicate, arr) {
  var newList = [];
  for (let elem of arr) {
    if (predicate(elem)) {
      newList.push(elem);
    }
  }
  return newList;
}

// reduce: combining
function reduce(reducer, initialVal, arr) {
  var ret = initialVal;
  for (let elem of arr) {
    ret = reducer(ret, elem);
  }
  return ret;
}

// implement composition by reduceRight
function compose(...fns) {
  return function composed(v) {
    return fns.reduceRight(function invoke(val, fn) {
      return fn(val);
    }, v);
  };
}

var shippingRateComposed = compose(
  x => x + 1,
  x => x * 3,
  x => x - 2
);

console.log(shippingRateComposed(5) == 10);

// implement pipe by reduce
function pipe(...fns) {
  return function piped(v) {
    return fns.reduce(function invoke(val, fn) {
      return fn(val);
    }, v);
  };
}

var shippingRatePiped = pipe(
  x => x - 2,
  x => x * 3,
  x => x + 1
);

console.log(shippingRatePiped(5) == 10);

