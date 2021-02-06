var SomeAPI = {
  threshold: 13,
  isBelowThreshold(x) {
    return x <= SomeAPI.threshold;
  }
};

var numbers = [];

function insertSortedDesc(v) {
  SomeAPI.threshold = v;
  var idx = numbers.findIndex(SomeAPI.isBelowThreshold);
  if (idx == -1) {
    idx = numbers.length;
  }
  numbers.splice(idx, 0, v);
}

insertSortedDesc(3);
insertSortedDesc(5);
insertSortedDesc(1);
insertSortedDesc(4);
insertSortedDesc(2);

console.log(numbers);