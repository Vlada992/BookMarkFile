$("#stajlBukIc").mouseenter(() => {
    $("#bokmarkDef").fadeIn(820);
    document.getElementById('stajlBukIc').src = `images/filledBuk1.png`;
    document.getElementById('bokmarkDef').style.display = 'block'
});

$("#stajlBukIc").mouseleave(() => {
    document.getElementById('stajlBukIc').src = `images/bukImg1.png`;
    $("#bokmarkDef").fadeOut(1000);
});


$("#allDel").mouseenter(() => {
    document.getElementById('allDelDef').style.opacity = '1'
    //$("#allDelDef").fadeIn(920);
});

$("#allDel").mouseleave(() => {
    document.getElementById('allDelDef').style.opacity = '0'
    //$("#allDelDef").fadeOut(300);
});


$("#allLine").mouseenter(() => {
    document.getElementById('allDelDef3').style.opacity = '1'
    //$("#allDelDef").fadeIn(920);
});

$("#allLine").mouseleave(() => {
    document.getElementById('allDelDef3').style.opacity = '0'
    //$("#allDelDef").fadeOut(300);
});



document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
    document.getElementById('myGifBuk').style.display = 'block'
    setTimeout(() => {
        document.getElementById('myGifBuk').style.display = 'none'
    }, 2000)

    var siteNameV = document.getElementById("siteName").value;
    let siteJustUrl = document.getElementById('siteUrl');
    var siteUrlV = document.getElementById("siteUrl").value;
    console.log('a ovde, vrednost:', siteUrlV);
    if (!validateForm(siteNameV, siteUrlV)) {
        return false;
    }
    var siteNameDOM = document.getElementById("siteName");
    var siteUrlDOM = document.getElementById("siteUrl");
    siteUrlDOM.style.font = 'normal  bold 20px';
    siteNameDOM.style.font = 'normal  bold 20px';


    if (siteUrlV.charAt(0) == 'w') {
        siteUrlV = 'http://' + siteUrlV;
    }
    var tajmIt = String(new Date());
    var tajm1 = tajmIt.slice(0, 24);
    var bookmark = {
        name: siteNameV.toUpperCase(),
        url: siteUrlV,
        time: tajm1
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
    //fetchBookmarks()
    fetchBookmarks();
    fetchBookInline()
    e.preventDefault();
}

function deleteBookmark(url, name) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url && bookmarks[i].name == name) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    fetchBookInline()

};

function deleteAllBook() {
    var bookmarks2 = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks2.length; i++) {
        bookmarks2.splice(i);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks2));
    fetchBookmarks()
    fetchBookInline()
};

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults;
    bookmarksResults = document.getElementById("bookmarksResults");


    bookmarksResults.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var tajm2 = bookmarks[i].time;

        bookmarksResults.innerHTML += `
    <div class="thumbnail">
      <img id ='imgIdBuk' src= 'http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${url}&width=370' />
      <div class="caption">
      <h3 title='Wbesite name is: ${name}' id =btnH3Id> <img id='imgIdFav' src='https://plus.google.com/_/favicon?domain_url=${url}'/>&nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;<a><i title="See latest full capture of page" onclick= callIt("${url}") class="fa fa-camera-retro"></i></a></h3>
        <p></p>` +
            '<a href="' + url + '" target=_"blank" class="btn btn-info" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i> </a></a> <a href="#" onclick="deleteBookmark(\'' + url + '\', \'' + name + '\')" class="btn btn-danger" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
            `</div>
<p id='stajlTajmer'>${tajm2}</p>
</div>`
    }
};

function fetchBookInline() {
    var bookmarksGet = JSON.parse(localStorage.getItem("bookmarks"));
    var tempSwap = false;
    var bukRes = document.getElementById("bookmarksResults");
    var lineTxt = document.getElementById('allLine');

    lineTxt.addEventListener("click", () => {
        if (tempSwap === false) {
            bukRes.innerHTML = '';
            for (var i = 0; i < bookmarksGet.length; i++) {
                var nameG = bookmarksGet[i].name;
                var urlG = bookmarksGet[i].url;
                var tajm2G = bookmarksGet[i].time;
                bukRes.innerHTML += `<div class="caption1">
      <h3 title='Website name is: ${nameG}' id =btnH3Id1> <img id='imgIdFav1' src='https://plus.google.com/_/favicon?domain_url=${urlG}'/>&nbsp;${nameG.toLowerCase()}&nbsp;&nbsp;&nbsp;</h3> <a id='retroI'><i title="See latest full capture of page" onclick= callIt("${urlG}") class="fa fa-camera"></i>  </a>
        <p></p>` +
                    '<a id="visitBtn1" href="' + urlG + '" target=_"blank" class="btn btn-primary" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i> </a> <a id="deleteBtn1" href="#" onclick="deleteBookmark(\'' + urlG + '\', \'' + nameG + '\')" class="btn btn-warning" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    `<p id='stajlTajmer1'>${tajm2G}</p>

</div> `
            }
            tempSwap = true;
        } else {
            bukRes.innerHTML = '';
            for (var i = 0; i < bookmarksGet.length; i++) {
                var nameG = bookmarksGet[i].name;
                var urlG = bookmarksGet[i].url;
                var urlG1 = /\.([^\.]+)\./g.exec(String(bookmarksGet[i].url))
                console.log(urlG, urlG1);
                var tajm2G = bookmarksGet[i].time;
                bukRes.innerHTML += `    <div class="thumbnail">
<img id ='imgIdBuk' src= 'http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${urlG}&width=370'/>
<div class="caption">
      <h3 title='Websate name is: ${nameG}' id =btnH3Id> <img id='imgIdFav' src='https://plus.google.com/_/favicon?domain_url=${urlG}'/>&nbsp;${nameG}&nbsp;&nbsp;&nbsp;&nbsp;<a><i title="See latest full capture of page" onclick= callIt("${urlG}") class="fa fa-camera-retro"></i></a></h3>
     <p></p>` + '<a href="' + urlG + '" target=_"blank" class="btn btn-info" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i> </a> <a href="#" onclick="deleteBookmark(\'' + urlG + '\', \'' + nameG + '\')" class="btn btn-danger" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                    `</div> 
<p id='stajlTajmer'>${tajm2G}</p>`
            }
            tempSwap = false;
        };
    });
};


function validateForm(siteName, siteUrl) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteName && !siteUrl) {
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
    if (!siteUrl.match(regex)) {
        alert("Please use valid URL!!!");
        return false;
    }
    return true;
}
function callIt(takeUrl){
    var image = new Image();
    var imgUrl = `http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${takeUrl}&viewport=1440x900&fullpage=1`
    /*document.getElementById('imgTester').src = imgUrl;
    image.onload = function(e) {
        console.log('a', e)
    }*/
    var firstTake = window.open(`http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${takeUrl}&viewport=1440x900&fullpage=1`)
    var fixUrl = 'https' + takeUrl.slice(4)
    image.src = firstTake
};