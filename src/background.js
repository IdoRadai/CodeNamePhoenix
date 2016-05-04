/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/scopes_background
*************************************************************************************/


appAPI.ready(function() {
			var events = {};
	       appAPI.webRequest.monitor.onRequest.addListener({
        callback: function(item) {
        	var tabId = item.tabId;
        	if ( item.requestUrl.indexOf('doubleverify.com/event')>-1){
        		var obj = {
        			command: "addEvent",
        			id:  "e"+Math.round(Math.random()*1000000),
        			tabId: tabId,
        			requestUrl: item.requestUrl
        		};
        		if (!events[tabId]){
        			events[tabId]={};
        		}
    			events[tabId][obj.id]=obj;
    			for (var id in events[tabId]){
    				appAPI.message.toAllTabs(events[tabId][id]);
    			}
        	}
        }
    });
    
    appAPI.message.addListener(function(item) {
        if( item ){
        	if ( item.command == "gotEvent"){
        		var tabId = item.tabId;
        		var id = item.id;
        		if (events[tabId] && events[tabId][id]) 
        			delete events[tabId][id];
        	}
        	if ( item.command == "getEvent"){
        		var tabId = item.tabId;
        		if (events[tabId]){ 
        			for (var id in events[tabId]){
    				appAPI.message.toAllTabs(events[tabId][id]);
    				}
        		}
        	}
        }
     });
    	/*
    //appAPI.browserAction.setResourceIcon('icons/icon.png');
    appAPI.db.set("display", { width: "999", height: "999" , location:"topLeft"});
   appAPI.db.set("config", {showUnknown: true, enable:true});
   appAPI.browserAction.setPopup({
       resourcePath:'popup/popup4.html',
      height: 300,
       width: 300
   });
    
*/
});