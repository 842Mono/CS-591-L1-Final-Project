function f1(a, b)
{
    let g = 100;
    console.log("msg1");
    let x = f1(a, b);
    console.log("msg2");
    return x + g;
}

function f2()
{
    console.log("msg1");
    return f2();
}

function obj1()
{
    return 1 + obj1();
}

function obj3()
{
    return obj3() * 3;
}

function obj4()
{
    return obj4 / 100;
}