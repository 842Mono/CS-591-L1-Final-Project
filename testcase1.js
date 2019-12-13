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
    O1:function()
    {
        console.log("O1 print");
        return 22;
    },
    O2:function()
    {
        console.log("O2 print");
    },
    t1:3,
    t2:"4",
    t3:{},
    t4:{t5:"6"},
    t6:{
    }
}

let obj4 = {
    O1:{
        O2:{
            tt1:function(x)
            {
                return x + 2;
            },
            tt2:function(y)
            {
                console.log(y);
            }
        },
        tt3:function(z)
        {
            return z * z;
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

obj5 = {
    temp1:function()
    {
        return 8;
    },
    O1:{
        temp2:function() {
            console.log("8");
        },
        O2:{
            temp3:function() {
                console.log(3);
            },
            O3:{
                temp4:function(t4) {
                    return t4 + 4;
                }
            }
        }
    }
}

function run()
{
    f1(1, 2);
    console.log("===");
    f1(2, 3);
    console.log("===");
    f2();
    console.log("===");
    f3();
}