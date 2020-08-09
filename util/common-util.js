const _getRandomNumber = (range) => Math.floor(Math.random()*range);

const _getArrWithRandomNumbers = (size) => {
    let index = 0;
    const genArr = [];
    while(index < size) {
        genArr.push(_getRandomNumber(10000));
        index++;
    }
    return genArr;
};

const _getSharedArray = (elementSize) => {
    const sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT *  elementSize);
    let sharedArray = new Int32Array(sharedBuffer);
    let randomArr = _getArrWithRandomNumbers(elementSize);
    for(let i = 0; i < elementSize; i++ ) {
        sharedArray[i] = randomArr[i];    
    }
    return sharedArray;
};

module.exports.getArrWithRandomNumbers = _getArrWithRandomNumbers;
module.exports.getSharedArray = _getSharedArray;
