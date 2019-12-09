let f1 = function(a, b)
{
    x = a + b;
    return x;
}


// should print at the beginning of the function
let Decorate_PrintBefore_f2 = function(a, b)
{
    x = a - b;
    return x;
}

//should print before the return statement
let Decorate_PrintAfter_f3 = function(a, b)
{
    x = a * b;
    return x;
}

//should print at both locations
let Decorate_PrintBoth_f4 = function(a, b, c)
{
    x = a * b + c;
    return x;
}