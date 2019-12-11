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