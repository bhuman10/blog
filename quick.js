async function partitionLomuto(ele, l, r){
    console.log('In partitionLomuto()');
    let i = l - 1;
    // color pivot element
    ele[r].style.background = 'red';
    for(let j = l; j <= r - 1; j++){
        console.log('In partitionLomuto for j');
        // color current element
        ele[j].style.background = 'yellow';
        // pauseChamp
        await waitforme(delay);

        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            console.log('In partitionLomuto for j if');
            i++;
            swap(ele[i], ele[j]);
            // color 
            ele[i].style.background = 'orange';
            if(i != j) ele[j].style.background = 'orange';
            // pauseChamp
            await waitforme(delay);
        }
        else{
            // color if not less than pivot
            ele[j].style.background = 'pink';
        }
    }
    i++; 
    // pauseChamp
    await waitforme(delay);
    swap(ele[i], ele[r]); // pivot height one
    console.log(`i = ${i}`, typeof(i));
    // color
    ele[r].style.background = 'pink';
    ele[i].style.background = 'green';

    // pauseChamp
    await waitforme(delay);
    
    // color
    for(let k = 0; k < ele.length; k++){
        if(ele[k].style.background != 'green')
            ele[k].style.background = 'cyan';
    }

    return i;
}

async function quickSort(ele, l, r){
    console.log('In quickSort()', `l=${l} r=${r}`, typeof(l), typeof(r));
    if(l < r){
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
    else{
        if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
            ele[r].style.background = 'green';
            ele[l].style.background = 'green';
        }
    }
}

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