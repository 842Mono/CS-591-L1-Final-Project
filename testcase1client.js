// tc1 = require("./testcase1.js");

let Decorator_d1 = function(f, a, b)
{
    let g = 100;
    console.log("msg1");
    let x = f(a, b);
    console.log("msg2");
    return x + g;
}

let weave = () => {}

weave("d1", "f1");

// tc1();