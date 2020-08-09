const { mergeSort } = require("./util/merge-sort-util");
const { getArrWithRandomNumbers } = require("./util/common-util");

const startTime = new Date();

// perform 2 sorting operations
mergeSort(getArrWithRandomNumbers(10000000)); // 10 million
mergeSort(getArrWithRandomNumbers(10000000)); // 10 million

const endTime = new Date();
console.log(`All array sorted with Merge Sort. Total time taken ${endTime - startTime}ms`);
