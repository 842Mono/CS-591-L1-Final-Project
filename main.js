let fs = require('fs');
// npm install --save-dev @babel/core
let babel = require("@babel/core");
let btypes = babel.types;


let decorators = {}
let hasrun = []
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

                    decorators[path.node.id.name] = path.node
                    // console.log(decorators);
                }
            }
        }]});

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>DIVIDER<<<<<<<<<<<<<<<<<<<<<<<<<<");

        let out2 = babel.transform(tc1, { plugins: [
        {
            visitor: {
                FunctionDeclaration(path) {

                    console.log("run!!!!");
                    console.log(path.node.id.name);
                    
                    if(!hasrun.includes(path.node.id.name) && path.node.id.name in decorators)
                    {
                        path.insertAfter(decorators[path.node.id.name]);
                        hasrun.push(path.node.id.name);
                    }

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
      
        // console.log(out.code);
    });
});
