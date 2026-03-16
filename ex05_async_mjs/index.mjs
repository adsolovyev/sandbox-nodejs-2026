function testFunction() {
  // return "Hello!";
  return new Promise((resolve, reject) => {
     setTimeout(() => {
       resolve("Hello!");
       // reject("Some error!");
     }, 5000);
  });
}

console.log("App Started!");

/*const testValue = testFunction();


testValue.then((testValue) => {
  console.log("Res = ", testValue);
}).catch((err) => {
  console.log("Err = ", err);
}).finally(()=>{
  console.log("Finally detected!");
});*/


try {
  const testValue = await testFunction();
  console.log("Res=", testValue);
} catch (err) {
  console.log("Err = ", err);
}

console.log("Finally detected!");