let f1 = function(a, b)
{
    x = a + b;
    return x;
}


// should print a and b
let Decorate_PrintArguments_f2 = function(a, b)
{
    x = a - b;
    return x;
}

//should print x
let Decorate_PrintReturn_f3 = function(a, b)
{
    x = a * b;
    return x;
}

//should print a, b, c and x
let Decorate_PrintArgumentsReturn_f4 = function(a, b, c)
{
    x = a * b + c;
    return x;
}