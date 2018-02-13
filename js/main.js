

document.getElementById("myForm").addEventListener("submit", saveBookmark);


function saveBookmark(e) {
	var siteNameV = document.getElementById("siteName").value;   //take value Name from user input
	var siteUrlV =  document.getElementById("siteUrl").value;    //take value URL from user input
	console.log(document.getElementsByTagName('input'));

	if(!validateForm(siteNameV, siteUrlV)) { //Proveravamo da li je dobro ukucano i da li je info validan. !false =true

		return false;
	}

	var bookmark = {
		name: siteNameV,
		url: siteUrlV
	};


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

	fetchBookmarks(); //first save bookMark then represent in HTML.
	e.preventDefault(); //SO THIS IS PREVENTING FORM FROM SUBMMITING!
} //save bookMark func


function deleteBookmark(url) {
    var noParse = localStorage.getItem('bookmarks') //string
    console.log(noParse);
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	console.log(bookmarks)


	for(var i = 0; i < bookmarks.length; i++) {

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
										'  <a class="btn btn-info" target ="_blank"  href = "'+url+'">  Visit Us!&nbsp; <i class="fas fa-external-link-alt"></i> </a>' +	
										'  <a onclick = "deleteBookmark(\''+url+'\')" class="btn btn-danger"   href = "#">Delete &nbsp; <i class="fas fa-trash-alt"></i></i></a> '	+	
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

	return true;   //final true of func
} //validateForm function
