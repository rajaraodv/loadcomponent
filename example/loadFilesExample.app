<aura:application>
 
 <!-- loads aotp_bootstrap.css from aotp_bootstrap(zip file) and loads jquery JavaScript file (not in zip file; notice "sfjs" extension) 
 and then loads bootstrap.js from aotp_bootstrap(zip file) as bootstrap.js is dependent on jQuery.
 -->
 	<jam:load 
              filesInParallel="/resource/aotp_bootstrap/css/aotp_bootstrap.css,/resource/jquery.sfjs"
              filesInSeries="/resource/aotp_bootstrap/js/bootstrap.js"
    />

   
    <div class="container">
      
      <jam:loadFilesExample/> 
        
        <!-- second component -->
		 <jam:loadFilesExample/>
        
	</div>
</aura:application>