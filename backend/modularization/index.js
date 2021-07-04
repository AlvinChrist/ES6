const Tiger = require('./Tiger')
const Wolf = require('./Wolf')

const fighting = (tiger,wolf)=>{
    if(tiger.strength>wolf.strength){
        tiger.growl();
    }
    else if(tiger.strength<wolf.strength){
        wolf.howl();
    }
    else{
        console.log("Tiger and Wolf have the same strength")
    }
    return;
}

const tiger = new Tiger();
const wolf = new Wolf();
fighting(tiger,wolf);