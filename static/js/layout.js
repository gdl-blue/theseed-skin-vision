// func
function ringo_do_xss_encode(data) {
    data = data.replace(/'/g, '&#x27;');
    data = data.replace(/"/g, '&quot;');
    data = data.replace(/</g, '&lt;');
    data = data.replace(/</g, '&gt;');

    return data;
}

function ringo_do_url_encode(data) {
    return encodeURIComponent(data);
}

// event
vision_user_info();
function vision_user_info() {
    let name = document.getElementById('sidebar-0-name1').innerHTML;
        
    fetch("/api/user_info/" + ringo_do_xss_encode(name)).then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = "";
        for(let for_a = 0; for_a < text['data'].length; for_a++) {
            data += ringo_do_url_encode(text['data'][for_a]['level']) +
            ' (' + ringo_do_url_encode(text['data'][for_a]['exp']) + ' / ' + ringo_do_url_encode(text['data'][for_a]['max_exp']) + ')';
        }
        document.getElementById('sidebar-0-name3').innerHTML = data;
    });
}

ringo_do_side_button_1();
function ringo_do_side_button_1() {
    fetch("/sidebar.json").then(function(res) {
        return res.json();
    }).then(function(text) {
        let data = '';
        for(let for_a = 0; for_a < text.length && for_a < 14; for_a++) {
			data += '<li><a class=recent-item href="/w/'+ ringo_do_xss_encode(text[for_a].document) + '">';
			data += '<span class=recent-time>' + ringo_do_xss_encode(formatDate(new Date(text[for_a].date * 1000), 'm/d')) + '</span>';
			data += '<span class=recent-title>' + ringo_do_xss_encode(text[for_a].document) + '</span></a></li>';
        }
        document.getElementById('sidebar-1-list').innerHTML = data;
    }).catch(function(error) {
        document.getElementById('sidebar-1-item').innerHTML = 'API를 불러오지 못했습니다!';
    });
}

// Dropdown
$( function () {
	'use strict';
	$( '.dropdown' ).on( 'show.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.dropdown' ).on( 'hide.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.btn-group' ).on( 'show.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );

	$( '.btn-group' ).on( 'hide.bs.dropdown', function () {
		$( this ).find( '.dropdown-menu' ).first().stop( true, true ).fadeToggle( 200 );
	} );
} );

$(function() {
	if($('#toc').length) {
		$('#toc .toc-item').each(function(index, el) {
			el = $(el);
			var tgt = $('<li>');
			var a = $('<a>');
			a.text(el.contents().filter(function() { return this.nodeType === 3; }).text().trim());
			a.prepend($('<span class=heading-number>').text(el.find('> a')[0].textContent));
			a.attr('href', el.find('> a')[0].getAttribute('href'));
			tgt.append(a);
			$('.sidebar-2 > .sidebar-2-list').append(tgt);
		});
		$('.sidebar-2').show();
	} else {
		$('.sidebar-2').remove();
	}
	
	$('.nav-tabs .nav-item .nav-link, .nav-pills .nav-item .nav-link').click(function(event) {
		event.preventDefault();
		$(this).parent().parent().find('> .nav-item > .nav-link.active').removeClass('active');
		$(this).addClass('active');
	});
});

function setDark() {
	const cookie = document.cookie.split('; ').map(item => ({ key: item.split('=')[0], value: item.replace(item.split('=')[0] + '=', '') })).find(item => item.key == 'main_css_darkmode');
	if(cookie && cookie.value != '0')
		$('body').addClass('dark');
}

setDark();
