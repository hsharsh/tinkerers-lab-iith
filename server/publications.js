Meteor.publish('topics', function() {
	return Topics.find();
});

Meteor.publish('topic', function(id) {
	check(id, String);
	return Topics.find({_id: id});
});

Meteor.publish('threads', function(topicId) {
	check(topicId, String);
	return Threads.find({topicId: topicId});
});

Meteor.publish('thread', function(id) {
	check(id, String);
	return Threads.find({_id: id});
});

Meteor.publish('posts', function(threadId) {
	check(threadId, String);
	return Posts.find({ threadId: threadId });
});

Meteor.publish('post', function(id) {
	check(id, String)
	return Posts.find({_id: id});
});

Meteor.publish('blogs', function() {
	return Blogs.find();
});

Meteor.publish('blog', function(id) {
	check(id, String);
	return Blogs.find({_id: id});
});