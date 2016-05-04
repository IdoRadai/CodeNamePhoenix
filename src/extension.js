  /************************************************************************************
  This is your Page Code. The appAPI.ready() code block will be executed on every page load.
  For more information please visit our docs site: http://docs.crossrider.com
*************************************************************************************/

appAPI.ready(function($) {
		
		var events =[];
		var tabId = appAPI.getTabId();
    	var logicInjeced = false;
	
	appAPI.dom.addRemoteCSS({
        url:"https://dvsd.doubleverify.com/ido/dvsdExt/_styles.css",
        callback: function(ref){
        }
    });

  
    	var id = appAPI.message.addListener(function(item) {
		        if( item && tabId==item.tabId ){
					if (!logicInjeced){
    	  				appAPI.resources.includeRemoteJS('https://dvsd.doubleverify.com/ido/dvsdExt/logic.js');
    	  				logicInjeced=true;
    				}
		        	if ( item.command== "addEvent" && events.indexOf(item.id)==-1){
			        		events.push(item.id);
			        		window.getNewEvent(item.requestUrl);
			        		appAPI.message.toBackground({
						        command: 'gotEvent',
						        tabId:item.tabId,
						        id:item.id
					    	});
		        	}
		        }
	    	});
	    
		appAPI.message.toBackground({
				        command: 'getEvent',
				        tabId:tabId,
			    	});

    
});
