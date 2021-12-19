
var persisteduls=new Object()
var ddtreemenu=new Object()
ddtreemenu.closefolder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkExMDkxRDY1MDk0MTFFNUI5QUY4QjE3QkM3NDAzNUUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkExMDkxRDc1MDk0MTFFNUI5QUY4QjE3QkM3NDAzNUUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQTEwOTFENDUwOTQxMUU1QjlBRjhCMTdCQzc0MDM1RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQTEwOTFENTUwOTQxMUU1QjlBRjhCMTdCQzc0MDM1RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgcS9ioAAACDSURBVHjaYvz//z8DNQETA5XB0DfwLbUN/AXEoFjjpKaBIPANiMWpYeAPJPYLIFahpoEgcBuIjSgx8CcWsbNA7EBNA0FgP7UNXEiugV+xiE0F4gRqRcpuIM6hViyDIsON0mQD8/J2IDahRsL+DsRngNiLWlnvGRCbklI4MA76EhsgwACvKx+UEbjYtwAAAABJRU5ErkJggg=="
ddtreemenu.openfolder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTEyMEIwMDY1MDk0MTFFNUEzOTU4RjI5Rjg3MzFBMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTEyMEIwMDc1MDk0MTFFNUEzOTU4RjI5Rjg3MzFBMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MTIwQjAwNDUwOTQxMUU1QTM5NThGMjlGODczMUEyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MTIwQjAwNTUwOTQxMUU1QTM5NThGMjlGODczMUEyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj8NBHkAAABlSURBVHjaYvz//z8DNQETA5XBqIGD0EAWND4rEP8iwxxGXC78jSxJJGAmxsvEGsoHxP+IDUNC4SsFxJ9J0fQfj0s1gfg5ubGMbqg5EN+gNNnADHUF4lOkJBtSXDqa9YaKgQABBgDO/At17mgkmAAAAABJRU5ErkJggg=="
ddtreemenu.createTree=function(treeid,enablepersist,persistdays){var ultags=document.getElementById(treeid).getElementsByTagName("ul")
persisteduls[treeid]=(enablepersist==true)?ddtreemenu.getCookie(treeid).split(","):""
for(var i=0;i<ultags.length;i++)
ddtreemenu.buildSubTree(treeid,ultags[i],i)
if(enablepersist==true){var durationdays=(typeof persistdays=="undefined")?1:parseInt(persistdays)
ddtreemenu.dotask(window,function(){ddtreemenu.rememberstate(treeid,durationdays)},"unload")}}
ddtreemenu.buildSubTree=function(treeid,ulelement,index){ulelement.parentNode.className="submenu"
if(typeof persisteduls[treeid]=="object"){if(ddtreemenu.searcharray(persisteduls[treeid],index)){ulelement.setAttribute("rel","open")
ulelement.style.display="block"
ulelement.parentNode.style.backgroundImage="url("+ddtreemenu.openfolder+")"}
else
ulelement.setAttribute("rel","closed")}
else if(ulelement.getAttribute("rel")==null||ulelement.getAttribute("rel")==false)
ulelement.setAttribute("rel","closed")
else if(ulelement.getAttribute("rel")=="open")
ddtreemenu.expandSubTree(treeid,ulelement)
ulelement.parentNode.onclick=function(e){var submenu=this.getElementsByTagName("ul")[0]
if(flag_dem==0){if(submenu.getAttribute("rel")=="closed"){submenu.style.display="block"
submenu.setAttribute("rel","open")
ulelement.parentNode.style.backgroundImage="url("+ddtreemenu.openfolder+")"}
else if(submenu.getAttribute("rel")=="open"){submenu.style.display="none"
submenu.setAttribute("rel","closed")
ulelement.parentNode.style.backgroundImage="url("+ddtreemenu.closefolder+")"}
var durationdays=(typeof persistdays=="undefined")?1:parseInt(persistdays)
ddtreemenu.rememberstate(treeid,durationdays)}else{flag_dem=0;};ddtreemenu.preventpropagate(e)}
ulelement.onclick=function(e){ddtreemenu.preventpropagate(e)}}
ddtreemenu.expandSubTree=function(treeid,ulelement){var rootnode=document.getElementById(treeid)
var currentnode=ulelement
currentnode.style.display="block"
currentnode.parentNode.style.backgroundImage="url("+ddtreemenu.openfolder+")"
while(currentnode!=rootnode){if(currentnode.tagName=="UL"){currentnode.style.display="block"
currentnode.setAttribute("rel","open")
currentnode.parentNode.style.backgroundImage="url("+ddtreemenu.openfolder+")"}
currentnode=currentnode.parentNode}}
ddtreemenu.flatten=function(treeid,action){var ultags=document.getElementById(treeid).getElementsByTagName("ul")
for(var i=0;i<ultags.length;i++){ultags[i].style.display=(action=="expand")?"block":"none"
var relvalue=(action=="expand")?"open":"closed"
ultags[i].setAttribute("rel",relvalue)
ultags[i].parentNode.style.backgroundImage=(action=="expand")?"url("+ddtreemenu.openfolder+")":"url("+ddtreemenu.closefolder+")"}}
ddtreemenu.rememberstate=function(treeid,durationdays){var ultags=document.getElementById(treeid).getElementsByTagName("ul")
var openuls=new Array()
for(var i=0;i<ultags.length;i++){if(ultags[i].getAttribute("rel")=="open")
openuls[openuls.length]=i}
if(openuls.length==0)
openuls[0]="none open"
ddtreemenu.setCookie(treeid,openuls.join(","),durationdays)}
ddtreemenu.getCookie=function(Name){var re=new RegExp(Name+"=[^;]+","i");if(document.cookie.match(re))
return document.cookie.match(re)[0].split("=")[1]
return""}
ddtreemenu.setCookie=function(name,value,days){var expireDate=new Date()
var expstring=expireDate.setDate(expireDate.getDate()+parseInt(days))
document.cookie=name+"="+value+"; expires="+expireDate.toGMTString()+"; path=/";}
ddtreemenu.searcharray=function(thearray,value){var isfound=false
for(var i=0;i<thearray.length;i++){if(thearray[i]==value){isfound=true
thearray.shift()
break}}
return isfound}
ddtreemenu.preventpropagate=function(e){if(typeof e!="undefined")
e.stopPropagation()
else
event.cancelBubble=true}
ddtreemenu.dotask=function(target,functionref,tasktype){var tasktype=(window.addEventListener)?tasktype:"on"+tasktype
if(target.addEventListener)
target.addEventListener(tasktype,functionref,false)
else if(target.attachEvent)
target.attachEvent(tasktype,functionref)}