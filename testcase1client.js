function func1(a, b)
{
    let g = 100;
    console.log("msg1");
    let x = func1(a, b);
    console.log("msg2");
    return x + g;
}

weave("func1", "f1");

function function2()
{
    console.log("msg1");
    return function2();
}

weave("function2", "f2");
weave("func1", "f4");


function obj1()
{
    return 1 + obj1();
}


function object3()
{
    return obj3() * 3;
}

weave("object3", "obj4");

function obj4()
{
    console.log("obj4 print");
    return obj4() / 100;
}
function obj5()
{
    return obj5() * obj5();
}

function class1weave()
{
    console.log("before");
    let r = class1weave();
    console.log("after")
    return r + 1;
}

weave("class1weave", "class1");
weave("class1weave", "class2");