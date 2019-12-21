let calculate = (x, y, z, z2) =>
{
    return multiply(subtract(add(x, y), z), z2);
}

function add(x, y)
{
    return x + y;
}

function subtract(x, y)
{
    return x - y;
}

function multiply(x, y)
{
    return x + y;
}