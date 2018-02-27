document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    var siteNameV = document.getElementById("siteName").value; //take value Name from user input
    var siteUrlV = document.getElementById("siteUrl").value; //take value URL from user input
    console.log(document.getElementsByTagName('input'));

    if (!validateForm(siteNameV, siteUrlV)){
        return false;
    }
    var siteNameDOM = document.getElementById("siteName");
    var siteUrlDOM = document.getElementById("siteUrl");
    siteUrlDOM.style.font = 'normal  bold 20px';
    siteNameDOM.style.font = 'normal  bold 20px';

    if (siteUrlV.charAt(0) == 'w') {
        console.log('PRE:', siteUrlV)
        siteUrlV = 'http://' + siteUrlV;
        console.log(siteUrlV);
    }
    var bookmark = {
        name: siteNameV.toUpperCase(),
        url: siteUrlV
    };

    if (localStorage.getItem("bookmarks") === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
    document.getElementById("myForm").reset();
    fetchBookmarks(); //represent change in html
    e.preventDefault();
}

function deleteBookmark(url, name) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    console.log(url);
    console.log(name)

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url && bookmarks[i].name == name) {
            bookmarks.splice(i, 1);
        }
        console.log('now url:', url);
        console.log('now name:', name)
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
};

////////////////////////////////////////////////////////////////////////
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults;

    for (var x = 0; x <= 2; x++) {
        bookmarksResults = document.getElementById("bookmarksResults");
    }
    bookmarksResults.innerHTML = "";

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        console.log('OVDE JE URL:', url)
        bookmarksResults.innerHTML += `<div class="row">
  <div class="col-sm-6 col-md-12 col-lg-12">
    <div class="thumbnail">
      <img id ='imgIdBuk' src= 'http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${url}&width=400' />
      <div class="caption">
      <h3 title='Name of marked link' id =btnH3Id> <img id='imgIdFav' src='https://plus.google.com/_/favicon?domain_url=${url}'/>&nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;<a><i title="See latest full capture of page" onclick= callIt("${url}") class="fa fa-camera-retro"></i></a></h3>
        <p></p>` +
            '<a href="' + url + '" target=_"blank" class="btn btn-info" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i> </a></a> <a href="#" onclick="deleteBookmark(\'' + url + '\', \'' + name + '\')" class="btn btn-danger" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
           `</div>
    </div>
  </div>
</div>`

    }
};

function validateForm(siteName, siteUrl){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    /*var expression1 = /https?:\/\/(www\.)?/;
    var regex1 = new RegExp(expression1);*/

    if (!siteName && !siteUrl){
        alert("Please fill Website Name and Website Url!");
        return false;
    } else if (!siteUrl) {
        alert("Please fill Website Url");
        return false;
    } else if (!siteName) {
        alert("Please fill Website Name");
        return false
    } else if (siteName.length > 26) {
        alert('Only up to 26 letters')
        return false
    } else if (siteUrl.charAt(siteUrl.length - 3) != '.' && siteUrl.charAt(siteUrl.length - 4) != '.') {
        alert('please use valid URL!')
        console.log('NA TRI:', siteUrl.charAt(siteUrl.length - 3), 'NA cetr:', siteUrl.charAt(siteUrl.length - 4))
        return false;
    } else if (siteName.match(regex)) {
        alert('Please use valid Name, not URL')
        return false;
    }
    if (!siteUrl.match(regex)) {
        console.log(siteUrl.match(regex))
        alert("Please use valid URL!!!");
        return false;
    }
    return true;
} 
/*$.ajax({
      url: 'http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=http://apple.com&viewport=1440x900&fullpage=1',
      accepts:{accepts: "application/json"},
      dataType: 'jsonp',
      success: function(eventJson){
        console.log(eventJson);
      }
    }) 
  */
function callIt(takeUrl) {
    var image = new Image();
    image.src = window.open(`http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${takeUrl}&viewport=1440x900&fullpage=1`);
    image.onload = function(e) {
    console.log(e)
    }
};