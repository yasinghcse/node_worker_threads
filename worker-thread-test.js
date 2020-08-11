const { Worker } = require("worker_threads");
const { getSharedArray } = require("./util/common-util");

const sharedArrayForWorker1 = getSharedArray(10000000); // 10 million
const sharedArrayForWorker2 = getSharedArray(10000000); // 10 million
let isWorker1Done = false;
let isWorker2Done = false;

// creating threads
const worker1 = new Worker("./util/worker-thread-handler.js", { workerData: { type: "Thread 1" }});
const worker2 = new Worker("./util/worker-thread-handler.js", { workerData: { type: "Thread 2" }});

const startTime = new Date();

// submitting work
worker1.postMessage({ sharedArray: sharedArrayForWorker1 });
worker2.postMessage({ sharedArray: sharedArrayForWorker2 });

// validate all work is done and terminate threads
const _checkIfAllTasksFinished = () => {
    if (isWorker1Done && isWorker2Done) {
        const endTime = new Date();

        // terminate threads
        worker1.terminate();
        worker2.terminate();
        console.log(`All array sorted with Merge Sort. Total time taken ${endTime - startTime}ms`);
    }
};

// event listerner for worker thread 1
worker1.on("message", (result) => {
    if (result && result.taskCompleted){
        isWorker1Done = true;
        _checkIfAllTasksFinished();
    }
});

worker1.on("exit", (result) => {
    console.log("worker 1 exited");
});

worker1.on("error", (err) => {
    console.log("worker 1 error", err);
})

// event listerner for worker thread 2
worker2.on("message", (result) => {
    if (result && result.taskCompleted){
        isWorker2Done = true;
        _checkIfAllTasksFinished();
    }
});

worker2.on("exit", (result) => {
    console.log("worker 2 exited");
});

worker2.on("error", (err) => {
    console.log("worker 2 error", err);
})