$(document).ready(function() {
	if ($.cookie('loginID') == undefined) {
		$('#ulNav li').toggleClass('noShow')
	}
	$('#browseButton').click(loadBrowse);
	$('#headNav h1 a').click(loadSubmit);
	/* $('#content').append($('<div id="blurb">').append(
			$('<p>').text("Ideas are awesome. Share yours with the world.")
		)
	); */
});

function loadSubmit() {
	$('#content').fadeOut(300, function() {
		$('#content').empty();
		$('#content').append($('<div>').attr('id', 'blurb').html('<p>Ideas are awesome. Share yours with the world.</p><div id="mainIdeaField" contenteditable="true"></div><p><a href="#"><span id="mainSubmitButton">Submit</span></a></p>')
		).fadeIn(300);
	});
	
}

function loadBrowse() {
	$('#content').fadeOut(300, function() {
		$('#content').empty();
		// request for browse stuff here
		// for now i just have temp data
		$results = $('<div id="browse">').css('text-align', 'center');
		$results.append($('<div id="browseFilters">').html('<h1>Choose a Category</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </p>'));
		$tiles = $('<div id="browseIdeas">');
		for (var i = 0; i < 5; ++i) {
			$tiles.append(createBox(i, i, i, i, i));
		}
		$('#content').append($results.append($tiles)).fadeIn(300);
	});
}

var $ideaTemplate = $('<div>').addClass('ideaBoxTemplate')
	.append($('<p>').addClass('title'))
	.append($('<p>').addClass('author').html('by: <span></span>'))
	.append($('<hr>'))
	.append($('<p>').addClass('stats').html('<a href="#"><i class="fa fa-star-o"></i><span class="favorites">test</span></a> <i class="fa fa-comments"></i><span class="comments">test</span> <i class="fa fa-bolt"></i><span class="implementations">test</span>'));

var $
function createBox(title, author, fav, com, imp) {
	var $temp = $ideaTemplate.clone();
	$temp.find('.title').text(title);
	$temp.find('.author span').text(author);
	$temp.find('.favorites').text(fav);
	$temp.find('.comments').text(com);
	$temp.find('.implementations').text(imp);
	return $temp;
}

$(document).ready(function() {
	console.log('Yup, we loaded');
	
	jQuery.fn.extend({

	    // Submit idea to backend
	    submitIdea: function() {
	    	$.ajax({
	    		type: "POST",
	    		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/CreateIdea",
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
	    		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/SearchIdeas",
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
	    		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/GetAllIdeas",
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
		    		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/Favorite",
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
		    		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/GetFavorites",
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
	    	var username = $('#username').val();
	    	if (username != '' && $('#password') != '') {
	    		if ($('').passwordValid($('password'))) {
	    			$.cookie("loginStatus", username);
	    		} else {
	    			alert("Incorrect username/password");
	    		}
	    		
	    	}
	    },
	    
	    // Validate password with backend
	    passwordValid: function(pwrd) {
	    	return true;
	    },
	    
	    // Log a user out
	    logout: function() {
	    	$.removeCookie("loginStatus"); // foolproof
	    },
	    
	    // Returns true if user is logged in, false otherwise
	    isLoggedIn: function() {
	    	if ($.cookie("loginStatus") != null) {
	    		return true;
	    	}
	    	return false;
	    }
	});
	
	$("#mainIdeaButton").click($('').submitIdea());
	$('#loginButton').login();
	$('#logoutButton').logout();
	
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
	$('#blurb').append($('<div id="yadayada">').css('text-align', 'center'));
	for (var i = 1; i < 5; i++) {
		$('#yadayada').append(createBox("hello", "author", "543534", "43", "99"));	
	}
	/* $('#content').append($('<div id="blurb">').append(
			$('<p>').text("Ideas are awesome. Share yours with the world.")
		)
	); */
