var db;

function createContactsTable(txn){
	var sql = "create table if not exists contacts(fname,lname,mob unique);";
	txn.executeSql(sql,
				[],
				function(){
					console.log("db created");
				},
				function(t,err){
					console.log("error creating db");
					console.log(err);
	});
}

module.controller("contactsController",function($scope,$rootScope){
	createDb();
	$scope.contactsArray = [];
	fetchAllContacts();
	$rootScope.addContact={"display":"none"};
	$rootScope.editContact={"display":"none"};
	$scope.add = function(){
		$scope.contactsStyle = {"display":"none"};
		$rootScope.addContact = {"display":"block"};
		$rootScope.editContact = {"display":"none"};
	}

	$scope.edit = function(fname){
		$rootScope.updateMob = fname;
		console.log(fname);
		$scope.contactsStyle={"display":"none"};
		$rootScope.editContact = {"display":"block"};
	}

	function createDb(){
		db = openDatabase("AddressBook",1.0,"contacts database",10000);
		db.transaction(createContactsTable);
	}

	function fetchAllContacts(){
		console.log("fetching contacts");
		db.transaction(fetchData);
	}

	function fetchData(txn){
		var sql = "select * from contacts";
		txn.executeSql(sql,
					[],
					function(tx,result){
						for(var i = 0; i < result.rows.length;i++)
							$scope.contactsArray.push(result.rows.item(i));
						console.log($scope.contactsArray);
						$scope.$apply();
					},
					function(txn,err){
						console.log("error Fetching contacts");
						console.log(err);
					}
		);
	}

});
