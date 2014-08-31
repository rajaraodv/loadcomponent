#load.cmp
 	
A simple and fast Salesforce Aura component that can be used to load  JS and CSS static resources in series, parallel, or in any other fashion.

##Getting started
1. Create `load.cmp`, `loadController.js` and `staticResourcesLoaded.evt` files in your org and copy contents from this here.
2. Change namespace from `jam` to your org's namespace in all those files.
3. Load the `load` component into your application's .app file (say myAuraApp.app) like below. 

	```
	// Loads css1.css, fileParallel1.js and fileParallel2.js in parallel. 
	// After all 3 are loaded it async loads fileSeries1.js and finally async loads DEPENDENT_on_fileSeries1.js.
	
	<application>
		<namespace:load 
			filesInParallel="/resource/zipfileresource/css1.css,/resource/zipfileresource/fileParallel1.js,/resource/zipfileresource/fileParallel2.js"		
			filesInSeries="/resource/zipfileresource/fileSeries1.js,/resource/zipfileresource/DEPENDENT_on_fileSeries1.js"
		/>
	</application>
	
	
	
	//If the Static resources are NOT inside a zip file, use "sfjs" and "sfcss" 
	as extensions(see down below for more details). 
	
	<application>
		<namespace:load 
			filesInParallel="/resource/css1.sfcss,/resource/fileParallel1.sfjs,/resource/fileParallel2.sfjs"		
			filesInSeries="/resource/fileSeries1.sfjs,/resource/DEPENDENT_on_fileSeries1.sfjs"
		/>
	</application>
	
	```
4. Listen to `staticResourcesLoaded` in your component and do something. 

	```
	<!-- listen to staticResourcesLoaded and call initScripts function inside controller -->
	<aura:handler event="jam:staticResourcesLoaded" action="{!c.initScripts}"/>
	```
 	

 
##Various Ways Of Using load.cmp:

1. Load CSS /JS files asynchronously but one-by-one from left to right(Great for dependency but not speed).

	```
	<namespace:load 
		filesInSeries="/resource/to/css1.css,/resource/to/file1.js,/resource/dependentOnFile1.js"
	/>
	```
2. Load files asynchronously and in parallel (Great for speed but not for dependency management).

	```
	<namespace:load 
		filesInParallel="/resource/to/fileParallel1.js,/resource/fileParallel2.js"
	/>
	``` 	
3. Load some in series and some in parallel **(Common usecase)**
	
	Tip: Put your CSS files, non-dependent files in filesInParallel and only dependent files in filesInSeries


	```
	<namespace:load 
		filesInParallel="/resource/to/css1.css,/resource/to/fileParallel1.js,/resource/fileParallel2.js"		
		filesInSeries="/resource/to/file1.js,/resource/dependentOnFile1.js"
	/>
	``` 
Note: The library prioritizes and loads all files in `filesInParallel` before loading files in `filesInSeries`.

##Handler:
Once all the files are loaded (**irrespective of pattern**), the library fires 'APPLICATION' level event: `staticResourcesLoaded`.

```	 
<aura:handler event="jam:staticResourcesLoaded" action="{!c.initScripts}"/>
```

##Static Resource File Paths: 
1. Static Resources that are not in Zip file (**.sfjs and ".sfcss**)

	Salesforce doesn't allow files to have .js or .css extensions if they are not within a Zip file. 
	To load such direct or raw file resource, use `/resource/<filename>.sf<filetype>` filepath.
		
	```
	// JavaScript file: /resource/myJsFile.sfjs
    // CSS file: /resource/myCssfile.sfcss
       
    <namespace:load 
			filesInParallel="/resource/myCssFile.sfcss,/resource/fileParallel1.sfjs,/resource/fileParallel2.sfjs"
    />
	```
	
	Note: This tells the library what kind of file it is AND that it doesn't have a file extension unlike files inside a zip file. 

	
2. Static Resources that are in Zip files.

	To load a CSS or JS file in static resource inside a Zip file use: `/resource/zipfileResourceName/path/to/file.cssOrJs`
	
  	```
  	/resource/zipfileResourceName/path/to/jsfileInsideZip.js
  	/resource/zipfileResourceName/path/to/fileInsideZip.css
	```

##Notes: 

1. This fires event at "APPLICATION" level "namespace:staticResourcesLoaded" event. So you should use it at Application-component level.
	
2. You can also use it inside a "component" but you have make sure to 
	ignore events after getting the first one.	
	
	```
 	//In Handler component's controller, add some code like this.
	if(!component.alreadyreceivedEvent) {
		component.alreadyreceivedEvent = true;
    	// do something w/ the event..
	} else {
  		return; //ignore further events	
	}
	```
	
3. Internally uses MODIFIED version of l.js (https://github.com/malko/l.js)

##Example App
You can test it by loading the example `BootstrapApp.app` inside example directory. 

1. Create an Aura app with the with filenames `BootstrapApp.app`, `BootstrapApp.cmp`, `BootstrapAppController.js` from developer console.
2. Change namespace from `jam` to YOUR_NAMESPACE.
3. Upload `aotp_bootstrap.zip` and `jquery.js` to static resources with the same name ("aotp_bootstrap" and "jquery"). 
4. Open  `BootstrapApp.app`. Click on preview.
5. 'click on the `Launch Modal - JavaScript` to see if the JavaScript dialog shows up.


	


