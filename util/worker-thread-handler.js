const { parentPort, workerData } = require("worker_threads");
const { mergeSort } = require("./merge-sort-util");


parentPort.on("message", ({ sharedArray }) => {
    const startTime = new Date();
    
    // convert to regular Array and perform merge sort
    const regularArr = Array.from(sharedArray);
    mergeSort(regularArr)

    const endTime = new Date();
    console.log(`${endTime - startTime}ms taken by child ${workerData.type}`);

    // send the message to parent that the task is complete
    parentPort.postMessage({
        taskCompleted: true
    });
});