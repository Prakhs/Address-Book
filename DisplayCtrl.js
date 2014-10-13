addressApp.controller("DisplayCtrl", function($scope, $rootScope) {
    var db = $rootScope.db;
    //$scope.users = $rootScope.users;

    if (db != null) {
        db.transaction(displayAddress);
    }
    $rootScope.refreshTable = function(){
    	var db = $rootScope.db;
    	
    	if(db != null){
    		db.transaction(displayAddress);
    	}
    }

    $scope.deleteClick = function(user){

    	var query = "delete from addresstable where phone='"+user.phone+"'";
    	if(db!=null){
    		db.transaction(function(txn){
    			txn.executeSql(query,[],function(tx){
    				console.log("Delete Successfully");
    				$rootScope.refreshTable();
    			})
    		});
    	}
    }

    
    function displayAddress(txn) {

        var query = "select * from addresstable";
        var address = [];
        txn.executeSql(query, [], function(tx, result) {

            var count = result.rows.length;
            
            for (var i = 0; i < count; i++) {
                var row = result.rows.item(i);
                console.log(row.firstname + " , " + row.lastname)
                var user = {
                    phone: row.phone,
                    firstname: row.firstname,
                    lastname: row.lastname
                };
               address.push(user)
                
            }

           $rootScope.users = address;
           $scope.$apply();
           
        });
    }
    $scope.editClick = function(user) {
        $rootScope.selectedUser = user;
        $rootScope.oldPhone =user.phone
        $rootScope.showEdit = true;
        $rootScope.showHeader = false;
        $rootScope.showDisplay = false;
    }

})
