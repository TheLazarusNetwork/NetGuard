chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
	var currentURL = tabs[0].url;
	var tabURL = new URL(currentURL);
	var currentDomain = tabURL.hostname;

	// GET API call - https://api.jquery.com/jQuery.get/

    $("#domain").val(currentDomain);
});

$("#danger").click(function() {
	var currentDomain = $("#domain").val();
	console.table(currentDomain);

	// POST API call

	// $.post( "test.php", {domain: "spam", content: "spam"}).done(function(data) {
    // 	console.table("Data Loaded: " + data);
  	// });
});