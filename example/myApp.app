<aura:application>
 
 	<jam:load 
              filesInParallel="/resource/aotp_bootstrap/css/aotp_bootstrap.css"
              filesInSeries="/resource/jquery/jquery.js,/resource/aotp_bootstrap/js/bootstrap.js"
              />

     <!--
		filesInParallel take priority and are loaded first as quickly as possible. Once everything in filesInParallel are loaded, filesInSeries are loaded in order. So you can also do like below because bootstrap.js is dependant on css and jquery.
      	<jam:load 
      	 	filesInParallel="/resource/aotp_bootstrap/css/aotp_bootstrap.css,/resource/jquery/jquery.js"
      		filesInSeries="/resource/aotp_bootstrap/js/bootstrap.js"
         />
     -->         
    <div class="container">
           <jam:dialogTest/> 
        
        <!-- second component -->
		 <jam:dialogTest/>
        
	</div>
</aura:application>