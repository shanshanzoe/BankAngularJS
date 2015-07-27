/**
 * Created by shanshan on 7/25/15.
 */
app.controller('accountController', function($scope, $rootScope,$location,$routeParams, userFactory) {
    $rootScope.loggedIn=false;
    $rootScope.loggedUser=null;
    $rootScope.user=null;
    $rootScope.userAccount={accountId:1, accountType:'', accountNumber:'', accountBalance:''};
    $rootScope.isViewing=false;
    $rootScope.isEditing=false;
    $rootScope.theUser=null;
    $rootScope.myAccounts=[{accountId:1, accountType:'',accountNumber:'',accountBalance:''}];
    $rootScope.myAccount={accountId:1, accountType:'',accountNumber:'',accountBalance:''};


    function init(){

        if(sessionStorage['username']==null||sessionStorage['username']==undefined){
            $rootScope.loggedIn=false;
            $rootScope.loggedUser=null;
        }else{
            $rootScope.loggedIn=true;
            $rootScope.loggedUser=sessionStorage['username'];


            if(sessionStorage['username']=='admin'){
                $scope.allUsers=userFactory.getUsers();
                $scope.allAccounts=userFactory.getAccounts();
            }else{


                var myUsername= sessionStorage['username'];
                var myUser=userFactory.getUserByUsername(myUsername);
                $rootScope.theUser=myUser;
                $rootScope.myAccounts=userFactory.getAccountsByAccountsId(myUser.userId);



            }
        }
    }
    init();

    $scope.addUser=function(){
        userFactory.addUser($scope.newUser);
        alert("adduser: "+$scope.newUser.email);
        $location.path('/adminHome');

    }



    $scope.loginUser=function(){


        var isValid=false;
        isValid=userFactory.validateLogin($scope.loginModel.username, $scope.loginModel.password);

        if(isValid){
            sessionStorage['username']=$scope.loginModel.username;

            if($scope.loginModel.username=='admin'){
                $location.path('/adminHome');
            }else{

                    //sessionStorage['user']=myUser;
                $location.path('/customerHome');

            }


        }else{
            $location.path('/login');
        }

    }

    $scope.logoutUser=function(){
        if(confirm("Are you sure want to logout?")) {
            sessionStorage.clear();
            $rootScope.loggedIn=false;
            $rootScope.loggedUser=null;
            $location.path('/');

        }
    }

    $scope.closeForm=function(){
        $rootScope.loggedIn=false;
        $rootScope.loggUser=null;
        $location.path('/');

    }

    $scope.registerUser=function(){
        $location.path('/addNew');
    }

    $scope.closeRegister=function(){
        $location.path('/adminHome');
    }

    function getUserById(){
        var userId=$routeParams.userId;
        if(userId !=null||userId!=undefined) {
            $rootScope.user= userFactory.getUserById(userId);


        }
    }
    getUserById();


    function getAccountByAccountNumber(){
        var accountNumber=$routeParams.accountNumber;
        if(accountNumber!=null||accountNumber!=undefined){
            $rootScope.myAccount=userFactory.getAccountByAccountNumber(accountNumber);
        }

    }
    getAccountByAccountNumber();



    $scope.makeTransfer=function(){



    }



    $scope.editUser=function(){

        var userId=$routeParams.userId;
        if(userId !=null||userId!=undefined){
            var user=userFactory.getUserById(userId);
                user=$rootScope.user;
        }
        $location.path('/adminHome');

    }

    $scope.deleteUser=function(userId){
        alert(userId);
        if(userId!=null||userId!=undefined){
            var user=userFactory.getUserById(userId);
            var users=userFactory.getUsers();
            users.splice(userId-1,1);
        }
        $location.path('/adminHome');
    }

    $scope.saveAccount=function(){
        var userId= $routeParams.userId;
        $rootScope.userAccount.accountId=userId;

        userFactory.saveAccount($rootScope.userAccount);

        $location.path('/adminHome');

    }



    //$scope.toTransferpage=function(){
    //
    //    $location.path('/transfer');
    //}
    });
