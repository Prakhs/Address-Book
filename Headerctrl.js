addressApp.controller("HeaderCtrl",function($scope,$rootScope){
	$rootScope.showHeader = true;
	$rootScope.showDisplay = true;
	$rootScope.showEdit = false;
	$rootScope.showAdd = false;
	$rootScope.users = [];
	$rootScope.db = openDatabase("AddressBook",1.0,"Useless DB",757657455);
	console.log($rootScope.db);
	$rootScope.db.transaction(createTable);
	function createTable(txn){
		var query = "create table if not exists addresstable(phone unique,firstname,lastname)";

		txn.executeSql(query,[],function(tx){
				console.log("Created Address Table Successfully")
			},function(tx,err){
				console.log(err);
			});
	}
	$scope.addClick = function(){
		$rootScope.showHeader = false;
		$rootScope.showDisplay = false;
		$rootScope.showAdd = true;

	}
});
