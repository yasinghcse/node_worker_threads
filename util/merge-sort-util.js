
const _isValidMergeSortInput = (unsortedList) => {
    if(!Array.isArray(unsortedList)) {
        console.log("Only Array expected in the input");
        return false;
    }

    if(unsortedList.length === 0) {
        console.log("No element in list to sort.");
        return false;
    }

    return true;
};

const _mergeAndSort = (leftList, rightList) => {
    const sortedList = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // sort the left and right list
    while(leftIndex < leftList.length && rightIndex < rightList.length) {
        if(leftList[leftIndex] < rightList[rightIndex]) {
            sortedList.push(leftList[leftIndex]);
            leftIndex++;
            continue;
        }
        sortedList.push(rightList[rightIndex]);
        rightIndex++;
    }

    return sortedList
        .concat(leftList.splice(leftIndex))
        .concat(rightList.splice(rightIndex));
};

const _mergeSort = (unsortedList) => {

    if(!_isValidMergeSortInput(unsortedList)) {
        return;
    }

    // stop splitting the list of array length is 1 (base conditions)
    if (unsortedList.length <= 1) {
        return unsortedList;
    }

    // Divide the list into 2 equal partition
    const middleIndex = Math.floor(unsortedList.length/2);
    const leftUnsortedList = unsortedList.slice(0, middleIndex);
    const rightUnsortedList = unsortedList.slice(middleIndex);


    // recursive list splitting and sorting 
    return _mergeAndSort(_mergeSort(leftUnsortedList), _mergeSort(rightUnsortedList));
};

module.exports.mergeSort = _mergeSort;