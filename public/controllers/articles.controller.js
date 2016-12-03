angular.module("crud")
//get articles
.controller('ArticlesCtrl', ['$scope','$http', function($scope, $http){
	$http.get('/articles').success(function(data){
		$scope.articles = data;
	});
}])
//get articles category
.controller('ArticlesCategoryCtrl', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('/articles/category/'+$routeParams.category).success(function(data){
		$scope.cat_articles = data;
		$scope.category = $routeParams.category;
	});
}])
// get articles category by id
.controller('ArticleDetailsCtrl', ['$scope','$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
	$http.get('/articles/'+$routeParams.id).success(function(data){
		$scope.article = data;
	});
	//delete 
	$scope.removeArticle = function(){
		$http.delete('/articles/'+$routeParams.id).success(function(data){
			console.log(data);
		});

		$location.path('/articles');
	}
}])
//create
.controller('ArticleCreateCtrl', ['$scope','$http','$routeParams', '$location', function($scope, $http, $routeParams, $location){
	$http.get('/categories').success(function(data){
		$scope.categories = data;
	});

	$scope.addArticle = function(){
		var data = {
			title: $scope.title,
			body: $scope.body,
			category: $scope.category
		}
		//post
		$http.post('/articles', data).success(function(data, status){
			console.log(status);
		});

		$location.path('/articles');
	}
}])
//edit article
.controller('ArticleEditCtrl', ['$scope','$http','$routeParams', '$location', function($scope, $http, $routeParams, $location){
	$http.get('/categories').success(function(data){
		$scope.categories = data;
	});

	$http.get('/articles/'+$routeParams.id).success(function(data){
		$scope.article = data;
	});
	//update
	$scope.updateArticle = function(){
		var data = {
			id:    		$routeParams.id,
			title:  	$scope.article.title,
			body: 		$scope.article.body,
			category: 	$scope.article.category
		}

		$http.put('/articles', data).success(function(data, status){
			console.log(status);
		});

		$location.path('/articles');
	}
}])