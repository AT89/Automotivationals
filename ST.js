var load = function()
{
	$.ajax(
		{
			url: 'https://www.reddit.com/r/EarthPorn.json',
			dataType: 'json',
			success: function(data)
			{
				var post = null;
				while(post == null || post.data.title.match(/earthporn?/i) || post.data.title.match(/poll/i))
				{
					post = data.data.children[Math.floor(Math.random() * data.data.children.length)];
				}
				if(post.data.url.includes("jpg") || post.data.url.includes("png"))
				{
					$('body').css('background-image', 'url(' + post.data.url+ ')');
					pic_url = $('#reddit_pic_url').attr("href", post.data.url)


					// need to make it go only IF the extension has .jpg or .png
				}
			}
		});

		$.ajax(
			{
				url: 'https://www.reddit.com/r/ShowerThoughts.json',
				dataType: 'json',
				success: function(data)
				{
					var post = null,
					title = $('h1');
					while(post == null || post.data.title.match(/Shower? thoughts/i))
					{
						post = data.data.children[Math.floor(Math.random() * data.data.children.length)];
					}
					//changing URL here
					url = $('#reddit_url').attr("href", post.data.url)
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
