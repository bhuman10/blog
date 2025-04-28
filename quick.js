async function quickSort() {
    console.log('In quickSort()');
    
    // Disable buttons during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    const bars = document.querySelectorAll('.bar');
    await quickSortHelper(bars, 0, bars.length - 1);
    
    // Enable buttons after sorting
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
}

async function quickSortHelper(bars, low, high) {
    if (low < high) {
        // Find the partition index
        let pi = await partition(bars, low, high);
        
        // Mark the pivot as sorted
        bars[pi].classList.add('sorted');
        
        // Recursively sort the left and right subarrays
        await quickSortHelper(bars, low, pi - 1);
        await quickSortHelper(bars, pi + 1, high);
    }
}

async function partition(bars, low, high) {
    // Choose the rightmost element as pivot
    let pivot = parseInt(bars[high].textContent);
    let i = low - 1;
    
    // Add comparing animation for pivot
    bars[high].classList.add('comparing');
    
    for (let j = low; j < high; j++) {
        // Add comparing animation
        bars[j].classList.add('comparing');
        
        // Wait for a moment
        await waitforme(delay);
        
        if (parseInt(bars[j].textContent) < pivot) {
            i++;
            if (i !== j) {
                swap(bars[i], bars[j]);
            }
        }
        
        // Remove comparing animation
        bars[j].classList.remove('comparing');
    }
    
    // Place the pivot in its correct position
    swap(bars[i + 1], bars[high]);
    
    // Remove comparing animation
    bars[high].classList.remove('comparing');
    
    return i + 1;
}

// Add event listener to quick sort button
document.querySelector(".quickSort").addEventListener("click", quickSort);