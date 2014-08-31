({
    initScripts: function(component, event, helper) {

        //Ignore duplicate notifications that may arrive because other components 
        //loading scripts using the same library. 
        if (component.alreadyhandledEvent)  
            return;
        
            var btn = component.find("modalToggle").getElement();
            var dlg = component.find("modalDlg").getElement();
            jQuery(btn).on("click", function() {
                jQuery(dlg).modal();
            });
            component.alreadyhandledEvent = true;
        }
    }
})