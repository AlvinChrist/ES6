function findMin(a,b,c){
    let minValue = a;
    if(a<b){
        minValue = a
    }
    else{
        minValue = b
    }
    if(c<minValue){
        minValue= c
    }
    return minValue;
}

console.log(findMin(-1,0,-1))