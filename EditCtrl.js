addressApp.controller("EditCtrl",function($scope ,$rootScope){
	var db = $rootScope.db;

	$scope.user = {}
	$scope.$watch("selectedUser",function(old,newVal){
		$scope.user = $scope.selectedUser;
	})
	$scope.updateClick = function(){ 
		var user =  $rootScope.selectedUser;
		
		if(user.firstname != "" && user.lastname != "" && user.phone !=""){
			
			db.transaction(updateRecord);

		}
	}

	function updateRecord(txn){
		
		var user =  $scope.user;
		var oldPhone = $rootScope.oldPhone;
		var query = "update addresstable set firstname = '" +user.firstname+"', lastname='"+user.lastname+"', phone='"+user.phone+"' where phone='"+oldPhone+"'";
		txn.executeSql(query,[],function(tx){
			console.log("Updated Successfully " + oldPhone+" "+user.phone);
			$rootScope.refreshTable();
		},
		function(tx,err){
			console.log(err)
		}
		);
	}

	$scope.cancel = function(){
		$rootScope.showHeader = true;
		$rootScope.showDisplay = true;
		$rootScope.showEdit = false;

	}
});
