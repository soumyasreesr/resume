// var request;
var request;
	var open;
	var tx;
	var store;
var indexedDB=window.indexedDB ||
	window.msIndexedDB || window.webkitIndexedDB || window.mozIndexedDB;
	request=indexedDB.open("myDb",1);
	request.onerror=function(e){
		console.log("error:"+errorCode);
	}
	request.onupgradeneeded=function(e){
		open=e.target.result;
		store=open.createObjectStore("resume",{ keyPath:"name" });
	}
	request.onsuccess=function(e){
		open=e.target.result;
		function getData(callback){
	 tx=open.transaction("resume",IDBTransaction.READ_ONLY);
		var store=tx.objectStore("resume"); 
		var result=[];
	
		 tx.oncomplete=function(e){
		 	callback(result);
		 	console.log(e);
		};
		tx.onerror=function(e){
			console.log("error"+e);
		}
		var cursor=store.openCursor();
		cursor.onerror=function(e){
			console.log("error"+e);
		}
		cursor.onsuccess=function(e){
			var resultCursor=e.target.result;
			if(resultCursor){
			result.push(resultCursor.value);
		resultCursor.continue();
		}
	}
		console.log(result);
	}
	var main=document.querySelector(".parent");

	getData(function(data){
		console.log(data);
		for(var i in data){
			var childDiv=document.createElement("div");
			childDiv.classList.add("child");
			main.append(childDiv);
			// console.log(data[i].id);
			var img=document.createElement("img");
			img.src="man.svg";
			img.alt=data[i].name;
			childDiv.append(img);
			var name=document.createElement("h2");
			name.textContent=data[i].name;
			childDiv.append(name);
			var button=document.createElement("a");
			button.href="resume.html?name="+data[i].name;
			button.textContent="view profile";
			childDiv.append(button);

			}		
	})
}
	