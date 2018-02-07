

document.getElementById("myForm").addEventListener("submit", saveBookmark);


function saveBookmark(e) {


	var siteName = document.getElementById("siteName").value;
	var siteUrl = document.getElementById("siteUrl").value;


	if(!validateForm(siteName, siteUrl)) {

		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl


	}




	if(localStorage.getItem("bookmarks") === null) {

		var bookmarks = [];

		bookmarks.push(bookmark); //this will push data from form value and that object to this ARRAY
 		
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	} else {


		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));




	}


	document.getElementById("myForm").reset();

	fetchBookmarks();

	e.preventDefault();//SO THIS IS PREVENTING FORM FROM SUBMMITING!!

}


function deleteBookmark(url) {

	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	for(var i =0; i < bookmarks.length; i++) {

		if(bookmarks[i].url == url) {


		bookmarks.splice(i, 1);
		}
	}

	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));


	fetchBookmarks();


	
}




function fetchBookmarks() {


	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	
	var bookmarksResults = document.getElementById("bookmarksResults");


	bookmarksResults.innerHTML = "";

	for(var i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url  = bookmarks[i].url;

		bookmarksResults.innerHTML +=  '<div class = "well">' +
										'<h3>'+name+ '<br><br>'+
										'  <a class="btn btn-info" target ="_blank"  href = "'+url+'">  Visit Us!</a>' +	
										'  <a onclick = "deleteBookmark(\''+url+'\')" class="btn btn-danger"   href = "#">Delete</a> '	+	
										'</h3>' +
										'</div>';			
	}
										


};



function validateForm(siteName, siteUrl) {

if(!siteName && !siteUrl) {

		alert("Please fill Website Name and Website Url!");
		return false;
		
	} else if(!siteUrl) {

		alert("Please fill Website Url");
		

	} else if(!siteName) {

		alert("Please fill Website Name");
		

	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {
		alert("Please use valid URL!");
		return false;

	}


	return true;

}

