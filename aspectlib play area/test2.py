class class1():
    
    def f1(self):
        print("f1")
        return 10
    
    def f2(self, x, y):
        return x * y

def run():
    c1 = class1()
    c1.f1()
    print(c1.f2(2,3))