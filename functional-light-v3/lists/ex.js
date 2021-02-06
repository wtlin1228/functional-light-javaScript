"use strict";

// Put your code here! :)
function fn1() {
  return 1;
}

function fn2() {
  return 2;
}

function add(a, b) {
  return a + b;
}

function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

function getValue(v) {
  return function returnValue() {
    return v;
  };
}

function addnLoop(fns) {
  while (fns.length > 2) {
    let [fn1, fn2, ...rest] = fns;
    fns = [
      function f() {
        return add2(fn1, fn2);
      },
      ...rest,
    ];
  }

  return add2(fns[0], fns[1]);
}

function addnRecursion([fn1, fn2, ...rest]) {
  if (rest.length == 0) {
    return add2(fn1, fn2);
  }

  return addnRecursion([
    function f() {
      return add2(fn1, fn2);
    },
    ...rest,
  ]);
}

function addnReducer(fns) {
  return fns.reduce(function reducer(composedFn, fn) {
    return function f() {
      return add2(composedFn, fn);
    };
  })();
}

console.log(
  addnReducer(
    [1, 2, 3, 4, 5, 6, 7, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]
      .reduce(function reducer(accumulator, currentValue) {
        if (!accumulator.includes(currentValue)) {
          return [...accumulator, currentValue];
        }
        return accumulator;
      }, [])
      .filter(function filterOutOdd(v) {
        return v % 2 == 0;
      })
      .map(getValue)
  ) == 12
);

// Test
// console.log(fn1() == 1);
// console.log(fn2() == 2);
// console.log(add(fn1(), fn2()) == 3);
// console.log(add2(fn1, fn2) == 3);

var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(
  addnLoop(
    values.map(function mapper(v) {
      return getValue(v);
    })
  ) == 55
);

console.log(
  addnRecursion(
    values.map(function mapper(v) {
      return getValue(v);
    })
  ) == 55
);

console.log(
  addnReducer(
    values.map(function mapper(v) {
      return getValue(v);
    })
  ) == 55
);
