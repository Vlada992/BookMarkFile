$('#stajlBukIc').mouseenter((e)=> {
    e.preventDefault()
    document.getElementById('stajlBukIc').src = `images/filledBuk1.png`;
    document.getElementById('bokmarkDef').style.display = 'block'
    $('#bokmarkDef').fadeIn(520);
});

$("#stajlBukIc").mouseleave((e)=> {
    e.preventDefault() 
    document.getElementById('stajlBukIc').src = `images/bukImg1.png`;
    $("#bokmarkDef").fadeOut(400);
});

$("#allDel").mouseenter(()=> {
    document.getElementById('allDelDef').style.opacity = '1'
});

$("#allDel").mouseleave(()=> {
    document.getElementById('allDelDef').style.opacity = '0'
});


$("#allLine").mouseenter(()=> {
    document.getElementById('allDelDef3').style.opacity = '1'
});

$("#allLine").mouseleave(()=> {
    document.getElementById('allDelDef3').style.opacity = '0'
});


document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e){
    document.getElementById('myGifBuk').style.display = 'block'
    setTimeout(()=>{
        document.getElementById('myGifBuk').style.display = 'none'
    }, 2000)
    var siteNameV = document.getElementById("siteName").value;
    var siteUrlV = document.getElementById("siteUrl").value;
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


function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var bookmarksResults;
    bookmarksResults = document.getElementById("bookmarksResults");
    bookmarksResults.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var tajm2 = bookmarks[i].time;

    bookmarksResults.innerHTML +=`<div class="thumbnail"><img id ='imgIdBuk' src='http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${url}&viewport=1440x900&width=250'/>
    <div class="caption"><h3 title='Wbesite name is: ${name}' id =btnH3Id> <img id='imgIdFav' src='https://plus.google.com/_/favicon?domain_url=${url}'/>
    &nbsp;${name}&nbsp;&nbsp;&nbsp;&nbsp;<a><i title="See latest full capture of page" onclick= callIt("${url}") class="fa fa-camera-retro"></i></a></h3>
    <p></p>` + '<a href="' + url + '" target=_"blank" class="btn btn-info" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i></a></a>' +
    '&nbsp; <a href="#" onclick="deleteBookmark(\'' + url + '\', \'' + name + '\')" class="btn btn-danger" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    '<i class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    `<button  id='expandBtn'><i class="fa fa-angle-down"></i></button>` + `</div><p id='stajlTajmer'>${tajm2}</p></div>`
    }
};

function fetchBookInline(){
    var bookmarksGet = JSON.parse(localStorage.getItem("bookmarks"));
    var tempSwap = false;
    var bukRes = document.getElementById("bookmarksResults");
    var lineTxt = document.getElementById('allLine');
    lineTxt.addEventListener("click", () => {
        if (tempSwap === false) {
            bukRes.innerHTML = '';
            for (var i = 0; i < bookmarksGet.length; i++){
                var nameG = bookmarksGet[i].name;
                var urlG = bookmarksGet[i].url;
                var tajm2G = bookmarksGet[i].time;

    bukRes.innerHTML +=`<div class="caption1">
    <h3 title='Website name is: ${nameG}' id =btnH3Id1> <img id='imgIdFav1' src='https://plus.google.com/_/favicon?domain_url=${urlG}'/>&nbsp;${nameG.toLowerCase()}&nbsp;&nbsp;&nbsp;</h3> <a id='retroI'><i title="See latest full capture of page" onclick= callIt("${urlG}") class="fa fa-camera"></i>  </a>
    <p></p>` + '<a id="visitBtn1" href="' + urlG + '" target=_"blank" class="btn btn-primary" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i> </a> <a id="deleteBtn1" href="#" onclick="deleteBookmark(\'' + urlG + '\', \'' + nameG + '\')" class="btn btn-warning" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
    `<p id='stajlTajmer1'>${tajm2G}</p> </div> ` + `<button  id='expandBtn'><i class="fa fa-angle-down"></i></button>`
            }
            tempSwap = true;
        }else{
            bukRes.innerHTML = '';
            for (var i = 0; i < bookmarksGet.length; i++){
                var nameG =  bookmarksGet[i].name;
                var nameGG = 'oneN_' + bookmarksGet[i].name;

                var nameGG1 = 'oneR' + bookmarksGet[i].name;
                var shortNam1 = 'one1' + String(nameG).slice(0, nameG.length - 1);

                var nameCom  = 'com' +  bookmarksGet[i].name;
                var icnCom  = 'comI' +  bookmarksGet[i].name;
                var msgVal  = 'msg' +   bookmarksGet[i].name;
                var toggleBtn = 'btn' + bookmarksGet[i].name;

                var shortNam = 'one_' + String(nameG).slice(0, nameG.length - 1);
                var urlG = bookmarksGet[i].url;
                var urlG1 = /\.([^\.]+)\./g.exec(String(bookmarksGet[i].url));
                var tajm2G = bookmarksGet[i].time;

                bukRes.innerHTML += `<div class="thumbnail">
    <img id ='imgIdBuk' src= 'http://api.screenshotlayer.com/api/capture?access_key=99359d2c1a52b834f4115b4e13a71262&url=${urlG}&viewport=1440x900&width=250'/>
    <div class="caption">
    <h3 title='Websate name is: ${nameG}' id =btnH3Id> <img id='imgIdFav' src='https://plus.google.com/_/favicon?domain_url=${urlG}'/>&nbsp;${nameG}&nbsp;&nbsp;&nbsp;&nbsp;<a><i title="See latest full capture of page" onclick= callIt("${urlG}") class="fa fa-camera-retro"></i></a></h3>
    <p></p>` + '<a href="' + urlG + '" target=_"blank" class="btn btn-info" role="button">Visit Us &nbsp; <i class="fas fa-external-link-alt"></i> </a> <a href="#" onclick="deleteBookmark(\'' + urlG + '\', \'' + nameG + '\')" class="btn btn-danger" role="button">Delete &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-trash-alt"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
   
    `<span class='showhim'  id=${nameGG}><i class="fa fa-angle-down"></i>
    <span class='showme' id=${shortNam}><span onmouseover ='changeFavIn("${i}")' onmouseleave='changeFavOut("${i}")'    onclick='showFavIcn("${i}", "${shortNam}", "${shortNam1}", "${nameGG1}")' id='${nameGG1}'  class='forFav'>Add to Favourite &nbsp; <i class="far fa-star  starEmpt"></i> </span><br><br> <span id='${nameCom}'  class='forComm'>  <input id="inp1" type = text>  &nbsp; <span id=${toggleBtn} onclick='addMesg("${nameCom}", "${icnCom}", "${msgVal}", "${toggleBtn}")'> Add &nbsp;<i  class="far fa-comment"></i></span>      </span> <br><br> Change &nbsp; <i class="glyphicon glyphicon-pencil"></i></span> </span>` + `</div> 
    <p id='stajlTajmer'>${tajm2G}  &nbsp;&nbsp;&nbsp;<span id='${shortNam1}' title='Favourite Bookmark' class='spanFav' style='display:none' ><i class="fas fa-star starThis"></i> </span>&nbsp;&nbsp;   <span style='display:none' id='${icnCom}'><i onmouseover ='showComm("${icnCom}", "${nameCom}", "${msgVal}")' onmouseleave='hideComm("${icnCom}", "${nameCom}", "${msgVal}")' class="fa fa-comment"></i></span> &nbsp;  <span id=${msgVal} style='display:none'></span>   </p>`
            }
            tempSwap = false;
        };
    });
};


let infoFavArr = [];
let togleRR = false;
function showFavIcn(loop, eachN, eachN1, eachNG){
    $("#"+ eachN1).toggle();
}



let holdIn   = []
let holdIOut = []
let commElm  = [];
let countTxt = [];
let togleRRR = false;
function changeFavIn(iterIn){
    document.getElementsByClassName('starEmpt')[iterIn].style.color = 'orange';
}
function changeFavOut(iterOut){
     document.getElementsByClassName('starEmpt')[iterOut].style.color = 'black';
}



function addMesg(comArg, comicon, msgV, btnT){
     commElm.push(comArg)
     var showTextVal = document.getElementById(comArg).children["0"].value;


     $('#' + btnT).toggle(
         function(){
     /*document.getElementById(comArg).innerText = `Remove Comment`;
     document.getElementById(msgV).innerHTML = `<p>${showTextVal}</p>`;
         document.getElementById(comicon).style.display = 'inline-block';*/
        console.log('jebte')},
     function(){
        console.log('heheh')
        //document.getElementById(btnT).innerText = `Remove Comment `;
       // document.getElementById(comArg).innerHTML = 
        document.getElementById(msgV).innerHTML = `<p>${showTextVal}</p>`;
        document.getElementById(comicon).style.display = 'inline-block';}
     ); //TOGLER
};



function showMesg(comStore, comVal, e){
    e.preventDefault(); 
    countTxt.push(comVal)
        var spanCom =  document.getElementById(comStore);
        var showText = document.getElementById(comVal).children["0"].value
        spanCom.insertAdjacentHTML('afterend', `<div id=msgTxtDiv><p>${showText}</p></div>`)
    $("#" + comVal).toggle();
}



function showComm(comStore, comVal, msg){
   document.getElementById(msg).style.display = 'inline-block'
};
function hideComm(comStore, comVal, msg){
    document.getElementById(msg).style.display = 'none'

};








function validateForm(siteName, siteUrl){
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
    let takeUrl1 = String(takeUrl.slice(0, takeUrl.length -1))
    let takeUrl2;
    apiKey0 = '99359d2c1a52b834f4115b4e13a71262';
    apiKey1 = 'f8896d862395e4296efadbddb2efeffb';
    if(String(takeUrl.slice(takeUrl.length -1)) == '/' ){
       
        
        image.src= window.open(`http://api.screenshotlayer.com/api/capture?access_key=f8896d862395e4296efadbddb2efeffb&url=${takeUrl1}&viewport=1440x900&fullpage=1`)
    }else {
    takeUrl2 = takeUrl + '/';
    var image = new Image();
    image.src= window.open(`http://api.screenshotlayer.com/api/capture?access_key=f8896d862395e4296efadbddb2efeffb&url=${takeUrl2}&viewport=1440x900&fullpage=1`)
    };
};