
// Array to store Twitch TV channels
	
var twitchTVchannel =["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404", "brunofin","MeteorDev", "SYNTAG", "ExtremeModeration", "Dr4xell", "frinlet", "vihart"];	

function getTwitchChannels ()  {
	
	
    //Obtain channel stream and status api call
    
	var url1, url2;
	for (var i = 0; i < twitchTVchannel.length; i++) {
    	url1 = "https://wind-bow.gomix.me/twitch-api/streams/" + twitchTVchannel[i] + "?callback=?";
		
		// JSON callback url from streams - gets channel status - needs index protecting function because of the callback loop
		
		(function(i) {
  		$.getJSON(url1, function(data1) {
			
			var game, status;
			if (data1.stream === null) {
				
				game = "Offline";
				status = "offline";
				
			} else if ( data1.stream === undefined) {
				
				game = "No account";
				status = "offline";
				
			} else {
				
				game = data1.stream.game;
				status = "online";
			}
		
			// Obtain channel specific information from second JSON call
			url2 = 	"https://wind-bow.gomix.me/twitch-api/channels/" + twitchTVchannel[i];
			$.getJSON(url2, function(data1) {				
		
			var name, logo, urlx, action;
				
				if (data1.display_name === undefined) {
					
					name = twitchTVchannel[i];	
				}
				else {
					
					name = data1.display_name;
				}
				
			
				if (data1.logo === undefined) {
					
					logo = "http://www.polytopia.net/noLogo.jpg";
					
				}else {
					
					logo = data1.logo;
				}
					
				
				if (status === "online") {
					
					action = " - " + data1.status;
				}
				else {
					
					action = "";
				}

				if (data1.url === undefined) {
						
					urlx = "#";
					
				}else {
					
					urlx = data1.url;
				}
								
				var toggle;  // sends online and offline channels to a different class where they can be styled separately
				
				if (status === "online"){
					toggle = "onLineFollowers";
				}
				else {
					toggle = "offLineFollowers";
				}
		
	
	// Ptinting to HTML			
	html ="<div class='row " + toggle + "'>" + "<div class='col-md-3' id='imageAlign'>" + "<img src='" +logo + "'id ='logo' width= '100px' height= '100px'>" + "</div>"+ "<div class='col-md-3'>" + "<a href=" + urlx + " target= '_blank'>" +  name + "</a></div>" + "<div class='col-md-6'>" + game + action + "</div></div>";	
				
		       if (status === "online") {
				   
					$(".followerInfo").prepend(html);
			   }
				else {
					
					$(".followerInfo").append(html);
				}
				});  // end of inner JSON
			});  // end of outer first JSON 
		})(i);  // added to "protector function"
	}   // end of for loop
}


$(document).ready(function() {
	

	getTwitchChannels();  // Displays Channel results
	
	// Slow-Hide statement for on/offline channels
	$("#showOnLineChannels").click(function(e){
		 $('.onLineFollowers').show();	
		 $('.offLineFollowers').hide();	
	}); 
	$("#showOffLineChannels").click(function(e){
		$('.offLineFollowers').show();	
		$('.onLineFollowers').hide();	
	});
	$("#showAllChannels").click(function(e){
		$('.onLineFollowers').show();
		$('.offLineFollowers').show();	
	});

});  // End of Statement



