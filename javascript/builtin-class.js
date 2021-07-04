// parameter birthday dapat berupa miliseconds ataupun date string
const myAge = birthday => {
    const birtday = new Date(birthday);
    const skrg = new Date();
    return skrg.getFullYear()-birtday.getFullYear(); // 1970 adalah representasi 0 dari miliseconds
  };
  
  
  console.log(myAge('2000-01-22')); // 21 tahun