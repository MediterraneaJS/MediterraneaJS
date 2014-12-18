$(function () {
    var header = $('header');
    var logo = $('.logo');
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 14) {
			header.addClass('fixed');
		} else {
			header.removeClass('fixed');
		}
    });
    
    $('.btn-large').hover(function() {
        $(this).parent().addClass('hover');
    }, function() {
        $(this).parent().removeClass('hover');
    });

    
    // Detect svg images and convert it into inline svg
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
    
        jQuery.get(imgURL, function(data) {
            var $svg = jQuery(data).find('svg');
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            $img.replaceWith($svg);
        }, 'xml');
    
    });
    
    $('.nav-toggle').click(function(){
        $(this).toggleClass('close');
        $(this).next().toggleClass('open');
        $('body').toggleClass('overlay-show');
        
        return false;
    });
    $('.overlay').click(function(){
        $('.nav-toggle').removeClass('close');
        $('.nav-toggle').next().toggleClass('open');
        $('body').toggleClass('overlay-show');
    });
});