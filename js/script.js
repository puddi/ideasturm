$(document).ready(function() {
	console.log('Yup, we loaded');
	
	jQuery.fn.extend({

	    // Submit idea to backend
	    submitIdea: function() {
	    	$.ajax({
	    		type: "POST",
	    		url: "ideasturm.azurewebsites.net/IdeaSturm.asmx/CreateIdea",
	    		data: '{ "IdeaName":"' + $('#mainIdeaField').val() + '","IdeaDate":"today"' + '"}',
	    		contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	console.log("Idea submitted");
                },
                error: function (msg) {
                	console.log("Idea FAILED to submit :(");
                }
	    	});
	    },
	    
	    // Search for idea with name containing keyword(s)
	    searchIdea: function() {
	    	$.ajax({
	    		type: "POST",
	    		url: "ideasturm.azurewebsites.net/IdeaSturm.asmx/SearchIdeas",
	    		data: '{ "keywords":"' + $('#mainSearchField').val() +'"}',
	    		contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	console.log("Search succeeded");
                },
                error: function (msg) {
                	console.log("Search failed");
                }
	    	});
	    },
	    
	    // Fetch all ideas
	    getAllIdeas: function() {
	    	$.ajax({
	    		type: "POST",
	    		url: "ideasturm.azurewebsites.net/IdeaSturm.asmx/GetAllIdeas",
	    		data: '{ "GetIdeas":"true"}',
	    		contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                	console.log("Get all ideas succeeded");
                },
                error: function (msg) {
                	console.log("Get all ideas failed");
                }
	    	});
	    },
	    
	    // Mark an idea as a favorite
	    favorite: function() {
	    	if ($.isLoggedIn()) {
		    	$.ajax({
		    		type: "POST",
		    		url: "ideasturm.azurewebsites.net/IdeaSturm.asmx/Favorite",
		    		data: '{ "IdeaName":"' +  +'"}',
		    		contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (msg) {
	                	console.log("Favorite succeeded");
	                },
	                error: function (msg) {
	                	console.log("Favorite failed");
	                }
		    	});
	    	} else {
	    		alert("You must log in to favorite this.");
	    	}
	    },
	    
	    // Get a user's favorites
	    getFavorites: function() {
	    	if ($.isLoggedIn()) {
		    	$.ajax({
		    		type: "POST",
		    		url: "ideasturm.azurewebsites.net/IdeaSturm.asmx/GetFavorites",
		    		data: '{ "user":"' +  +'"}',
		    		contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                success: function (msg) {
	                	console.log("Get favorites succeeded");
	                },
	                error: function (msg) {
	                	console.log("Get favorites failed");
	                }
		    	});
	    	} else {
	    		alert("You must be logged in.");
	    	}
	    },
	    
	    // Log a user in, extremely securely ;)
	    login: function() {
	    	
	    },
	    
	    // Returns true if user is logged in, false otherwise
	    isLoggedIn: function() {
	    	
	    }
	});
	
	$("#mainIdeaButton").click($('').submitIdea());
	
});

$(function () {
    $('#mainIdeaField').keyup(function (event) {
        if (event.which == 13) {
            var templateResult = $('.result');
            $.ajax({
                type: "POST",
                url: "WebService.asmx/AddString",
                data: '{ "input":"' + $('.userInput').val() + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    $('.userInput').val('');
                    $('.target').empty();
                },
                error: function (msg) {

                }
            });
        } else {
            var templateResult = $('.result');
            $.ajax({
                type: "POST",
                url: "WebService.asmx/GetSuggestions",
                data: '{ "input": "' + $('.userInput').val() + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    $('.target').empty();
                    $.each(msg.d, function () {

                        $('.target').append(this + "<br>");

                    });
                },
                error: function (msg) {

                }
            });
        }

    });
    
});


	$('#content').css({
		'background-image': 'url(assets/home.jpg)',
		'background-size': 'cover',
	});
	/* $('#content').append($('<div id="blurb">').append(
			$('<p>').text("Ideas are awesome. Share yours with the world.")
		)
	); */
