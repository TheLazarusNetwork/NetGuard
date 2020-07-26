function getDomainName(tabURL){
	var tabURL = new URL(tabURL);
	return tabURL.hostname;
}

function processDomainStatus(response){
  safe = response["safe"];
  spam = response["spam"];
  adv = response["adv"];
  spyware = response["spyware"];
  malware = response["malware"];

  notSafe = spam + adv + spyware + malware;

  if(safe > notSafe){
    $('#net-guard-title').text('You Are Safe');
    $('#safe-count').text(safe);
    $('.bg-orb').removeClass('not-safe');
    $('#safety-icon').removeClass('icon-exclamation').addClass('icon-check-mark');
  } else {
    $('#net-guard-title').text('Not Safe');
    $('#not-safe-count').text(notSafe);
    $('.bg-orb').addClass('not-safe');
    $('#safety-icon').removeClass('icon-check-mark').addClass('icon-exclamation');
  }
}

function voteForThisDomain(type){
  domainName = $("#domain").val();
  $.ajax({
    type: "POST",
    url: "https://netguardapi.herokuapp.com/api/createNetGuard/",
    data: {
      'domain': domainName,
      'content': type
    }
  }).done(function(response){
    processDomainStatus(response);
  });
}

function loadApp(domainName){
  $.ajax({
    type: "GET",
    url: "https://netguardapi.herokuapp.com/api/getNetGuard/",
    data: {
      'domain': domainName
    }
  }).done(function(response){

    $('.loader').animate({
      opacity: 0
    }, 500, function(){
      $("#domain").val(currentDomain);
      processDomainStatus(response);
    });
  }).fail(function(){
    $('.loader').animate({
      opacity: 0
    }, 500, function(){
      $("#domain").val('Error Occurred. Please Reload!');
    });
  });
}

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  // Get Domain
  currentDomain = getDomainName(tabs[0].url);

  // Preview Current Domain
  if('newtab' == currentDomain){
    $("#domain").val('Open Website First');
    return;
  }

  setTimeout(() => {
    loadApp(currentDomain);  
  }, 500);
});

$("#danger").click(function(){
	$('#security-status, #user-interaction').animate({
    height: 0
  }, 300);

  $('#error-selection').animate({
    height: 260
  }, 300, function(){

  });
});

$('#back-error-section').click(function(){
  $('#security-status').animate({
    height: 290
  }, 300);
  $('#user-interaction').animate({
    height: 120
  }, 300);


  $('#error-selection').animate({
    height: 0
  }, 300);
});


$('#cta-safe').click(function(){
  voteForThisDomain('safe');
});

$('#cta-spam').click(function(){
  voteForThisDomain('spam');
});

$('#cta-adv').click(function(){
  voteForThisDomain('adv');
});

$('#cta-spyware').click(function(){
  voteForThisDomain('spyware');
});

$('#cta-malware').click(function(){
  voteForThisDomain('malware');
});