({
   
    initScripts: function(component, event, helper) {
        
        //Since this is a called when the event "staticResourcesLoaded" is fired,
        //if it is fired multiple times for any reason, this function will be called again.
        //this code handles duplicate notification 
        if(!component.alreadyhandledEvent) {
            component.alreadyhandledEvent = true;
            
        } else {
            //ignore events after the first one.
            return;
        }

         if (typeof jQuery !== "undefined" && typeof $j === "undefined") {
                $j = jQuery.noConflict(true);
          }
           $j("#modalToggle", component.getElement()).on("click", function() {
              $j("#" + component.get("v.modalName"), component.getElement()).modal(); 
          });
    }
})