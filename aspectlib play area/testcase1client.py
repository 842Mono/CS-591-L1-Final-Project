from aspectlib import Aspect, Proceed, Return, weave
import test1

@Aspect
def a1(*args, **kwargs):
    g = 100
    print("msg1")
    x = yield Proceed(*args, **kwargs)
    print("msg2")
    yield Return(x + g)

@Aspect
def a2(*args, **kwargs):
    print("msg1")
    x = yield Proceed(*args, **kwargs)
    yield Return(x)

weave(test1.f1, a1)
weave(test1.f2, a2)

test1.run()