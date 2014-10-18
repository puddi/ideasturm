$(document).ready(function() {
	console.log('Yup, we loaded');
	
	jQuery.fn.extend({
	    zigzag: function () {
	        var text = $(this).text();
	        var zigzagText = 'hello, world';
	        var temp = document.createElement("p");
	        temp.innerHTML = "Hello, world!";
	        this.append(temp);
	        return zigzagText;
	    },
	    // Save idea to backend
	    submitIdea: function() {
	    	$.ajax({
	    		type: "POST",
	    		url: "/IdeaSturm.asmx/CreateIdea", // backend
	    		data: '{ "IdeaName":"' + $('#mainIdeaField').val() + '","IdeaDate":"today"}',
	    		contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    
                },
                error: function (msg) {

                }
	    	});
	    }
	});

	$('.target').zigzag();
	//console.log($('.target').zigzag());
	
	$('').submitIdea();
});

$(function () {
    $('.userInput').keyup(function (event) {
        if (event.which == 13) {
            var templateResult = $('.result');
            $.ajax({
                type: "POST",
                url: "WebService.asmx/AddString",
                data: '{ "input": "' + $('.userInput').val() + '"}',
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
