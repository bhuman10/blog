async function bubbleSort() {
    console.log('In bubbleSort()');
    
    // Disable buttons during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    const bars = document.querySelectorAll('.bar');
    
    // Bubble Sort Algorithm
    for(let i = 0; i < bars.length; i++) {
        for(let j = 0; j < bars.length - i - 1; j++) {
            // Add comparing animation
            bars[j].classList.add('comparing');
            bars[j + 1].classList.add('comparing');
            
            // Wait for a moment
            await waitforme(delay);
            
            // Compare values
            if(parseInt(bars[j].textContent) > parseInt(bars[j + 1].textContent)) {
                // Swap values
                swap(bars[j], bars[j + 1]);
            }
            
            // Remove comparing animation
            bars[j].classList.remove('comparing');
            bars[j + 1].classList.remove('comparing');
        }
        
        // Mark the last element as sorted
        bars[bars.length - i - 1].classList.add('sorted');
    }
    
    // Enable buttons after sorting
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
}

// Add event listener to bubble sort button
document.querySelector(".bubbleSort").addEventListener("click", bubbleSort);
