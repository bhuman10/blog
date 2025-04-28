async function selectionSort() {
    console.log('In selectionSort()');
    
    // Disable buttons during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    const bars = document.querySelectorAll('.bar');
    
    // Selection Sort Algorithm
    for(let i = 0; i < bars.length; i++) {
        let min_idx = i;
        
        // Find the minimum element in unsorted array
        for(let j = i + 1; j < bars.length; j++) {
            // Add comparing animation
            bars[j].classList.add('comparing');
            bars[min_idx].classList.add('comparing');
            
            // Wait for a moment
            await waitforme(delay);
            
            if(parseInt(bars[j].textContent) < parseInt(bars[min_idx].textContent)) {
                min_idx = j;
            }
            
            // Remove comparing animation
            bars[j].classList.remove('comparing');
            bars[min_idx].classList.remove('comparing');
        }
        
        // Swap the found minimum element with the first element
        if(min_idx !== i) {
            swap(bars[i], bars[min_idx]);
        }
        
        // Mark the current element as sorted
        bars[i].classList.add('sorted');
    }
    
    // Enable buttons after sorting
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
}

// Add event listener to selection sort button
document.querySelector(".selectionSort").addEventListener("click", selectionSort);