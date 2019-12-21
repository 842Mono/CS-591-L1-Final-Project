let calculate = (x, y, z, z2) => {
    document.getElementById("result").innerHTML = multiply(subtract(add(x, y), z), z2);
  };
  
  function add_d(x, y) {
    return x + y;
  }
  
  function add(x, y) {
    console.log("add x = " + x);
    console.log("add y = " + y);
    return add_d(x, y);
  }
  
  function subtract_d(x, y) {
    return x - y;
  }
  
  function subtract(x, y) {
    console.log("sub x = " + x);
    console.log("sub y = " + y);
    return subtract_d(x, y);
  }
  
  function multiply_d(x, y) {
    return x + y;
  }
  
  function multiply(x, y) {
    console.log("mul x = " + x);
    console.log("mul y = " + y);
    return multiply_d(x, y);
  }
  