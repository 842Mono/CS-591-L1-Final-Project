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
                Identifier(path) {
                    path.node.name = 'LOL';
                }
            }
        }
    ]});
      
    console.log(out.code);
});
