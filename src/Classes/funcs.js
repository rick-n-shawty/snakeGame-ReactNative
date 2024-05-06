export const random = (min, max) => {
    if(max < min) return 0;
    else if(max === min) return max; 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}
