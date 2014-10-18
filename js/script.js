$(document).ready(function() {
	if ($.cookie('loginID') == undefined) {
		$('#ulNav li').toggleClass('noShow')
	}
	

	
	$('#browseButton').click(loadBrowse);
	$('#sortIdeasButton').click(getIdeaByTag);
	$('#headNav h1 a').click(loadSubmit);
	$('#backButton').click(loadBack);
	$("#mainSubmitButton").click(submitIdea);
	$('#logInButton').click(login);
	$('#logOutButton').click(logout);

	
	/* $('#content').append($('<div id="blurb">').append(
			$('<p>').text("Ideas are awesome. Share yours with the world.")
		)
	); */
});

var $pastState;

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
		$results.append($('<div id="browseFilters">').html('<div id="searchTags" contenteditable="true">Search by Keyword or Hashtag</div><div id="searchAuthor" contenteditable="true">Search by Idea Creator</div><div id="sortIdeas" onclick="getIdeaByTag"><a href="#" id="sortIdeasButton">Sort Ideas</a></div><div id=filterSearch>Filter</div>'));
		$tiles = $('<div id="browseIdeas">');
		getAllIdeas();
		for (var i = 0; i < 20; ++i) {
			$res = createBox(i, i, i, i, i);
			$res.click(function() {
				$pastState = $('#content').children().clone(true, true);
				loadIndividualIdea('url(./assets/avatartest.png)', 'testname', 'testtitle', 'testdescription', 'blah');
			})
			$tiles.append($res);
		}
		$('#content').append($results.append($tiles)).fadeIn(300);
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

var $ideaTemplate = $('<div>').addClass('ideaBoxTemplate')
	.append($('<p>').addClass('title'))
	.append($('<p>').addClass('author').html('by: <span></span>'))
	.append($('<hr>'))
	.append($('<p>').addClass('stats').html('<a href="#"><i class="fa fa-star-o"></i><span class="favorites">test</span></a> <i class="fa fa-comments"></i><span class="comments">test</span> <i class="fa fa-bolt"></i><span class="implementations">test</span>'));

var $commentTemplate = $('<div>').addClass('comment').html('<div class="avatar"><div class="avatarDiv"></div><p class="name"></p><p class="info">on 10/10/16</p></div><div class="commentText"></div>');

var $individualIdeaTemplate = $('<div id="individualIdea">').html('<div id="ideaInfo"><div class="title"><p></p></div><div class="author"><div class="avatarDiv"></div><p>by: <span>author</span></p></div><p class="description"></p></div><hr><div id="ideaOptions"><p class="commentsOption">Show comments</p><p class="implementationsOption">Show implementations</p></div><div id="ideaFeedback"></div><br style="clear:both;">');

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
	return $temp;
}

function createIndividualIdea(avatarInfo, user, title, description, commentData) {
	var $temp = $individualIdeaTemplate.clone();
	$temp.find('.title p').text(title);
	$temp.find('.author .avatarDiv').css('background-image', avatarInfo);
	$temp.find('.author span').text(user);
	$temp.find('.description').text(description);
	// for each comment data do something w/ createComment();
	return $temp;
}

// Submit idea to backend
function submitIdea() {
	var userID = ((isLoggedIn()) ? $.cookie("userID") : "1");
	console.log($('#mainIdeaField').text());
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/CreateIdea",
		data: '{"IdeaName":"' + $('#mainIdeaField').text() + '","IdeaDescription":"' + $('#mainIdeaField').text() +
				'","UserID":"' + userID + '","tags":"' + $('#mainIdeaField').text() + '"}',
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
    
// Fetch all ideas
function getAllIdeas() {
	$.ajax({
		type: "POST",
		url: "http://ideasturm.azurewebsites.net/IdeaSturm.asmx/GetAllIdeas",
		//data: '{"GetIdeas":"true"}',
		data: '{}',
		contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        	console.log(msg.responseJSON);
        	console.log("Get all ideas succeeded");
        	return msg.responseJSON;
        },
        error: function (msg) {
        	console.log(msg.responseJSON);
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
            dataType: "jsonp",
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
