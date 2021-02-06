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

function getSortedNums(nums, v) {
  var [origNumbers, origThreshold] = [numbers, SomeAPI.threshold];
  numbers = nums.slice();
  insertSortedDesc(v);
  nums = numbers;
  [numbers, SomeAPI.threshold] = [origNumbers, origThreshold];
  return nums;
}

numbers = getSortedNums(numbers, 3);
numbers = getSortedNums(numbers, 5);
numbers = getSortedNums(numbers, 1);
numbers = getSortedNums(numbers, 4);
numbers = getSortedNums(numbers, 2);

console.log(numbers);