

g = 5

def f1(a, b):
    x = a + b
    print("x = " + str(x))
    return x + g

def f2():
    print("msg f2")
    return 5

def f3():
    print("msg f3")


def run():
    f1(1, 2)
    print("===")
    f1(2, 3)
    print("===")
    f2()
    print("===")
    f3()