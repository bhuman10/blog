async function insertionSort() {
    console.log('In insertionSort()');
    
    // Disable buttons during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    const bars = document.querySelectorAll('.bar');
    
    // Insertion Sort Algorithm
    for(let i = 1; i < bars.length; i++) {
        let current = parseInt(bars[i].textContent);
        let j = i - 1;
        
        // Add comparing animation
        bars[i].classList.add('comparing');
        
        while(j >= 0 && parseInt(bars[j].textContent) > current) {
            // Add comparing animation
            bars[j].classList.add('comparing');
            
            // Wait for a moment
            await waitforme(delay);
            
            // Move elements
            bars[j + 1].textContent = bars[j].textContent;
            
            // Remove comparing animation
            bars[j].classList.remove('comparing');
            
            j--;
        }
        
        // Place the current element in its correct position
        bars[j + 1].textContent = current;
        
        // Remove comparing animation
        bars[i].classList.remove('comparing');
        
        // Mark the current element as sorted
        bars[j + 1].classList.add('sorted');
    }
    
    // Enable buttons after sorting
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
}

// Add event listener to insertion sort button
document.querySelector(".insertionSort").addEventListener("click", insertionSort);


