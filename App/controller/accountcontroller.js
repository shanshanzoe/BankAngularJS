/**
 * Created by shanshan on 7/25/15.
 */
app.controller('accountController', function ($scope, $rootScope, $location, $routeParams, userFactory) {
        $rootScope.loggedIn = false;
        $rootScope.loggedUser = null;
        $rootScope.user = null;
        $rootScope.userAccount = {accountId: 1, accountType: '', accountNumber: '', accountBalance: ''};
        $rootScope.isViewing = false;
        $rootScope.isEditing = false;
        $rootScope.theUser = null;
        $rootScope.myAccounts = [{accountId: 1, accountType: '', accountNumber: '', accountBalance: ''}];

        /*
        /////////////////
         hjy
        ///////////////////
         */
        //$scope.fromType='';
        //$scope.toType ='';
        $scope.transferMoney = 0;
        var fromAccount = null;
        var toAccount = null;



        //$rootScope.fromAccount={accountId:1, accountType:'',accountNumber:'',accountBalance:''};
        //$rootScope.toAccount={accountId:1, accountType:'',accountNumber:'',accountBalance:''};
        //$rootScope.fromAccount1={};
        //$rootScope.toAccount1={};

        //$rootScope.amount=0;


        function init() {

            if (sessionStorage['username'] == null || sessionStorage['username'] == undefined) {
                $rootScope.loggedIn = false;
                $rootScope.loggedUser = null;
            } else {
                $rootScope.loggedIn = true;
                $rootScope.loggedUser = sessionStorage['username'];


                if (sessionStorage['username'] == 'admin') {
                    $scope.allUsers = userFactory.getUsers();
                    $scope.allAccounts = userFactory.getAccounts();
                } else {


                    var myUsername = sessionStorage['username'];
                    var myUser = userFactory.getUserByUsername(myUsername);
                    $rootScope.theUser = myUser;
                    $rootScope.myAccounts = userFactory.getAccountsByAccountsId(myUser.userId);

                }
            }
        }

        init();

        $scope.addUser = function () {
            userFactory.addUser($scope.newUser);
            alert("adduser: " + $scope.newUser.email);
            $location.path('/adminHome');

        }


        $scope.loginUser = function () {


            var isValid = false;
            isValid = userFactory.validateLogin($scope.loginModel.username, $scope.loginModel.password);

            if (isValid) {
                sessionStorage['username'] = $scope.loginModel.username;

                if ($scope.loginModel.username == 'admin') {
                    $location.path('/adminHome');
                } else {

                    //sessionStorage['user']=myUser;
                    $location.path('/customerHome');

                }


            } else {
                $location.path('/login');
            }

        }

        $scope.logoutUser = function () {
            if (confirm("Are you sure want to logout?")) {
                sessionStorage.clear();
                $rootScope.loggedIn = false;
                $rootScope.loggedUser = null;
                $location.path('/');

            }
        }

        $scope.closeForm = function () {
            $rootScope.loggedIn = false;
            $rootScope.loggUser = null;
            $location.path('/');

        }

        $scope.registerUser = function () {
            $location.path('/addNew');
        }

        $scope.closeRegister = function () {
            $location.path('/adminHome');
        }

        function getUserById() {
            var userId = $routeParams.userId;
            if (userId != null || userId != undefined) {
                $rootScope.user = userFactory.getUserById(userId);


            }
        }

        getUserById();

        $scope.toTransferPage = function () {

            $location.path('/transfer');
        }


        $scope.getFromAccountByAccountType = function () {

            var fromAccountType = $scope.fromAccount1.accountType;
            if (fromAccountType != null || fromAccountType != undefined) {
                alert("fromAccounttype" + fromAccountType);
                $rootScope.fromAccount = userFactory.getFromAccountByAccountType(fromAccountType);
            }
        }

        $scope.getToAccountByAccountType = function () {

            var toAccountType = $scope.toAccount1.accountType;
            if (toAccountType != null || toAccountType != undefined) {
                $rootScope.toAccount = userFactory.getToAccountByAccountType(toAccountType);

            }
        }

        /*
         /////////////////
         hjy
         ///////////////////
         */
        $scope.makeTransfer = function () {

            console.log("makeTransfer_ myAccounts.length :"+$rootScope.myAccounts.length);
            console.log("makeTransfer_ fromType :"+$scope.fromType);
            console.log("makeTransfer_ toType :"+$scope.toType);
            console.log("makeTransfer_ transferMoney:"+$scope.transferMoney);

            var from=$scope.fromType;
            var to=$scope.toType;
            var money=$scope.transferMoney;


            for (var i = 0; i < $rootScope.myAccounts.length; i++) {
                if (from == $rootScope.myAccounts[i].accountType) {
                    fromAccount = $rootScope.myAccounts[i];
                }

                if (to == $rootScope.myAccounts[i].accountType) {
                    toAccount = $rootScope.myAccounts[i];
                }

            }

            if(fromAccount==null){
                alert("could not find from Account!");
                $location.path('/customerHome');
                return;
            }

            if(toAccount==null){
                alert("could not find to Account!");
                $location.path('/customerHome');
                return;
            }

            if(Number(fromAccount.accountBalance)<Number(money)){
                alert("transfer Money overflow!");
                $location.path('/customerHome');
                return;
            }

            fromAccount.accountBalance=Number(fromAccount.accountBalance)-Number(money);
            toAccount.accountBalance=Number(toAccount.accountBalance)+Number(money);


            $location.path('/customerHome');


        }


        $scope.showTransaction = function () {


        }


        $scope.editUser = function () {

            var userId = $routeParams.userId;
            if (userId != null || userId != undefined) {
                var user = userFactory.getUserById(userId);
                user = $rootScope.user;
            }
            $location.path('/adminHome');

        }

        $scope.deleteUser = function (userId) {
            alert(userId);
            if (userId != null || userId != undefined) {
                var user = userFactory.getUserById(userId);
                var users = userFactory.getUsers();
                users.splice(userId - 1, 1);
            }
            $location.path('/adminHome');
        }

        $scope.saveAccount = function () {
            var userId = $routeParams.userId;
            $rootScope.userAccount.accountId = userId;

            userFactory.saveAccount($rootScope.userAccount);

            $location.path('/adminHome');

        }
    }
);
