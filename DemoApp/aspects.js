function printinputs(x,y)
{
    console.log(x);
    console.log(y);
    return printinputs();
}

weave("printinputs", "add");
weave("printinputs", "subtract");
weave("printinputs", "multiply");
