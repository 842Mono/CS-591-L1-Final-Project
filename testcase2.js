let x = 3;

function f1(a)
{
    console.log(a);
    if(a == 0)
        return;
    f1(a - 1);
}