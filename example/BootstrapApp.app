<aura:application>
  <!--
    1. Loads aotp_bootstrap.css from a aotp_bootstrap(zip file) and loads jQuery file (not in zip file; notice "sfjs" extension)
  in parallel.
    And then loads bootstrap.js from aotp_bootstrap(zip file) as bootstrap.js is dependent on jQuery.
  -->
  <jam:load
    filesInParallel="/resource/aotp_bootstrap/css/aotp_bootstrap.css,/resource/jquery.sfjs"
    filesInSeries="/resource/aotp_bootstrap/js/bootstrap.js"
  />
  
  <div>1st copy of the component</div>
  <jam:BootstrapAppCmp/>
    
  <div>2nd copy of the component</div>
  <jam:BootstrapAppCmp/>
</aura:application>