// Initialize app
var myApp = new Framework7();
//storage: window.localStorage;


var user = {
	data: {username: "",password: "",mail: ""},
	save: function() {
         
        if (user.data.username != "") {
             
            window.localStorage.setItem(user.data.username, JSON.stringify(user.data));
			
        }
    },
	
	exist: function(u,p) {
		var rtr = false;
		if (u != "" && p != "") {
			var value = window.localStorage.getItem($.trim(u));
            user.data = JSON.parse(value);
			if(user.data.password==p) {
				rtr = true;
			}
		}
		return rtr;
	}

}


var wishlist = {
     
    data: {tipo: "wishlist",titolo: "", visibilita: ""},
	

	
  save: function() {
         
        if (wishlist.data.titolo != "") {
             
            window.localStorage.setItem(wishlist.data.titolo, JSON.stringify(wishlist.data));
			
        }
    },
	load: function(titolo) {
     
        if (titolo != "") {
             
            var value = window.localStorage.getItem($.trim(titolo));
            wishlist.data = JSON.parse(value);
        }
    }
}



var wish = {
     
    data: {tipo: "wish",titolo: "", categoria: "",wishlist: "", prezzo: "", descrizione: "", tag: "", img: ""},
	
  save: function() {
         
        if (wish.data.titolo != "") {
             
            window.localStorage.setItem(wish.data.titolo, JSON.stringify(wish.data));
        }
    },
	load: function(titolo) {
     
        if (titolo != "") {
             
            var value = window.localStorage.getItem($.trim(titolo));
            wish.data = JSON.parse(value);
        }
    }
}




// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true,
	domCache: true
});

function fail(){}

function gotFS(fileSystem) {
    console.log("got filesystem");
    // save the file system for later access
    console.log(fileSystem.root.fullPath);
    window.rootFS = fileSystem.root;
}

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
	
   
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

	
});





myApp.onPageInit('listWishlist', function (page) {
  $('#wishlist').empty();
  
   for (var i=0; i< window.localStorage.length; i++) {
   
    var tmpvalue = window.localStorage.getItem(window.localStorage.key(i));
    wishlist.data = JSON.parse(tmpvalue);
   
	if (  wishlist.data.tipo == "wishlist"  ) {
		  $('#wishlist').append($('<option>', {
			value: window.localStorage.key(i) ,
			text: window.localStorage.key(i) 
		}));
  }
            }
  
});

myApp.onPageReinit('listWishlist', function (page) {
    $('#wishlist').empty();
   for (var i=0; i< window.localStorage.length; i++) {
   var tmpvalue = window.localStorage.getItem(window.localStorage.key(i));
    wishlist.data = JSON.parse(tmpvalue);
       if (  wishlist.data.tipo == "wishlist"  ) {
		  $('#wishlist').append($('<option>', {
			value: window.localStorage.key(i) ,
			text: window.localStorage.key(i) 
		}));
	}
            }
  
});



myApp.onPageInit('reviewish', function (page) {

$("#img_camPH_r").attr("src",window.sessionStorage.getItem("img"));
$("#ptags").text(window.sessionStorage.getItem("tag"));
$("#pdescrizione").text(window.sessionStorage.getItem("descrizione"));
$("#pprezzo").text(window.sessionStorage.getItem("prezzo")+ ' €') ;
$("#pwishscelta").text(window.sessionStorage.getItem("wishlist"));
$("#pcategoria").text(window.sessionStorage.getItem("categoria"));
$("#ptitolo").text(window.sessionStorage.getItem("titolo"));
});




myApp.onPageInit('listawish', function (page) {
var k = 0;
  var $row;
  $("#contentmain").empty();
   for (var i=0; i< window.localStorage.length; i++) {
    
    var tmpvalue = window.localStorage.getItem(window.localStorage.key(i));
    wish.data = JSON.parse(tmpvalue);
   
	if (  wish.data.tipo == "wish"  ) {
		if(k==0 || (((k-1) % 3)==0) && k != 1) {
			$row = $("#contentmain").append("<div class='row no-gutter'></div>").children("div:last-child");
		}
		$row.append("<div class='col-50'><img src='"+wish.data.img+"' width='100%' border='2'/></div>");
		k++;
  }
            }
  
});

myApp.onPageReinit('listawish', function (page) {
  var $row;
  var k = 0;
  $("#contentmain").empty();
   for (var i=0; i< window.localStorage.length; i++) {
    
    var tmpvalue = window.localStorage.getItem(window.localStorage.key(i));
    wish.data = JSON.parse(tmpvalue);
   
	if (  wish.data.tipo == "wish"  ) {
		if(k==0 || (((k-1) % 3)==0) && k != 1) {
			$row = $("#contentmain").append("<div class='row no-gutter'></div>").children("div:last-child");
		}
		$row.append("<div class='col-50'><img src='"+wish.data.img+"'  width='100%' border='2'/></div>");
		k++;
  }
            }

  
});




myApp.onPageInit('listawishlist', function (page) {
var k = 0;
  var $row;
  $("#contentmainlist").empty();
   for (var i=0; i< window.localStorage.length; i++) {
    
    var tmpvalue = window.localStorage.getItem(window.localStorage.key(i));
    wishlist.data = JSON.parse(tmpvalue);
   
	if (  wishlist.data.tipo == "wishlist"  ) {
		if(k==0 || (((k-1) % 3)==0) && k != 1) {
			$row = $("#contentmainlist").append("<div class='row no-gutter'></div>").children("div:last-child");
		}
		
		
		for (var y=0; y< window.localStorage.length; y++) {
		
		var tmpvalue2 = window.localStorage.getItem(window.localStorage.key(y));
		wish.data = JSON.parse(tmpvalue2);
		
			if (  wish.data.tipo == "wish"  ) {
				if (  wish.data.wishlist == wishlist.data.titolo  ) {
					$row.append("<div class='col-50'><img src='"+wish.data.img+"'  width='100%' border='2'/></div>");
					break;
				}
			}
		
		}

		k++;
  }
            }
  
});

myApp.onPageReinit('listawishlist', function (page) {


var k = 0;
  var $row;
  $("#contentmainlist").empty();
   for (var i=0; i< window.localStorage.length; i++) {
    
    var tmpvalue = window.localStorage.getItem(window.localStorage.key(i));
    wishlist.data = JSON.parse(tmpvalue);
   
	if (  wishlist.data.tipo == "wishlist"  ) {
		if(k==0 || (((k-1) % 3)==0) && k != 1) {
			$row = $("#contentmainlist").append("<div class='row no-gutter'></div>").children("div:last-child");
		}
		
		
		for (var y=0; y< window.localStorage.length; y++) {
		
		var tmpvalue2 = window.localStorage.getItem(window.localStorage.key(y));
		wish.data = JSON.parse(tmpvalue2);
		
			if (  wish.data.tipo == "wish"  ) {
				if (  wish.data.wishlist == wishlist.data.titolo  ) {
					$row.append("<div class='col-50'><img src='"+wish.data.img+"'  width='100%' border='2'/></div>");
					break;
				}
			}
		
		}

		k++;
  }
            }

  
});


