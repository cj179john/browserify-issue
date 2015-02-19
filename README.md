#Running collector in dev environement

- Download nw executable from https://github.com/nwjs/nw.js download section to your local machine. Please select the applicable version accordingly. 

- In your collector folder, you must have a pakcage.json file with 'main' property points to your collector/index.html, as follow:
    
    main : '/path/to/index.html'

- Once Download nw to your local machine and package.json, run the executable file and point it to your code folder. Such as below:
    
    <OSX> /local/path/to/node-webkit your/collector/folder
    <win> /local/path/to/node-webkit.exe your/collector/folder


- You should see a nw window launched on your local machine, collector should be running on this window. All the log would be displayed on either the terminal window or debug  window in the nw browser

#Running collector in relase

- After run grunt release in collector folder, there would be 2 different versions of collector app generated in release/. 
    - in osx/, run collector.app/Contents/MacOS/node-webkit on command line will launch the collector app.
    - in win32/, simple execute the collector.exe in windows 32/64 environment to launch the collector app.
  
