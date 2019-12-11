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

        babel.transform(tc1c, { plugins: [
        {
            visitor: {
                FunctionDeclaration(path)
                {
                    path.traverse(
                    {
                        CallExpression(p2)
                        {
                            if(p2.node.callee.name == path.node.id.name)
                                p2.node.callee.name += "_d"
                        }
                    });

                    // console.log(fc);

                    decorators[path.node.id.name] = path.node
                    // console.log(decorators);
                }
            }
        }]});

        let out2 = babel.transform(tc1, { plugins: [
        {
            visitor: {
                FunctionDeclaration(path)
                {
                    if(!hasrun.includes(path.node.id.name) && path.node.id.name in decorators)
                    {
                        path.insertAfter(decorators[path.node.id.name]);
                        hasrun.push(path.node.id.name);

                        path.node.id.name += "_d";
                    }
                }
            }
        }]});

        console.log(out2.code);
    });
});
