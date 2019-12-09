let f1 = function(a, b)
{
    x = a + b;
    return x;
}


let Decorator_PrintBefore = function()
{
    console.log("hello");
}



// should print at the beginning of the function
let Decorate_PrintBefore_f2 = function(a, b)
{
    x = a - b;
    return x;
}

//should print before the return statement
function Decorate_PrintAfter_f3(a, b)
{
    x = a * b;
    return x;
}

//should print at both locations
let Decorate_PrintBoth_f4 = (a, b, c) =>
{
    x = a * b + c;
    return x;
}


let embedd = function()
{
    let embedd1 = function()
    {
        console.log("embedded");
    }
}


let ObjectMethod = {
    om:function()
    {
        console.log("om");
    }
}