chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    var currentDomain = tabs[0].url;
    $("#domain").val(currentDomain);
});

$("#checkPage").click(function() {
  alert("Handler for .click() called.");
});