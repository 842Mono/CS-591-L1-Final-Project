Aspect oriented programming for javascript

Usage:

npm install

node main.js file1.js file2.js
where file1.js contains unmodified javascript code of some application
and file2.js contains aspects to be woven into the code.

To run the test cases run:
node main.js testcase1.js testcase1client.js
node main.js testcase2.js testcase1client.js

Also there's two folders, aspectlib play area and aspectj play area. They contain an example for aspectlib in python and an example for aspectj respectively.
To run the aspectlib example, do:
source venv1/bin/activate
python3 testcase1client.py
python3 testcase2client.py

To run the aspectj example, import the zip file into eclipse and run it. Run Class1.java and Class2.java as an AspectJ/Java application. 