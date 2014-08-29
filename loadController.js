({


  init: function(component, event, helper) {

    //Modified version of https://github.com/malko/l.js to support resource files without JS or CSS extensions.
    !(function(t,e){var r=function(e){(t.execScript||function(e){t["eval"].call(t,e)})(e)},i=function(t,e){return t instanceof(e||Array)},s=document,n="getElementsByTagName",a="length",c="readyState",l="onreadystatechange",u=s[n]("script"),o=u[u[a]-1],f=o.innerHTML.replace(/^\s+|\s+$/g,"");if(!t.ljs){var h=o.src.match(/checkLoaded/)?1:0,d=s[n]("head")[0]||s.documentElement,p=function(t){var e={};e.u=t.replace(/#(=)?([^#]*)?/g,function(t,r,i){e[r?"f":"i"]=i;return""});return e},v=function(t,e,r){var i=s.createElement(t),n;if(r){if(i[c]){i[l]=function(){if(i[c]==="loaded"||i[c]==="complete"){i[l]=null;r()}}}else{i.onload=r}}for(n in e){e[n]&&(i[n]=e[n])}d.appendChild(i)},m=function(t,e){if(this.aliases&&this.aliases[t]){var r=this.aliases[t].slice(0);i(r)||(r=[r]);e&&r.push(e);return this.load.apply(this,r)}if(i(t)){for(var s=t[a];s--;){this.load(t[s])}e&&t.push(e);return this.load.apply(this,t)}if(t.match(/\.js\b/)||t.match(/\.sfjs\b/)){t=t.replace(".sfjs","");return this.loadjs(t,e)}else if(t.match(/\.css\b/)||t.match(/\.sfcss\b/)){t=t.replace(".sfcss","");return this.loadcss(t,e)}else{return this.loadjs(t,e)}},y={},g={aliases:{},loadjs:function(t,r){var i=p(t);t=i.u;if(y[t]===true){r&&r();return this}else if(y[t]!==e){if(r){y[t]=function(t,e){return function(){t&&t();e&&e()}}(y[t],r)}return this}y[t]=function(e){return function(){y[t]=true;e&&e()}}(r);r=function(){y[t]()};v("script",{type:"text/javascript",src:t,id:i.i,onerror:function(t){if(i.f){var e=t.currentTarget;e.parentNode.removeChild(e);v("script",{type:"text/javascript",src:i.f,id:i.i},r)}}},r);return this},loadcss:function(t,e){var r=p(t);t=r.u;y[t]||v("link",{type:"text/css",rel:"stylesheet",href:t,id:r.i});y[t]=true;e&&e();return this},load:function(){var t=arguments,r=t[a];if(r===1&&i(t[0],Function)){t[0]();return this}m.call(this,t[0],r<=1?e:function(){g.load.apply(g,[].slice.call(t,1))});return this},addAliases:function(t){for(var e in t){this.aliases[e]=i(t[e])?t[e].slice(0):t[e]}return this}};if(h){var j,b,x,A;for(j=0,b=u[a];j<b;j++){(A=u[j].getAttribute("src"))&&(y[A.replace(/#.*$/,"")]=true)}x=s[n]("link");for(j=0,b=x[a];j<b;j++){(x[j].rel==="stylesheet"||x[j].type==="text/css")&&(y[x[j].getAttribute("href").replace(/#.*$/,"")]=true)}}t.ljs=g}f&&r(f)})(window);

    var loadInSeries = function(filesInSeries, cb) {
      filesInSeries.push(cb);
      ljs.load.apply(ljs, filesInSeries)
    }

    var loadInParallel = function(filesInParallel, cb) {
      ljs.load(filesInParallel, cb);
    }

    var finalCB = function() {
      $A.get("e.jam:staticResourcesLoaded").fire();
    }

    var filesInSeries = component.get("v.filesInSeries");
    var filesInParallel = component.get("v.filesInParallel");

    if (filesInParallel.length > 0) {
      loadInParallel(filesInParallel, function() {
        if (filesInSeries.length > 0) {
          loadInSeries(filesInSeries, finalCB);
        } else {
          finalCB();
        }
      });
    } else if (filesInSeries.length > 0) {
      loadInSeries(filesInSeries, finalCB);
    }
  }

})