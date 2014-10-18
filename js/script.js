$(document).ready(function() {

	if ($.cookie('loginID') == undefined) {
		//$('#ulNav li').toggleClass('noShow')
	}

	if (isLoggedIn()) {
		$('#ulNav li').toggleClass('noShow');
	}
	
	$('#browseButton').click(loadBrowse);
	//$('#sortIdeasButton').click(getIdeaByTag); needs to be moved to actual search button
	$('#headNav h1 a').click(loadSubmit);
	$('#backButton').click(loadBack);
	$('#profileButton').click(loadProfile);
	$("#mainSubmitButton").click(submitIdea);
	$('#doLogInButton').click(login);
	$('#logOutButton').click(logout);
	$('#doSignUpButton').click(signup);
	$('.fave').each(function() {
		this.addEventListener("click", addFavorite);
	});
	
//	getFavoritesForUser();

	$('#mainIdeaField').click(function() {
		if ($(this).text() == 'Title') {
			$(this).text('');
		}
	});
	$('#mainIdeaFieldDescription').click(function() {
		if ($(this).text() == 'Description') {
			$(this).text('');
		}
	});
	$('#signUpButton').click(function() {
		$('#login').slideUp(400, function() {
			if ($('#signUp').css('display') == 'none') {
				$('#signUp').slideDown();
				$('#usernameSignUp').click(function() {
					if ($(this).text() == 'username') {
						$(this).text('');
					}
				});
				$('#emailSignUp').click(function() {
					if ($(this).text() == 'email') {
						$(this).text('');
					}
				});
				$('#passwordSignUp').click(function() {
					if ($(this).text() == 'password') {
						$(this).text('');
					}
				});
			} else {
				$('#signUp').slideUp();
			}
		});
	});
	$('#loginButton').click(function() {
		$('#signUp').slideUp(400, function() {	
			if ($('#login').css('display') == 'none') {
				$('#login').slideDown();
				$('#usernameLogIn').click(function() {
					if ($(this).text() == 'username') {
						$(this).text('');
					}
				});
				$('#passwordLogIn').click(function() {
					if ($(this).text() == 'password') {
						$(this).text('');
					}
				});
			} else {
				$('#login').slideUp();
			}
		});	
	});



	/* $('#content').append($('<div id="blurb">').append(
			$('<p>').text("Ideas are awesome. Share yours with the world.")
		)
	); */

	loadSubmit();

});

var $pastState;

function loadSubmit() {
	$('#content').fadeOut(300, function() {
		$('#content').empty();
		if (isLoggedIn()) {
			$('#content').append($('<div>').attr('id', 'blurb').html('<p>Ideas are awesome. Share yours with the world.</p><div id="mainIdeaField" contenteditable="true">Title</div><div id="mainIdeaFieldDescription" contenteditable="true">Description</div><div id="mainIdeaFieldTags" contenteditable="true">Tags, comma-separated</div><p><a href="#"><span id="mainSubmitButton">Submit</span></a></p>'))
			.fadeIn(300);
		} else {
			$('#content').append($('<div>').attr('id', 'blurb').html('<p>Ideas are awesome. Share yours with the world.</p><div id="mainIdeaField" contenteditable="true"></div><p><a href="#"><span id="mainSubmitButton">Submit</span></a></p>')
			).fadeIn(300);
		}
		$('#mainIdeaField').click(function() {
			if ($(this).text() == 'Title') {
				$(this).text('');
			}
		});
		$('#mainIdeaFieldDescription').click(function() {
			if ($(this).text() == 'Description') {
				$(this).text('');
			}
		});
		$('#mainIdeaFieldTags').click(function() {
			if ($(this).text() == 'Tags, comma-separated') {
				$(this).text('');
			}
		});

	});
}

function loadBrowse() {
	$('#content').fadeOut(300, function() {
		$('#content').empty();
		// request for browse stuff here
		// for now i just have temp data
		$results = $('<div id="browse">').css('text-align', 'center');
		$results.append($('<div id="browseFilters">').html('<div id="searchTags" contenteditable="true">Search by Keyword or Hashtag</div><div id="searchAuthor" contenteditable="true">Search by Idea Creator</div><div id="sortSearch" onclick="getIdeaByTag"><a href="#" id="sortIdeasButton">Sort by <span id="sortingMetric">time</a> <i class="fa fa-arrow-down"></i></a><ul><li>favorites</li><li>time</li><li>comments</li></ul></div><div id="filterSearch"><a href="#">Filter</a></div>'));
		$tiles = $('<div id="browseIdeas">');
		var ideaList = getAllIdeas();
		console.log(ideaList["Name"]);
		
		$.each(ideaList, function() {
			var id = ideaList[key];
			console.log(id);
			$res = createBox(id["IdeaName"], id["IdeaDescription"], id["IdeaID"], id["UserName"], id["Tags"]);
			$res.$(".IdeaBoxTemplate:not(.faves)").click(function() {
				$pastState = $('#content').children().clone(true, true);
				loadIndividualIdea('url(./assets/avatartest.png)', 'testname', 'testtitle', 'testdescription', 'blah');
			})
			$tiles.append($res);
		});

		$('#content').append($results.append($tiles)).fadeIn(300);
		$('#searchTags').click(function() {
			if ($(this).text() == 'Search by Keyword or Hashtag') {
				$(this).text('');
			}
		});
		$('#searchAuthor').click(function() {
			if ($(this).text() == 'Search by Idea Creator') {
				$(this).text('');
			}
		});
		$('#sortSearch, #sortSearch ul').hover(function() {
			$('#sortSearch ul').css('display', 'block');
		}, function() {
			$('#sortSearch ul').css('display', 'none');
		});
		$('#sortSearch li').click(function() {
			$('#sortingMetric').text($(this).text());
		});
	});
}

function loadIndividualIdea(imageInfo, user, name, title, description, data) {
	$('#content').fadeOut(300, function() {
		$('#content').empty().append(createIndividualIdea(imageInfo, user, name, title, description));
		$('#content').fadeIn(300);
		$('#backNav li').toggleClass('noShow');
	});
}

function loadBack() {
	$('#content').fadeOut(300, function() {
		$('#content').empty().append($pastState);
		$('#content').fadeIn(300);
		$('#backNav li').toggleClass('noShow');
	});
}

function loadProfile() {
	$('#content').fadeOut(300, function() {
		$('#content').empty().append(createProfile($.cookie("userID")));
		$('#content').fadeIn(300);
	});
}

var $ideaTemplate = $('<div>').addClass('ideaBoxTemplate')
	.append($('<p>').addClass('title'))
	.append($('<p>').addClass('author').html('by: <span></span>'))
	.append($('<hr>'))
	.append($('<p>').addClass('stats').html('<a href="#" class="fave"><i class="fa fa-star-o"></i><span class="favorites">test</span></a> <i class="fa fa-comments"></i><span class="comments">test</span> <i class="fa fa-bolt"></i><span class="implementations">test</span>'));

var $commentTemplate = $('<div>').addClass('comment').html('<div class="avatar"><div class="avatarDiv"></div><p class="name"></p><p class="info">on 10/10/16</p></div><div class="commentText"></div>');

var $individualIdeaTemplate = $('<div id="individualIdea">').html('<div id="ideaInfo"><div class="title"><p></p></div><div class="author"><div class="avatarDiv"></div><p>by: <span>author</span></p></div><p class="description"></p></div><hr><div id="ideaOptions"><p class="commentsOption">Show comments</p><p class="implementationsOption">Show implementations</p></div><div id="ideaFeedback"></div>');

var $profileTemplate = $('<div id="profile">').html('<div class="avatar"><div class="avatarDiv"></div><h2>name goes here</h2></div><hr><div id="options"><p>Ideas</p><p>Comments</p><p class="lastchild">Implementations</p></div><div id="stuffThatActuallyGoesHere"><br style="clear:both;"></div>');



function createProfile(userID) {
	// get profile information w/ ajax
	var $temp = $profileTemplate.clone();
}

function createBox(title, author, fav, com, imp) {
	var $temp = $ideaTemplate.clone();
	$temp.find('.title').text(title);
	$temp.find('.author span').text(author);
	$temp.find('.favorites').text(fav);
	$temp.find('.comments').text(com);
	$temp.find('.implementations').text(imp);
	return $temp;
}

function createComment(avatarInfo, name, date, text) {
	var $temp = $commentTemplate.clone();
	$temp.find('.avatarDiv').css('background-image', avatarInfo);
	$temp.find('.name').text(name);
	$temp.find('.info').text(date);
	$temp.find('.commentText').text(text);
	$temp.append('<br style="clear:both;">');
	return $temp;
}

function createIndividualIdea(avatarInfo, user, title, description, commentData) {
	var $temp = $individualIdeaTemplate.clone();
	$temp.find('.title p').text(title);
	$temp.find('.author .avatarDiv').css('background-image', avatarInfo);
	$temp.find('.author span').text(user);
	$temp.find('.description').text(description);
	$temp.find('#ideaFeedback').html(createComment(avatarInfo, 'testCom', '10/10/10/', 'You know this idea sucks'));
	// for each comment data do something w/ createComment();
	return $temp;
}

// Submit idea to backend
function submitIdea() {
	var userID = ((isLoggedIn()) ? $.cookie("userID") : "1");
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/CreateIdea",
		data: '{"IdeaName":"' + $('#mainIdeaField').text() + '","IdeaDescription":"' + $('#mainIdeaFieldDescription').text() +
				'","UserID":"' + userID + '","tags":"' + $('#mainIdeaFieldTags').text() + '"}',
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	console.log("Idea submitted");
        },
        error: function (msg) {
        	console.log("Idea FAILED to submit :(");
        	console.log(msg);
        }
	});
};

// Search for idea by tag
function getIdeaByTag() {
	console.log("Get idea by tag");
	var tags = $('#searchTags').val().split(' ').toString();
	console.log(tags);
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/SearchIdeas",
		data: '{"Tags":"' + tags + '"}',
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

//Search for idea by author name, return a single idea
function getIdeaByName() {
	console.log("Get idea by name");
	var name = $('#searchTags').val();
	console.log(name);
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/SearchIdeas",
		data: '{"name":"' + name + '"}',
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	var json = $.parseJSON(msg);
        	console.log(msg)
        	console.log("Search succeeded");
        	return json["#text"];
        },
        error: function (msg) {
        	console.log("Search failed");
        }
	});
};
    
//// Search for idea with name containing keyword(s)
//function searchIdea() {
//	$.ajax({
//		type: "POST",
//		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/SearchIdeas",
//		data: '{}',
//		contentType: "application/json; charset=utf-8",
//        dataType: "jsonp",
//        success: function (msg) {
//        	console.log("Search succeeded");
//        },
//        error: function (msg) {
//        	console.log("Search failed");
//        }
//	});
//};
    
// Returns array of all idea "objects"
function getAllIdeas() {
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/GetAllIdeas",
		//data: '{"GetIdeas":"true"}',
		data: '{}',
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	console.log($.parseJSON(msg["d"]));
        	console.log("Get all ideas succeeded");
        	return msg["d"];
        },
        error: function (msg) {
        	console.log(msg);
        	console.log("Get all ideas failed");
        }
	});
};
    
// Mark an idea as a favorite
function addFavorite() {
	if (isLoggedIn()) {
		var ideaID = $(this).parent().parent().siblings(".title").first();
		console.log(ideaID);
    	$.ajax({
    		type: "POST",
    		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/Favorite",
    		data: '{ "username":"' + $.cookie("loginStatus") +'","ideaid":"' +  '"}',
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
    
// Returns a list of the user's favorites
function getFavoritesForUser() {
	if (isLoggedIn()) {
    	$.ajax({
    		type: "POST",
    		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/GetFavoritesForUser",
    		data: '{ "username":"' + $.cookie("loginStatus") +'"}',
    		contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
            	console.log("Get favorites succeeded");
            	return msg["d"];
            },
            error: function (msg) {
            	console.log("Get favorites failed");
            }
    	});
	} else {
		alert("You must be logged in.");
	}
};

// Register a new user: name, password, email
// createUser operation returns 1 if successful, 0 if not
function signup() {
	console.log("Sign up");
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/CreateUser",
		data: '{ "name":"' + $('#usernameSignUp').text() + '","pass":"' + $('#passwordSignUp').text() +
				'","email":"' + $('#emailSignUp') + '"}',
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {;
        	if (msg["d"] === 1) {
        		$.cookie("loginStatus", $('#usernameSignUp').text());
	        	console.log("Sign up succeeded");
        	} else {
        		console.log("Request succeeded, sign up failed");
        		alert("Invalid username,password, or email");
        	}
        },
        error: function (msg) {
        	console.log("Sign up failed");
        }
	})
};
    
// Log a user in, extremely securely ;)
function login() {
	console.log("login");
	var username = $('#usernameLogIn').text();
	var password = $('#passwordLogIn').text();
	console.log(username + ", " + password);
	if (username != null && password != null) {
		$.ajax({
			type: "POST",
			url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/login",
			data: '{ "name":"' + username + '","pass":"' + password + '"}',
			contentType: "application/json; charset=utf-8",
	        dataType: "json",
	        success: function (msg) {
	        	if (msg["d"] === 1) {
	        		$.cookie("loginStatus", username);
	        		$('#ulNav li').toggleClass('noShow');
		        	console.log("Log in succeeded");
	        	} else {
	        		console.log("Request succeeded, log in failed");
	        		alert("Invalid username or password");
	        	}
	        },
	        error: function (msg) {
	        	console.log("Log in request failed");
	        }
		});
	}
};
    
// Log a user out
function logout() {
	if (isLoggedIn()) {
		$.removeCookie("loginStatus"); // foolproof
		$('#ulNav li').toggleClass('noShow');
	}
	console.log("Logged out");
};
    
// Returns true if user is logged in, false otherwise
function isLoggedIn() {
	return true;
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
