let fs = require('fs');
// npm install --save-dev @babel/core
let babel = require("@babel/core");
let btypes = babel.types;
let clone = require("clone");

let decorators = {}
let hasrun = []
// let weaves = {}
let functionadded = []



let DoObject = function(path, providedName)
{
    
    let name = "";
    if(path.parentPath.node.type == "AssignmentExpression")
        name = path.parentPath.node.left.name
    if(path.parentPath.node.type == "ObjectProperty")
        name = path.parentPath.node.key.name
    if(providedName)
        name = providedName

    if(!hasrun.includes(name) && name in decorators)
    {
        path.traverse(
        {
            FunctionExpression(p2)
            {
                // if(!functionadded.includes(name + "_" + p2.parentPath.node.key.name))
                // if(p2.parentPath.node.key)
                if(true)
                {
                    let c = clone(decorators[name])
                    
                    
                    let TopPath = p2.parentPath.parentPath.parentPath;
                    let names = [p2.parentPath.node.key.name];
                    while(TopPath.parentPath.type !== "Program")
                    {
                        if(TopPath.parentPath.node.type == "ObjectExpression" && !names.includes(TopPath.parentPath.node.properties[0].key.name))
                        {
                            names.unshift(TopPath.parentPath.node.properties[0].key.name);
                        }

                        TopPath = TopPath.parentPath;
                        // names.push(TopPath.parentPath.node.key.name);
                    }
                    
                    let lhs = name;
                    for(index in names)
                    {
                        lhs += "[\"" + names[index] + "\"]";
                    }
                    lhs += " =";

                    let lhs2 = name;
                    for(let i = 0; i < names.length - 1; ++i)
                    {
                        lhs2 += "[\"" + names[i] + "\"]";
                    }
                    lhs2 += "."

                    c.traverse(
                    {
                        CallExpression(p3)
                        {
                            // if(p2.node.callee.name == path.node.id.name)
                            p3.node.callee.name =  lhs2 + p2.parentPath.node.key.name + "_d";
                        }
                    });
                    // c.node.id.name = p2.parentPath.node.key.name;
                    c.node.id.name = "";



                    let objectassignment = babel.parse(lhs + (c))
                    TopPath.insertAfter(objectassignment);
                    
                    // TopPath.insertAfter(c.node);
                    
                    // console.log(p2.parentPath.parentPath.parentPath. parentPath.parentPath.type);
                    p2.parentPath.node.key.name += "_d";

                    functionadded.push(name + "_" + p2.parentPath.node.key.name)
                }
            }
        });
    

        hasrun.push(name);
    }
}


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
                    DoObject(path);
                },
                VariableDeclaration(path)
                {
                    // console.log(path.node.declarations[0].id.name);
                    for(let i = 0; i < path.node.declarations.length; ++i)
                    {
                        if(path.node.declarations[i].id && path.node.declarations[i].id.name in decorators)
                        {
                            path.traverse(
                            {
                                ObjectExpression(p2)
                                {
                                    DoObject(p2, path.node.declarations[i].id.name);
                                }
                            })
                        }
                    }
                }
            }
        }]});

        console.log(out2.code);
    });
});
