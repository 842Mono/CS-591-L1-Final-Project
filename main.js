let fs = require('fs');
// npm install --save-dev @babel/core
let babel = require("@babel/core");
let btypes = babel.types;


let decorators = {}
let weaves = {}

// let 

fs.readFile('testcase1.js', 'utf8', function(err, tc1)
{
    if(err)
        console.log(err);

    fs.readFile('testcase1client.js', 'utf8', function(err, tc1c)
    {
        if(err)
            console.log(err);

        let out1 = babel.transform(tc1c, { plugins: [
        {
            visitor: {
                FunctionExpression(path) {
                    console.log(path.parent.id.name);
                    // console.log(path);

                    if(path.parent.id.name.startsWith("Decorator_"))
                        decorators[path.parent.id.name.substr(10)] = path.node
                    console.log(decorators);
                },
                CallExpression(path) {
                    // console.log(path.node.callee.name);
                    if(path.node.callee.name == "weave")
                    {
                        weaves[path.node.arguments[1].value] = path.node.arguments[0].value;
                    }
                    console.log(weaves);
                }
            }
        }]});

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>DIVIDER<<<<<<<<<<<<<<<<<<<<<<<<<<");

        let out2 = babel.transform(tc1, { plugins: [
        {
            visitor: {
                Program(path) {
                    console.log(path);
                    // console.log(path.node.body[0]);

                    sib = path.getSibling()
                    // console.log(path.node);
                    // chld = path.node.body
                    // chld = path.get("body.0");
                    console.log("uuuuu")

                    for(d in decorators)
                    {
            //             console.log(decorators[d]);

            //             // console.log(p2);
                        // p2.insertBefore(decorators[d]);

                        // chld.insertBefore(decorators[d]);
                        // chld.unshift(decorators[d]);
                    }
                },
                FunctionExpression(path) {
                    // console.log(path.parent.id.name);
                    // console.log(weaves)
                    
                    if(path.parent.id && path.parent.id.name in weaves)
                    {
                        console.log(">><<")
                        // bs = path.get("BlockStatement");
                        // bs.remove();

                        // sb = path.getSibling()
                        // console.log(sb);

                        // sb = path.get("right")
                        // path.insertAfter(babel.types.variableDeclarator(["test"])) //(weaves[path.parent.id.name]));


                        // path.insertAfter(babel.parse("let x"));


                        path.parentPath.parentPath.insertAfter(babel.types.variableDeclaration("let", [
                            babel.types.variableDeclarator(
                                babel.types.tsParameterProperty(babel.types.identifier(weaves[path.parent.id.name]))
                            )
                        ]));

                        // path.insertAfter(decorators[weaves[path.parent.id.name]]);
                    }
                }
            }
        }]});

        console.log(out2.code);
      
        // console.log(out.code);
    });
});
