$(document).ready(function() {
	if ($.cookie('loginID') == undefined) {
		$('#ulNav li').toggleClass('noShow')
	}
	

	
	$('#browseButton').click(loadBrowse);
	$('#headNav h1 a').click(loadSubmit);
	$("#mainIdeaButton").click(submitIdea);
	$('#logInButton').click(login);
	$('#logOutButton').click(logout);
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
		$results.append($('<div id="browseFilters">').html('<div id="searchTags" contenteditable="true">Search by Keyword or Hashtag</div><div id="searchAuthor" contenteditable="true">Search by Idea Creator</div><div id="sortIdeas">Sort Ideas</div><div id=filterSearch>Filter</div>'));
		$tiles = $('<div id="browseIdeas">');
		getAllIdeas();
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

// Submit idea to backend
function submitIdea() {
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
};
    
// Search for idea with name containing keyword(s)
function searchIdea() {
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
};
    
// Fetch all ideas
function getAllIdeas() {
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/GetAllIdeas",
		data: '{ "GetIdeas":"true"}',
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	console.log("Get all ideas succeeded" + msg);
        	return $.ajax.response();
        },
        error: function (msg) {
        	console.log("Get all ideas failed");
        }
	});
};
    
// Mark an idea as a favorite
function favorite() {
	if (isLoggedIn()) {
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
};
    
// Get a user's favorites
function getFavorites() {
	if (isLoggedIn()) {
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
};
    
// Log a user in, extremely securely ;)
function login() {
	var username = $('#username').val();
	if (username != '' && $('#password') != '') {
		if (passwordValid($('password'))) {
			$.cookie("loginStatus", username);
		} else {
			alert("Incorrect username/password");
		}
	}
};
    
// Validate password with backend
function passwordValid(pwrd) {
	return true;
};
    
// Log a user out
function logout() {
	if (isLoggedIn()) {
		$.removeCookie("loginStatus"); // foolproof
	}
	console.log("Logged out");
};
    
// Returns true if user is logged in, false otherwise
function isLoggedIn() {
	if ($.cookie("loginStatus") != null) {
		return true;
	}
	return false;
};



/*// Real-time suggestions and search results as user types into field
// Not able to connect to WebService.asmx
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
*/


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
