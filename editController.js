module.controller("editController",function($scope,$rootScope){
	$scope.doneEdit = function(){
		db.transaction(loadRecord);
	}

	$scope.cancelEdit = function(){
		$rootScope.editContact={"display":"none"};
		$rootScope.contactsStyles={"display":"block"};
		//$scope.addContact={"display":"none"};
	}

	function loadRecord(txn){
		var sql = "update contacts set fname='" + $scope.editfname + "',lname='" + $scope.editlname;
		sql += "',mob='" + $scope.editmob + "' where mob='"+$rootScope.updateMob+"';";

		/*var sql="update tablename set fname=?,lname=? where mob=? and fname=? and lname=?";
		txn.transaction(sql,
			[$scope.fname,$scope.lname,$scope.mob,])
		txn.executeSql(sql,*/
					[],
					function(tx,result){
						console.log(result);
					},
					function(tx,error){
						console.log("error updating");
						console.log(error);
					});
	}
});
