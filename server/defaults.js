if (Topics.find().count() === 0) {
	_.each(['General Discussion', 'Tutorials', 'Help'],
		function(topicName) {
			Topics.insert({name: topicName});
		});
}

if (Blogs.find().count() === 0) {
	_.each(
		[{
			name: 'Placeholder 99',
			author: 'Tom'
		},
		{
			name: 'Placeholder 2',
			author: 'Dick'
		},
		{
			name: 'Placeholder 3',
			author: 'Harry'
		},
		{
			name: 'Placeholder 4',
			author: 'Ballsy'
		},
		{
			name: 'Placeholder 5',
			author: 'Blabla'
		}],
		function(tempBlog) {
			Blogs.insert({
				name: tempBlog.name,
				author: tempBlog.author
			});
		});
}