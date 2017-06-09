if (Topics.find().count() === 0) {
    _.each(
    	[{
                name: 'General Discussion',
                description: 'A place where you can discuss anything and everything'
            }, {
                name: 'Tutorials',
                description: 'A place where you can learn stuff'
            }, {
            	name: 'Help',
            	description: 'Need something? Ask here.'
        }],
        function(tempTopic) {
            Topics.insert({
                name: tempTopic.name,
                description: tempTopic.description
            });
        });
}

if (Blogs.find().count() === 0) {
    _.each(
        [{
            name: 'Placeholder 99',
            author: 'Tom'
        }, {
            name: 'Placeholder 2',
            author: 'Dick'
        }, {
            name: 'Placeholder 3',
            author: 'Harry'
        }, {
            name: 'Placeholder 4',
            author: 'Ballsy'
        }, {
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