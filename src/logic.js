
var tabsContainer =document.createElement("div");
tabsContainer.style=' position: fixed; bottom:0%;rigth:0%;   z-index:1000; width:350px; height:350px';
tabsContainer.setAttribute("id","tabs-container");
var tabsMenu =document.createElement("ul");
tabsMenu.setAttribute("class","tabs-menu");
var tab1li =document.createElement("li");
tab1li.setAttribute("class","current");
var tab1a =document.createElement("a");
tab1a.setAttribute("href","#tab-1");
tab1a.innerHTML="Data";
var tab2li =document.createElement("li");
var tab2a =document.createElement("a");
tab2a.setAttribute("href","#tab-2");
tab2a.innerHTML="Config";
var tab3li =document.createElement("li");
var tab3a =document.createElement("a");
tab3a.setAttribute("href","#tab-3");
tab3a.innerHTML="Close";

var tab =document.createElement("div");
tab.setAttribute("class","tab");
var tab1 =document.createElement("div");
tab1.setAttribute("class","tab-content");
tab1.setAttribute("id","tab-1");
var tab2 =document.createElement("div");
tab2.setAttribute("class","tab-content");
tab2.setAttribute("id","tab-2");

var p1 =document.createElement("p");
p1.style="overflow-y:auto; height:350px;	";
p1.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet purus urna. Proin dictum fringilla enim, sit amet suscipit dolor dictum in. Maecenas porttitor, est et malesuada congue, ligula elit fermentum massa, sit amet porta odio est at velit. Sed nec turpis neque. Fusce at mi felis, sed interdum tortor. Nullam pretium, est at congue mattis, nibh eros pharetra lectus, nec posuere libero dui consectetur arcu. Quisque convallis facilisis fermentum. Nam tincidunt, diam nec dictum mattis, nunc dolor ultrices ipsum, in mattis justo turpis nec ligula. Curabitur a ante mauris. Integer placerat imperdiet diam, facilisis pretium elit mollis pretium. Sed lobortis, eros non egestas suscipit";



var showUnknownCheckbox =document.createElement("input");
function myFunction() {
    var checked = showUnknownCheckbox.checked;
	appAPI.db.set( "showUnknown", checked);
}
var showUnknownLabel =document.createElement("label");
showUnknownCheckbox.setAttribute("type","checkbox" );
showUnknownLabel.innerHTML = "Show Unknown Events";
tab2.appendChild(showUnknownCheckbox);
tab2.appendChild(showUnknownLabel);
showUnknownCheckbox.addEventListener("change", myFunction);
tab.appendChild(tab1);
tab.appendChild(tab2);
tab1li.appendChild(tab1a);
tab2li.appendChild(tab2a);
tab3li.appendChild(tab3a);
tabsMenu.appendChild(tab1li);
tabsMenu.appendChild(tab2li);
tabsMenu.appendChild(tab3li);
tabsContainer.appendChild(tabsMenu);
tabsContainer.appendChild(tab);
document.body.appendChild(tabsContainer);

    $(".tabs-menu a").click(function(event) {
		var tab = $(this).attr("href");
		if (tab=="#tab-3"){
			tabsContainer.style.display="none";
		}
		else{				
        event.preventDefault();
			$(this).parent().addClass("current");
			$(this).parent().siblings().removeClass("current");
			$(".tab-content").not(tab).css("display", "none");
			$(tab).fadeIn();
		}
    });
	
var div =document.createElement("div");
var treediv =document.createElement("div");
var imps = [];
treediv.setAttribute('id','myDiv');
div.align="left";
//div.style=' position: fixed; bottom:0%;left:0%; overflow-y:auto; background-color:red;  z-index:1000; ';
div.style=' overflow-y:auto;  display:none';
treediv.style='overflow-y:auto;';
treediv.style.height = '370px';
div.appendChild(treediv);
var masterUl =document.createElement("ul");
masterUl.setAttribute("class","dv-tree");
treediv.appendChild(masterUl);
tab1.appendChild(div);

adjustWindow(); 

getStyleText= function(text,color){
    return '<span style="color:'+color+'; font-weight:bold; font-family:arial;  font-size:12px;">' +text+'</span>';
}

parseEvent= function(event){
    var result = {};
    try{
        params = event.split("?")[1].split('&');
        for (var id in params){
            if (params[id]){
                var pair = params[id].split('=');
                result[pair[0]]=pair[1];
            }
        }
    }
    catch(e){

    }
    return result;
}

getEventName = function(event){
	if (event.isq1ms) return "Qurtile 1 Event";
	if (event.isq2ms) return "Qurtile 2 Event";
	if (event.isq3ms) return "Qurtile 3 Event";
	if (event.isq4ms) return "Qurtile 4 Event";
	if (event.isgmpims) return "GroupM Viewed Event";
	if (event.isiabvms) return "IAB Viewed Event";
	if (event.iscvmvms) return "custom Viewed Event";
	if (event.ismms) return "Measured Event";
	if (event.isnmms) return "Not Measured Event";
	return "Uknown Event"
} 

drawImp= function(impid){
    div.style.display="block";
    if (imps.indexOf(impid)>-1) return;
    var li =document.createElement("li");
    var label = document.createElement("label");
    label.innerHTML = getStyleText(impid,'#4B088A');
    label.setAttribute("for",impid);
    var input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.setAttribute("id",impid);
    var ul = document.createElement("ul");
    ul.setAttribute("id","ul"+impid);
    li.appendChild(label);
    li.appendChild(input);
    li.appendChild(ul);
    masterUl.appendChild(li);
    imps.push(impid);
}

drawEvent= function(event){
    var impid= event.impid;
    var impUl=document.getElementById("ul"+impid);
    var eventName = getEventName(event);
    var eventId = "e"+Math.round(Math.random()*1000000);
    var li =document.createElement("li");
    var label = document.createElement("label");
    label.innerHTML = getStyleText(eventName,'#088A08');
    label.setAttribute("for",eventId);
    var input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.setAttribute("id",eventId);
    var ul = document.createElement("ul");
    li.appendChild(label);
    li.appendChild(input);
    li.appendChild(ul);
    impUl.appendChild(li);
    for (var param in event){
        if (event[param] && param!='impid' ){
            var li =  document.createElement("li");
            li.setAttribute("class","file-dv");
            li.innerHTML = getStyleText(param+": ",'#4B088A')+ getStyleText(event[param],'#088A08');
            ul.appendChild(li);
        }
    }
}
	function adjustWindow(){
	    var width = 300;//document.getElementById('winWidth').value;
	    var height = 400;//document.getElementById('winHeight').value;
	    var location = "bottomRight";// document.getElementById("winLocation").value;
	  //  div.style.width = width +'px';
	   // div.style.height = height +'px';
	    div.style.top='';
	    div.style.bottom='';
	    div.style.left='';
	    div.style.right='';
	    switch(location) {
	        case "topLeft":
	            div.style.top='0%';
	            div.style.left='0%';
	            break;
	        case "topRight":
	            div.style.top='0%';
	            div.style.right='0%';
	            break;
	        case "bottomLeft":
	            div.style.bottom='0%';
	            div.style.left='0%';
	            break;
	        case "bottomRight":
	            div.style.bottom='0%';
	            div.style.right='0%';
	            break;
	        default:
	    }
	
	}


	
window.getNewEvent = function(event){
    event = parseEvent(event);
    drawImp(event.impid);
    drawEvent(event);
}