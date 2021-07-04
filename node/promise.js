const stock = {
    coffeeBeans: 250,
    water: 1000
}

const checkStock = ()=>{
    return new Promise((resolve,reject)=>{
        if(stock.coffeeBeans>=16 && stock.water>=250){
            resolve("stock cukup, bisa membuat kopi lagi");
        }
        else{
            reject("Stock tidak cukup!");
        }
    });
}

const handleSuccess = (resolvedValue)=>{
    console.log(resolvedValue);
}
const handleFailure = (rejectedValue)=>{
    console.log(rejectedValue);
}
checkStock().then(handleSuccess,handleFailure);