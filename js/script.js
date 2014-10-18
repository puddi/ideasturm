$(document).ready(function() {
	if ($.cookie('loginID') == undefined) {
		$('#ulNav li').toggleClass('noShow')
	}
	$('#browseButton').click(loadBrowse);
	$('#headNav h1 a').click(loadSubmit);
	$('#backButton').click(loadBack);
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
		$results.append($('<div id="browseFilters">').html('<h1>Choose a Category</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </p>'));
		$tiles = $('<div id="browseIdeas">');
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

