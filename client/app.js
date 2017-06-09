angular.module('forum', ['angular-meteor', 'ui.router', 'angularTrix'])
    .config(function($urlRouterProvider, $stateProvider) {
        // Set the default route 
        $urlRouterProvider
            .when('/', '/welcome')
            .otherwise('/welcome');

        $stateProvider.state('welcome', {
            url: '/welcome',
            templateUrl: 'views/pages/welcome.html'
        });

        $stateProvider.state('inventory', {
            url: '/inventory',
            templateUrl: 'views/pages/inventory.html'
        });

        $stateProvider.state('blogs', {
            url: '/blogs',
            templateUrl: 'views/pages/blogs.html',
            controller: 'BlogsController'
        });

        $stateProvider.state('blog', {
            url: '/blog/:blogId',
            templateUrl: 'views/pages/blog.html',
            controller: 'BlogController'
        })

        $stateProvider.state('topics', {
            url: '/topics',
            templateUrl: 'views/pages/topics.html',
            controller: 'TopicsContoller'
        });

        $stateProvider.state('topic', {
            url: '/topic/:topicId',
            templateUrl: 'views/pages/topic.html',
            controller: 'TopicContoller'
        });

        $stateProvider.state('thread', {
            url: '/thread/:threadId',
            templateUrl: 'views/pages/thread.html',
            controller: 'ThreadContoller'
        });

    })
    .run(function($state, $rootScope, $sce) {
        // We inject $state here to initialize ui.router 
        $rootScope.helpers({
            availableAccountAction: function() {
                if (Meteor.user()) {
                    return 'Logout';
                }
                return 'Sign In';
            }
        });

        $rootScope.trustHtml = function(stuff) {
            return $sce.trustAsHtml(stuff);
        };

        $rootScope.logInorOut = function() {
            if (!Meteor.user()) {
                console.log("Logging in");
                Meteor.loginWithGoogle({
                    requestPermissions: ['email', 'profile'],
                    loginStyle: 'popup'
                });
            } else {
                console.log("Logging out");
                Meteor.logout();
            }
        }
    })
    .controller('TopicsContoller', function($scope) {
        $scope.subscribe('topics');
        $scope.helpers({
            topics: function() {
                return Topics.find({}, {
                    sort: {
                        name: 1
                    }
                });
            }
        });
    })
    .controller('TopicContoller', function($scope, $stateParams, $meteor) {
        $scope.subscribe('topic', function() {
            return [$stateParams.topicId];
        });
        $scope.subscribe('threads', function() {
            return [$stateParams.topicId];
        });
        $scope.helpers({
            topic: function() {
                return Topics.findOne({
                    _id: $stateParams.topicId
                });
            },
            threads: function() {
                return Threads.find({
                    topicId: $stateParams.topicId
                });
            }
        });
        $scope.createThread = function(thread) {
            $meteor.call("createThread", $stateParams.topicId, thread.title, thread.content).then(function() {
                thread.content = '';
                thread.title = '';
            }).catch(function(error) {
                alert("An error occured while creating the thread! " + error);
            });
        };
    })
    .controller('ThreadContoller', function($scope, $sce, $stateParams, $meteor) {
        $scope.subscribe('thread', function() {
            // $scope.htmlString = thread.content;
            return [$stateParams.threadId];
        });
        $scope.subscribe('posts', function() {
            return [$stateParams.threadId];
        });
        $scope.helpers({
            thread: function() {
                return Threads.findOne({
                    _id: $stateParams.threadId
                });
            },
            posts: function() {
                return Posts.find({
                    threadId: $stateParams.threadId
                });
            }
        });


        $scope.createPost = function(post) {
            $meteor.call("createPost", $stateParams.threadId, post.content).then(function() {
                post.content = '';
            }).catch(function() {
                alert("An error occured while creating the post!");
            });
        };
    })
    .controller('BlogsController', function($scope, $stateParams) {
        $scope.subscribe('blogs');
        $scope.helpers({
            blogs: function() {
                return Blogs.find({}, {
                    sort: {
                        name: 1,
                        author: 1
                    },
                });
            }
        });
    })
    .controller('BlogController', function($scope, $stateParams) {
        $scope.subscribe('blog', function() {
            return [$stateParams.blogId];
        });

        $scope.helpers({
            blog: function() {
                return Blogs.findOne({
                    _id: $stateParams.blogId
                });
            }
        });
    });