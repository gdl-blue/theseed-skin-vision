// liberty 스킨 참고함

$(function() {
	$('.wiki-article img.wiki-image-loading').removeClass('wiki-image-loading').each(function () {
		$(this).attr('src', $(this).attr('data-src'));
	});
	
	$('#searchform').submit(function() {
		return false;
	});
	
	$('#searchInput').keypress(function (event) {
		if(event.keyCode != 13) return;
		event.preventDefault();
		var val = $(this).val();
		if(val.length)
			location.assign('/go/' + encodeURIComponent(val));
	});
	
	$('#searchInput').autocomplete({
		delay: 100,
		source: function source(req, res) {
			$.ajax({
				url: '/complete/' + encodeURIComponent(req.term),
				dataType : 'json',
				success: function success(data) {
					res(data);
				},
				error: function error(data) {
					res([]);
				}
			});
		},
		select: function select(event, ui) {
			if(ui.item.value)
				location.assign('/w/' + encodeURIComponent(ui.item.value));
		}
	});
	
	$('#searchSearchButton').click(function () {
		var val = $('#searchInput').val();
		if(val.length)
			location.assign('/search/' + encodeURIComponent(val));
	});
	
	$('#searchGoButton').click(function () {
		var val = $('#searchInput').val();
		if(val.length)
			location.assign('/w/' + encodeURIComponent(val));
	});
});
