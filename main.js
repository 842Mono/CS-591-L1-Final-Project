let fs = require('fs');
// npm install --save-dev @babel/core
let babel = require("@babel/core");
let btypes = babel.types;
let clone = require("clone");

let hasrun = [];
let weaves = {};
let weavesfunctions = {};
let functionadded = [];

let CMDontInsert = [];



let DoClassMethod = (path) =>
{
    if(path.node.id.name in weaves)
    {
        path.traverse(
        {
            ClassMethod(p2)
            {
                if(p2.node.kind == "method" && !CMDontInsert.includes(path.node.id.name + " - " + p2.node.key.name))
                {
                    // console.log(p2.node);
                    let clonedfunction = clone(weavesfunctions[path.node.id.name]);

                    clonedfunction.traverse(
                    {
                        CallExpression(p3)
                        {
                            if(p3.node.callee.name == path.node.id.name + "_d")
                            {
                                p3.node.callee.name = p2.node.key.name + "_d"
                                p3.node.arguments = p2.node.params
                            }
                        }
                    });
                    // console.log(p2.node.key.name);
                    // console.log("the key")
                    let classmethod = babel.types.ClassMethod("method", babel.types.identifier(p2.node.key.name), p2.node.params, clonedfunction.node.body)
                        
                    p2.insertAfter(classmethod);
                    CMDontInsert.push(path.node.id.name + " - " + p2.node.key.name);
                    p2.node.key.name += "_d";
                }
            }
        });
    }
}

let DoObject = (path, providedName) =>
{
    
    let name = "";
    if(path.parentPath.node.type == "AssignmentExpression")
        name = path.parentPath.node.left.name
    if(path.parentPath.node.type == "ObjectProperty")
        name = path.parentPath.node.key.name
    if(providedName)
        name = providedName

    if(!hasrun.includes(name) && name in weaves)
    {
        path.traverse(
        {
            FunctionExpression(p2)
            {

                let clonedfunction = clone(weavesfunctions[name]);
                
                let TopPath = p2.parentPath.parentPath.parentPath;
                let names = [p2.parentPath.node.key.name];
                while(TopPath.parentPath.type !== "Program")
                {
                    if(TopPath.node.type == "ObjectProperty")
                        names.unshift(TopPath.node.key.name);

                    TopPath = TopPath.parentPath;
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

                clonedfunction.traverse(
                {
                    CallExpression(p3)
                    {
                        // if(p2.node.callee.name == path.node.id.name)
                        p3.node.callee.name =  lhs2 + p2.parentPath.node.key.name + "_d";
                        p3.node.arguments = p2.node.params;

                        // console.log(p3.node);
                        // console.log(p2.node);
                        // console.log("nnnnnn");
                    }
                });
                clonedfunction.node.params = p2.node.params;
                // console.log(clonedfunction.node);
                // clonedfunction.traverse(
                // {
                //     //

                // });

                // c.node.id.name = p2.parentPath.node.key.name;
                clonedfunction.node.id.name = "";



                let objectassignment = babel.parse(lhs + (clonedfunction))
                TopPath.insertAfter(objectassignment);
                
                // TopPath.insertAfter(c.node);
                
                // console.log(p2.parentPath.parentPath.parentPath. parentPath.parentPath.type);
                p2.parentPath.node.key.name += "_d";

                functionadded.push(name + "_" + p2.parentPath.node.key.name)
            
            }
        });
    

        hasrun.push(name);
    }
}


fs.readFile(process.argv[2], 'utf8', function(err, tc1)
{
    if(err)
        console.log(err);

    fs.readFile(process.argv[3], 'utf8', function(err, tc1c)
    {
        if(err)
            console.log(err);

        babel.transform(tc1c, { plugins: [
        {
            visitor: {
                CallExpression(path)
                {
                    if(path.node.callee.name == "weave")
                        weaves[path.node.arguments[1].value] = path.node.arguments[0].value;
                }
            }
        }]});

        Object.keys(weaves).forEach(key =>
        {
            babel.transform(tc1c, { plugins: [
            {
                visitor: {
                    FunctionDeclaration(path)
                    {
                        if(weaves[key] == path.node.id.name)
                        {
                            path.traverse(
                            {
                                CallExpression(p2)
                                {
                                    if(p2.node.callee.name == path.node.id.name)
                                    {
                                        p2.node.callee.name = key + "_d";
                                    }
                                }
                            });
                            weavesfunctions[key] = path;
                        }
                    }
                }
            }]});
        });

        let out2 = babel.transform(tc1, { plugins: [
        {
            visitor: {
                ClassDeclaration(path)
                {
                    DoClassMethod(path);
                },
                ClassExpression(path)
                {
                    // console.log(path.node);
                    DoClassMethod(path);
                },
                FunctionDeclaration(path)
                {
                    if(!hasrun.includes(path.node.id.name) && path.node.id.name in weaves)
                    {
                        weavesfunctions[path.node.id.name].node.id.name = path.node.id.name;
                        weavesfunctions[path.node.id.name].node.params = path.node.params;
                        weavesfunctions[path.node.id.name].traverse(
                        {
                            CallExpression(p2)
                            {
                                if(p2.node.callee.name == path.node.id.name + "_d")
                                    p2.node.arguments = path.node.params;
                            }
                        });
                        path.insertAfter(weavesfunctions[path.node.id.name].node);
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
                    for(let i = 0; i < path.node.declarations.length; ++i)
                    {
                        if(path.node.declarations[i].id && path.node.declarations[i].id.name in weaves)
                        {
                            path.traverse(
                            {
                                ObjectExpression(p2)
                                {
                                    DoObject(p2, path.node.declarations[i].id.name);
                                }
                            });
                        }
                    }
                }
            }
        }]});

        console.log(out2.code);
    });
});
