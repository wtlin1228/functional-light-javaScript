"use strict";

function curry(numArgs, fn) {
  return (function nextCurried(collectedArgs) {
    return function curried(nextArg) {
      var args = [...collectedArgs, nextArg];
      if (args.length >= numArgs) {
        return fn(...args);
      }
      return nextCurried(args);
    };
  })([]);
}

function compose(...fns) {
  return function composed(v) {
    return fns.reduceRight(function reducer(value, fn) {
      value = fn(value);
      return value;
    }, v);
  };
}

function add1(v) {
  return v + 1;
}

function isOdd(v) {
  return v % 2 == 1;
}

function sum(total, v) {
  return total + v;
}

var list = [1, 3, 4, 6, 12, 13, 16, 21];

// list.map(add1).filter(isOdd).reduce(sum);

/******************************************/

function mapWithReduce(arr, mappingFn) {
  return arr.reduce(function reducer(list, v) {
    list.push(mappingFn(v));
    return list;
  }, []);
}

function filterWithReduce(arr, predicateFn) {
  return arr.reduce(function reducer(list, v) {
    if (predicateFn(v)) {
      list.push(v);
    }
    return list;
  }, []);
}

// list = mapWithReduce(list, add1);
// list = filterWithReduce(list, isOdd);
// list.reduce(sum);

/******************************************/
function mapReducer(mappingFn) {
  return function reducer(list, v) {
    list.push(mappingFn(v));
    return list;
  };
}

function filterReducer(predicateFn) {
  return function reducer(list, v) {
    if (predicateFn(v)) {
      list.push(v);
    }
    return list;
  };
}

// list.reduce(mapReducer(add1), []).reduce(filterReducer(isOdd), []).reduce(sum);

/******************************************/
function listCombination(list, v) {
  list.push(v);
  return list;
}

function mapReducer(mappingFn) {
  return function reducer(list, v) {
    return listCombination(list, mappingFn(v));
  };
}

function filterReducer(predicateFn) {
  return function reducer(list, v) {
    if (predicateFn(v)) return listCombination(list, v);
    return list;
  };
}

// list.reduce(mapReducer(add1), []).reduce(filterReducer(isOdd), []).reduce(sum);

/******************************************/
function listCombination(list, v) {
  list.push(v);
  return list;
}

var mapReducer = curry(2, function mapReducer(mappingFn, combineFn) {
  return function reducer(list, v) {
    return combineFn(list, mappingFn(v));
  };
});

var filterReducer = curry(2, function filterReducer(predicateFn, combineFn) {
  return function reducer(list, v) {
    if (predicateFn(v)) return combineFn(list, v);
    return list;
  };
});

// list
//   .reduce(mapReducer(add1)(listCombination), [])
//   .reduce(filterReducer(isOdd)(listCombination), [])
//   .reduce(sum);

/******************************************/
var transducer = compose(filterReducer(isOdd), mapReducer(add1));

// list.reduce(transducer(listCombination), []).reduce(sum);
// list.reduce(transducer(sum), 0)

function transduce(transducer, reducer, initialValue, arr) {
  return arr.reduce(transducer(reducer), initialValue);
}

console.log(transduce(transducer, sum, 0, list));
