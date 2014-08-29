#Load.cmp
 	
A simple and fast Salesforce Aura component that can be used to load  JS and CSS static resources in series / parallel / in combination.
 
####Usage 1:
	
```
	
In the myApp.app (not myComponent.cmp)
  	<namespace:load 
		filesInSeries="/resource/to/css1.css,/resource/to/file1.js,/resource/dependentOnFile1.js"
		filesInParallel="/resource/to/fileParallel1.js,/resource/fileParallel2.js"		
	/>
	
In myComponent.cmp:
 <aura:handler event="jam:staticResourcesLoaded" action="{!c.initScripts}"/>
 
```

####Usage 2 (both load and listen from component.cmp):
If you want to use both load and listen from a component, make sure to 
	ignore events after getting the first one. Otherwise you will be listening to the event everytime any other component loads files (or you may have multiple copies of the same component all loading the same set of files causing duplicate notifications) 
	
```
	
In the myComponent.cmp 
  	<namespace:load 
		filesInSeries="/resource/to/css1.css,/resource/to/file1.js,/resource/dependentOnFile1.js"
		filesInParallel="/resource/to/fileParallel1.js,/resource/fileParallel2.js"		
	/>
	
Also in myComponent.cmp:
 <aura:handler event="jam:staticResourcesLoaded" action="{!c.initScripts}"/>
 
 
 	//Do avoid listening duplicate events, add some code like this in your listener function.

	if(!component.alreadyreceivedEvent) {
		component.alreadyreceivedEvent = true;
    	// do something w/ the event..
	} else {
  		return; //ignore further events	
	}
 
```

####Other ways to load scripts

1. `filesInParallel` take priority and are loaded first as quickly as possible. Once everything in filesInParallel are loaded, `filesInSeries` are loaded in order. So you can also do like below because bootstrap.js is dependant on css and jquery.

	```
	      	<jam:load 
	      	 	filesInParallel="/resource/aotp_bootstrap/css/aotp_bootstrap.css,/resource/jquery/jquery.js"
	      		filesInSeries="/resource/aotp_bootstrap/js/bootstrap.js"
	         />
	   
	```


 
2. `filesInSeries` and `filesInParallel` are optional so you can just load everything in series or load everything in parallel(if you don't have any dependencies)

```
	
 <namespace:load 
		filesInSeries="/resource/to/css1.css,/resource/to/file1.js,/resource/dependentOnFile1.js"
	/>

	If you dont have any dependencies, you can load everything in parallel.
  	<namespace:load 
		filesInParallel="/resource/to/cssParallel1.css,/resource/to/fileParallel1.js,/resource/fileParallel2.js"		
	/>
	
```

##Example App
You can test it by loading the example app (loadFilesExample.app). 

1. Create an Aura app with the with filenames `loadFilesExample.app`, `loadFilesExample.cmp`, `loadFilesExampleController.js` from developer console.
2. Change namespace from `jam` to YOUR_NAMESPACE.
3. Upload `aotp_bootstrap.zip` and `jquery.zip` to static resources with the same name ("aotp_bootstrap" and "jquery"). 
3. Open  `loadFilesExample.app`. Click on preview.
4. 'click on the `Launch Modal - JavaScript` to make sure 

              
###Notes
	- Change namespace from `jam` to YOUR_NAMESPACE.
	
	- Internally uses l.js (https://github.com/malko/l.js)

	- Fires: "namespace:staticResourcesLoaded" event.

	-  This fires event at "application" level. So you should use it at Application-component.
	
	- You can also use it inside a "component" but you have make sure to 
	ignore events after getting the first one.
	
	


