var load = function()
{
	$.ajax(
		{
			url: 'https://www.reddit.com/r/mildlyinteresting.json',
			dataType: 'json',
			success: function(data)
			{
				var post = null;
				title = $('h1');
				while(post == null || post.data.title.match(/mildly ?interesting/i) || post.data.title.match(/poll/i))
				{
					post = data.data.children[Math.floor(Math.random() * data.data.children.length)];
				}
				if(post.data.preview.images[0] && post.data.preview.images[0].source)
				{
					$('body').css('background-image', 'url(' + post.data.preview.images[0].source.url + ')');
				}
				//changing URL here
				url = $('#reddit_url').attr("href", "http://reddit.com"+post.data.permalink)
				title.text(post.data.title.trim().replace(/\.$/, ''))
				$(window).trigger('resize');
			}
		});
	};

	//refresh page on click anywhere
	$(function()
	{
		load();
		$('body:not(.rbutton)').on('click', load); //WHY U NOT WORKING
		$(window).on('resize scroll', function()
		{
			var title = $('h1');
			title.css(
				{
					'margin': '-' + (title.height() / 2) + 'px 0 0'
				});
			});
		});
