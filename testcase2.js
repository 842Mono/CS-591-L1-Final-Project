let g = 5;


function f1(a, b)
{
    let x = a + b;
    console.log("x = " + x);
    return x + g;
}

function f2()
{
    console.log("msg f2");
    return 5
}

function f3()
{
    console.log("msg f3");
}

let obj1 = {
    f1:function()
    {
        console.log("f1");
    },
    O1:{
        O3:{
            O4:{
                f2:function()
                {
                    return 52;
                }
            }
        }
    }
}

let obj2 = {
    O1:function()
    {
        console.log("peaceful");
    }
}

obj3 = {
    O1:{
        tt1:function(x)
        {
            return x + 2;
        },
        tt2:function()
        {
            console.log("tt2");
        }
    }
}