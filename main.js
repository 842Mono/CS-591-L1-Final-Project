let fs = require('fs');
// npm install --save-dev @babel/core
let babel = require("@babel/core");

fs.readFile('testcase1.js', 'utf8', function(err, contents)
{
    if(err)
        console.log(err);

    let out = babel.transform(contents, {plugins:[
        {
            visitor: {
                // Function(path) {
                //     console.log(path.node.id.name);
                // },
                FunctionExpression(path) {
                    // console.log(path.parent.id.name);
                    // console.log(path.node.id.name);
                },
                FunctionDeclaration(path) {
                    console.log(path.node.id.name);
                },
                ArrowFunctionExpression(path) {
                    console.log(path.parent.id.name);
                }
            }
        }
    ]});
      
    console.log(out.code);
});
