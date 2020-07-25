chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    var currentDomain = tabs[0].url;
    document.getElementById("title").innerHTML = currentDomain;
});