let fs = require('fs');
// npm install --save-dev @babel/core
let babel = require("@babel/core");
let btypes = babel.types;


let decorators = {}
// let weaves = {}

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
                FunctionDeclaration(path) {
                    console.log(path.node.id.name);
                    // console.log(path);

                    // if(path.parent.id.name.startsWith("Decorator_"))
                    decorators[path.node.id.name] = path.node
                    console.log(decorators)
                    // console.log(decorators);
                },
                // CallExpression(path) {
                //     // console.log(path.node.callee.name);
                //     if(path.node.callee.name == "weave")
                //     {
                //         weaves[path.node.arguments[1].value] = path.node.arguments[0].value;
                //     }
                //     console.log(weaves);
                // }
            }
        }]});

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>DIVIDER<<<<<<<<<<<<<<<<<<<<<<<<<<");

        let out2 = babel.transform(tc1, { plugins: [
        {
            visitor: {
            //     Program(path) {
            //         // console.log(path);
            //         // console.log(path.node.body[0]);

            //         // sib = path.getSibling()
            //         // console.log(path.node);
            //         // chld = path.node.body
            //         // chld = path.get("body.0");
            //         console.log("uuuuu")

            //         for(d in decorators)
            //         {
            // //             console.log(decorators[d]);

            // //             // console.log(p2);
            //             // p2.insertBefore(decorators[d]);

            //             // chld.insertBefore(decorators[d]);
            //             // chld.unshift(decorators[d]);
            //         }
            //     },
                FunctionDeclaration(path) {

                    // console.log(path)
                    if(path.node.id.name in decorators)
                        path.insertAfter(decorators[path.node.id.name]);

                    // path.parentPath.parentPath.insertAfter(decorators[path.parent.id.name]);


                    // console.log(path.parent.id.name);
                    // console.log(weaves)
                    
                    // if(path.parent.id && path.parent.id.name in weaves)
                    // {
                    //     console.log(">><<")
                        // bs = path.get("BlockStatement");
                        // bs.remove();

                        // sb = path.getSibling()
                        // console.log(sb);

                        // sb = path.get("right")
                        // path.insertAfter(babel.types.variableDeclarator(["test"])) //(weaves[path.parent.id.name]));


                        // path.insertAfter(babel.parse("let x"));




                        // path.parentPath.parentPath.insertAfter(babel.types.assignmentExpression(
                        //     babel.types.variableDeclaration("let", [
                        //         babel.types.variableDeclarator(
                        //             babel.types.tsParameterProperty(babel.types.identifier(weaves[path.parent.id.name]))
                        //         )
                        //     ]),
                        //     babel.types.file(babel.types.program([[decorators[weaves[path.parent.id.name]]]])
                        //         , "", "")
                        // ));

                        // console.log(decorators[weaves[path.parent.id.name]]);
                        

                        // path.parentPath.parentPath.insertAfter(babel.types.variableDeclaration("let", [
                        //     babel.types.variableDeclarator(
                        //         babel.types.tsParameterProperty(babel.types.identifier(weaves[path.parent.id.name]))
                        //     )
                        // ]));

                        // path.insertAfter(decorators[weaves[path.parent.id.name]]);
                    // }
                }
            }
        }]});

        console.log(out2.code);

        console.log("f1" in decorators)
        console.log("f2" in decorators);
      
        // console.log(out.code);
    });
});
