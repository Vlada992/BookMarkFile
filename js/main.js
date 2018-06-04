
function showCoords(event){
  console.log('y:', event.pageY,  "x:",event.pageX)
}


$("#stajlBukIc").mouseover(() => {
   document.getElementById('stajlBukIc').src = `images/filledBuk1.png`;
   $("#bokmarkDef").fadeIn(820);
    document.getElementById('bokmarkDef').style.display ='block'
});
$("#stajlBukIc").mouseleave(() => {
  document.getElementById('stajlBukIc').src = `images/bukImg1.png`;
   $("#bokmarkDef").fadeOut(1000);
});


document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e){
    document.getElementById('myGifBuk').style.display = 'block'
    setTimeout(()=> {
     document.getElementById('myGifBuk').style.display = 'none'
    }, 2000)

    var siteNameV = document.getElementById("siteName").value;
    var siteUrlV = document.getElementById("siteUrl").value; 
    if (!validateForm(siteNameV, siteUrlV)){
        return false;
    }
    var siteNameDOM = document.getElementById("siteName");
    var siteUrlDOM = document.getElementById("siteUrl");
    siteUrlDOM.style.font = 'normal  bold 20px';
    siteNameDOM.style.font = 'normal  bold 20px';

    if (siteUrlV.charAt(0) == 'w') {
        siteUrlV = 'http://' + siteUrlV;
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
    fetchBookmarks();
    e.preventDefault();
}

function deleteBookmark(url, name){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url && bookmarks[i].name == name) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
};

function deleteAllBook(){
   var bookmarks2 = JSON.parse(localStorage.getItem("bookmarks"));
       for (var i = 0; i < bookmarks2.length; i++) {
        bookmarks2.splice(i);
       }
       localStorage.setItem("bookmarks", JSON.stringify(bookmarks2));
    fetchBookmarks()
};

////////////////////////////////////////////////////////////////////////
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults;
    for (var x = 0; x <= 2; x++) {
        bookmarksResults = document.getElementById("bookmarksResults");
    }
    bookmarksResults.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
  bookmarksResults.innerHTML +=`
    <div class="thumbnail">
      <img id ='imgIdBuk' src= 'http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${url}&width=400' />
      <div class="caption">
      <h3 title='Name of marked link' id =btnH3Id> <img id='imgIdFav' src='https://plus.google.com/_/favicon?domain_url=${url}'/>&nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;<a><i title="See latest full capture of page" onclick= callIt("${url}") class="fa fa-camera-retro"></i></a></h3>
        <p></p>` +
            '<a href="' + url + '" target=_"blank" class="btn btn-info" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i> </a></a> <a href="#" onclick="deleteBookmark(\'' + url + '\', \'' + name + '\')" class="btn btn-danger" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
           `</div>
</div>
`
    }
};
function validateForm(siteName, siteUrl){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
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
    } else if (siteName.match(regex)) {
        alert('Please use valid Name, not URL')
        return false;
    }
    if (!siteUrl.match(regex)){
        alert("Please use valid URL!!!");
        return false;
    }
    return true;
} 
function callIt(takeUrl) {
    var image = new Image();
    image.src = window.open(`http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${takeUrl}&viewport=1440x900&fullpage=1`);
    image.onload = function(e) {
    }
};

