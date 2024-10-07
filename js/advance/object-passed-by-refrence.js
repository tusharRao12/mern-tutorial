// Modifying object through a different refrence

const person1 = {
    name:'Tushar',
    age:22
}
// console.log('person1' ,person1);
const person2 = person1;
// modify age
person2.age = 30;
// console.log('person2',person2);
// console.log('person1',person1);


// passing object to a funciton

const incrementAge = (personObj)=>{
    personObj.age += 1
}
const bob = {name:'Bob',age:40};
console.log("Before",bob)
incrementAge(bob)
console.log("after",bob)