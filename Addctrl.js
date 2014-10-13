addressApp.controller("AddCtrl", function($scope, $rootScope) {
    var db = $rootScope.db;
    $scope.user = {
        firstname: "",
        lastname: "",
        phone: ""
    };


    $scope.addPerson = function() {
        var user = $scope.user;

        if (user.firstname != "" && user.lastname != "" && user.phone != "") {
            db.transaction(insertAddressRecord);
        }
    }

    function insertAddressRecord(txn) {
        var sql = "insert into addresstable values(?,?,?)";
        var user = $scope.user;
        txn.executeSql(sql, [user.phone, user.firstname, user.lastname], function() {
                console.log("Successfully inserted");
                $rootScope.refreshTable();
                $scope.user = {
                    firstname: "",
                    lastname: "",
                    phone: ""
                };
            },
            function(tx, err) {
                console.log(err);
            })
    }

    $scope.cancel = function() {
        $scope.user = {
            firstname: "",
            lastname: "",
            phone: ""
        }
        $rootScope.showAdd = false;
        $rootScope.showHeader = true;
        $rootScope.showDisplay = true;
    }
});
