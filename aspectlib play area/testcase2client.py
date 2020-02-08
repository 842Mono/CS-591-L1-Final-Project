from aspectlib import Aspect, Proceed, Return, weave
import test2

@Aspect
def a1(*args, **kwargs):
    g = 100
    print("msg1")
    x = yield Proceed(*args, **kwargs)
    print("msg2")
    yield Return(x + g)

weave(test2.class1, a1)

test2.run()