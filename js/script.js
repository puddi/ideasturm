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
	    saveIdea: function() {
	    	$.ajax({
	    		type: "POST",
	    		url: "ideasturm.html", // backend
	    		data: '{ "idea": ' + $('.userIdea').val() + '"}',
	    		contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    $.ajax.send();
                },
                error: function (msg) {

                }
	    	});
	    }
	});

	$('.target').zigzag();
	//console.log($('.target').zigzag());
	
	$('.target').saveIdea();
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



