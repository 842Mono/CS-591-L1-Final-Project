let fs = require('fs');
// npm install --save-dev @babel/core
let babel = require("@babel/core");
let btypes = babel.types;
let clone = require("clone");


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

                    decorators[path.node.id.name] = path
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
                        path.insertAfter(decorators[path.node.id.name].node);
                        hasrun.push(path.node.id.name);

                        path.node.id.name += "_d";
                    }
                },
                ObjectExpression(path)
                {
                    console.log("===========");
                    // console.log(path.node);
                    // console.log(path.parentPath.node);
                    let name = "";
                    if(path.parentPath.node.type == "AssignmentExpression")
                        name = path.parentPath.node.left.name
                    if(path.parentPath.node.type == "ObjectProperty")
                        name = path.parentPath.node.key.name

                    console.log(name);

                    if(!hasrun.includes(name) && name in decorators)
                    {
                        console.log("traversing");
                        path.traverse(
                        {
                            FunctionExpression(p2)
                            {
                                console.log("inside")
                                console.log(p2.parentPath.node.key.name);
                                let c = clone(decorators[name])
                                // console.log(c);
                                c.traverse(
                                {
                                    CallExpression(p3)
                                    {
                                        // if(p2.node.callee.name == path.node.id.name)
                                        p3.node.callee.name =  p2.parentPath.node.key.name + "_d";
                                    }
                                });
                                c.node.id.name = p2.parentPath.node.key.name + "_d";
                                p2.parentPath.parentPath.parentPath.insertAfter(c.node);
                                // console.log(p2.parentPath.node);
                                p2.parentPath.node.key.name += "_d";
                            }
                        });
                    

                        hasrun.push(name)
                    }                    
                }
            }
        }]});

        console.log(out2.code);
    });
});
