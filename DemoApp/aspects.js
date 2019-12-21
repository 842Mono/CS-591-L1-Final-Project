function printadd(x,y)
{
    console.log("add x = " + x);
    console.log("add y = " + y);
    return printadd();
}
function printsub(x,y)
{
    console.log("sub x = " + x);
    console.log("sub y = " + y);
    return printsub();
}
function printmul(x,y)
{
    console.log("mul x = " + x);
    console.log("mul y = " + y);
    return printmul();
}
weave("printadd", "add");
weave("printsub", "subtract");
weave("printmul", "multiply");
