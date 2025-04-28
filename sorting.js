// swap function util for sorting algorithms takes input of 2 DOM elements
function swap(el1, el2) {
    console.log('In swap()');
    
    // Add comparing animation
    el1.classList.add('comparing');
    el2.classList.add('comparing');
    
    let temp = el1.textContent;
    el1.textContent = el2.textContent;
    el2.textContent = temp;
    
    // Remove comparing animation after delay
    setTimeout(() => {
        el1.classList.remove('comparing');
        el2.classList.remove('comparing');
    }, delay);
}

// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = true;
    document.querySelector(".insertionSort").disabled = true;
    document.querySelector(".mergeSort").disabled = true;
    document.querySelector(".quickSort").disabled = true;
    document.querySelector(".selectionSort").disabled = true;
}

// Enables sorting buttons used in conjunction with disable
function enableSortingBtn(){
    document.querySelector(".bubbleSort").disabled = false;
    document.querySelector(".insertionSort").disabled = false;
    document.querySelector(".mergeSort").disabled = false;
    document.querySelector(".quickSort").disabled = false;
    document.querySelector(".selectionSort").disabled = false;
}

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableSizeSlider(){
    document.querySelector("#arr_sz").disabled = true;
}

// Enables size slider used in conjunction with disable
function enableSizeSlider(){
    document.querySelector("#arr_sz").disabled = false;
}

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
function disableNewArrayBtn(){
    document.querySelector(".newArray").disabled = true;
}

// Enables newArray buttons used in conjunction with disable
function enableNewArrayBtn(){
    document.querySelector(".newArray").disabled = false;
}

// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

// Selecting size input from DOM
let arraySize = document.querySelector('#arr_sz');

// Event listener to update the bars on the UI
arraySize.addEventListener('input', function(){
    let size = parseInt(arraySize.value);
    // Ensure size is within bounds
    if (size < 5) size = 5;
    if (size > 100) size = 100;
    arraySize.value = size;
    createNewArray(size);
});

// Default input for waitforme function (260ms)
let delay = 260;

// Selecting speed input from DOM
let delayElement = document.querySelector('#speed_input');

// Event listener to update delay time 
delayElement.addEventListener('input', function(){
    let speed = parseInt(delayElement.value);
    // Ensure speed is within bounds
    if (speed < 20) speed = 20;
    if (speed > 300) speed = 300;
    delayElement.value = speed;
    delay = speed;
});

// Creating array to store randomly generated numbers
let array = [];

// Call to display bars right when you visit the site
createNewArray();

// To create new array input size of array
function createNewArray(noOfBars = 20) {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an array of random numbers 
    array = [];
    for (let i = 0; i < noOfBars; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    console.log(array);

    // select the div #bars element
    const bars = document.querySelector("#bars");

    // create multiple element div using loop and adding class 'bar'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.textContent = array[i];
        bar.classList.add('bar');
        bar.classList.add('flex-item');
        bar.classList.add(`barNo${i}`);
        bars.appendChild(bar);
    }
}

// Helper function to delete all the previous bars so that new can be added
function deleteChild() {
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';
}

// Selecting newarray button from DOM and adding eventlistener
const newArray = document.querySelector(".newArray");
newArray.addEventListener("click", function(){
    console.log("From newArray " + arraySize.value);
    console.log("From newArray " + delay);
    enableSortingBtn();
    enableSizeSlider();
    createNewArray(arraySize.value);
});

// Algorithm descriptions
const algorithmDescriptions = {
    bubbleSort: {
        title: "Bubble Sort",
        description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The process is repeated until the list is sorted. Time Complexity: O(n²) in worst and average cases, O(n) in best case. Space Complexity: O(1)."
    },
    selectionSort: {
        title: "Selection Sort",
        description: "Selection Sort is a simple sorting algorithm that divides the input into a sorted and unsorted region. It repeatedly selects the smallest element from the unsorted region and moves it to the sorted region. Time Complexity: O(n²) in all cases. Space Complexity: O(1)."
    },
    insertionSort: {
        title: "Insertion Sort",
        description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. Time Complexity: O(n²) in worst and average cases, O(n) in best case. Space Complexity: O(1)."
    },
    quickSort: {
        title: "Quick Sort",
        description: "Quick Sort is an efficient, in-place sorting algorithm that uses a divide-and-conquer strategy. It picks an element as a pivot and partitions the array around the pivot. Time Complexity: O(n log n) in average case, O(n²) in worst case. Space Complexity: O(log n)."
    },
    mergeSort: {
        title: "Merge Sort",
        description: "Merge Sort is a divide-and-conquer algorithm that recursively breaks down the problem into smaller subproblems until they become simple enough to solve directly. It then combines the solutions to create the final sorted array. Time Complexity: O(n log n) in all cases. Space Complexity: O(n)."
    }
};

// Function to update algorithm description
function updateAlgorithmDescription(algorithm) {
    const descriptionContainer = document.getElementById('algorithm-description');
    const description = algorithmDescriptions[algorithm];
    
    if (description) {
        descriptionContainer.innerHTML = `
            <h3>${description.title}</h3>
            <p>${description.description}</p>
        `;
        descriptionContainer.classList.add('active');
    }
}

// Add event listeners for algorithm buttons
document.addEventListener('DOMContentLoaded', function() {
    // Bubble Sort
    document.querySelector(".bubbleSort").addEventListener("click", function() {
        updateAlgorithmDescription('bubbleSort');
    });

    // Selection Sort
    document.querySelector(".selectionSort").addEventListener("click", function() {
        updateAlgorithmDescription('selectionSort');
    });

    // Insertion Sort
    document.querySelector(".insertionSort").addEventListener("click", function() {
        updateAlgorithmDescription('insertionSort');
    });

    // Quick Sort
    document.querySelector(".quickSort").addEventListener("click", function() {
        updateAlgorithmDescription('quickSort');
    });

    // Merge Sort
    document.querySelector(".mergeSort").addEventListener("click", function() {
        updateAlgorithmDescription('mergeSort');
    });
});
