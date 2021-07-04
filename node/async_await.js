const getCoffee = ()=>{
    return new Promise((resolve,reject)=>{
        const seeds = 5;
        setTimeout(()=>{
            if(seeds >= 10){
                resolve("Kopi didapatkan!")
            }
            else{
                reject("Biji kopi habis")
            }
        },1000)
    })
};

async function makeCoffee(){
    try{
        const coffee = await getCoffee();
        console.log(coffee);
    }
    catch(error){
        console.log(error);
    }
}

makeCoffee();