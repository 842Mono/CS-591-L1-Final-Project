class class1 {
    constructor (x, y)
    {
        this.x = x;
        this.y = y;
        this.z = x + y;
    }

    get q()
    {
        return x * y;
    }

    function1()
    {
        console.log(this.z)
        return this.z
    }

    function2(a)
    {
        console.log(a);
        return a + this.x + this.y;
    }
}

let x = class class2
{
    constructor(a)
    {
        this.a = a;
    }

    function1()
    {
        console.log("function 1");
    }
}