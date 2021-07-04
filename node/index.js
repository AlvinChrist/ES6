import {coffeeStock as stok_kopi,isCoffeeMachineReady} from "./state.js"

const displayStock = stock=>{
    for (const type in stock){
        console.log(type);
    }
}

displayStock(stok_kopi);
console.log(isCoffeeMachineReady);