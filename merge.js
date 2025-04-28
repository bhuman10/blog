//let delay = 30;
async function merge(ele, low, mid, high){
    console.log('In merge()');
    console.log(`low=${low}, mid=${mid}, high=${high}`);
    const n1 = mid - low + 1;
    const n2 = high - mid;
    console.log(`n1=${n1}, n2=${n2}`);
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await waitforme(delay);
        console.log('In merge left loop');
        console.log(ele[low + i].style.height + ' at ' + (low+i));
        // color
        ele[low + i].style.background = 'orange';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        await waitforme(delay);
        console.log('In merge right loop');
        console.log(ele[mid + 1 + i].style.height + ' at ' + (mid+1+i));
        // color
        ele[mid + 1 + i].style.background = 'yellow';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await waitforme(delay);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        await waitforme(delay);
        console.log('In merge while loop');
        console.log(parseInt(left[i]), parseInt(right[j]));
        
        // To add color for which two r being compared for merging
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            console.log('In merge while loop if');
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            }
            
            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            console.log('In merge while loop else');
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            } 
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        await waitforme(delay);
        console.log("In while if n1 is left");
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        await waitforme(delay);
        console.log("In while if n2 is left");
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSort() {
    console.log('In mergeSort()');
    
    // Disable buttons during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    
    const bars = document.querySelectorAll('.bar');
    await mergeSortHelper(bars, 0, bars.length - 1);
    
    // Enable buttons after sorting
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
}

async function mergeSortHelper(bars, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Recursively sort the left and right halves
        await mergeSortHelper(bars, left, mid);
        await mergeSortHelper(bars, mid + 1, right);
        
        // Merge the sorted halves
        await merge(bars, left, mid, right);
    }
}

async function merge(bars, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Create temporary arrays
    const leftArray = new Array(n1);
    const rightArray = new Array(n2);
    
    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
        leftArray[i] = parseInt(bars[left + i].textContent);
    }
    for (let j = 0; j < n2; j++) {
        rightArray[j] = parseInt(bars[mid + 1 + j].textContent);
    }
    
    // Merge the temporary arrays back
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        // Add comparing animation
        bars[left + i].classList.add('comparing');
        bars[mid + 1 + j].classList.add('comparing');
        
        // Wait for a moment
        await waitforme(delay);
        
        if (leftArray[i] <= rightArray[j]) {
            bars[k].textContent = leftArray[i];
            i++;
        } else {
            bars[k].textContent = rightArray[j];
            j++;
        }
        
        // Remove comparing animation
        bars[left + i - 1].classList.remove('comparing');
        bars[mid + 1 + j - 1].classList.remove('comparing');
        
        // Mark as sorted
        bars[k].classList.add('sorted');
        k++;
    }
    
    // Copy remaining elements of leftArray
    while (i < n1) {
        bars[k].textContent = leftArray[i];
        bars[k].classList.add('sorted');
        i++;
        k++;
    }
    
    // Copy remaining elements of rightArray
    while (j < n2) {
        bars[k].textContent = rightArray[j];
        bars[k].classList.add('sorted');
        j++;
        k++;
    }
}

// Add event listener to merge sort button
document.querySelector(".mergeSort").addEventListener("click", mergeSort);


