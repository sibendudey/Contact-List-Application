var myApp = angular.module('MyApp' , []);
myApp.controller('AppCtrl' , [ '$scope' , '$http' , function($scope , $http)	{
	console.log("Hello World from controller");
	
	$http.get('/contactList').then(function(response)	{
		console.log("I got the Data");
		console.log(response);
		$scope.contactlist = response.data;
	});
	
	var refresh = function()	{
		$http.get('/contactList').then(function(response)	{
		console.log("I got the Data");
		console.log(response);
		$scope.contactlist = response.data;
		$scope.contact = {};
	});
	}
	
	$scope.addContact = function()	{
		console.log($scope.contact);
		$http.post('/contactList' , $scope.contact).then(function(res)	{
			console.log(res.data);
			refresh();
		});
	}
	
	$scope.remove = function(id)	{
		console.log(id);
		$http.delete('/contactList/' + id).then(function(res)	{
				console.log(res.data);
				refresh();
			});
	}
	
	$scope.edit = function(id)	{
		console.log(id);
		$http.get("/contactList/" + id).then( function(response)	{
			$scope.contact = response.data;
		});	
	}
	
	$scope.update = function()	{
		console.log($scope.contact._id);
		$http.put("/contactList/" + $scope.contact._id , $scope.contact).then(function(res)	{
			refresh();
		})
	}
	
	$scope.deselect = function()	{
		$scope.contact = {};
	}
	

}]);

