/**
 * Created by shanshan on 7/25/15.
 */
app.controller('accountcontroller', function($scope, $rootScope,$location,$routeParams, userFactory) {
    $rootScope.loggedIn=false;
    $rootScope.loggedUser=null;
    $rootScope.user=null;
    $rootScope.userAccount={accountid:1, accounttype:'', accountnumber:'', accountbalance:''};
    $rootScope.isViewing=false;
    $rootScope.isEditing=false;
    $rootScope.theUser=null;
    $rootScope.myAccounts=[{accountid:1, accounttype:'',accountnumber:'',accountbalance:''}];
    $rootScope.myAccount={accountid:1, accounttype:'',accountnumber:'',accountbalance:''};


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
                $rootScope.myAccounts=userFactory.getAccountsByAccountsid(myUser.userid);



            }
        }
    }
    init();

    $scope.addUser=function(){
        userFactory.addUser($scope.newUser);
        alert("adduser: "+$scope.newUser.email);
        $location.path('/adminhome');

    }



    $scope.loginUser=function(){


        var isValid=false;
        isValid=userFactory.validateLogin($scope.loginModel.username, $scope.loginModel.password);

        if(isValid){
            sessionStorage['username']=$scope.loginModel.username;

            if($scope.loginModel.username=='admin'){
                $location.path('/adminhome');
            }else{

                    //sessionStorage['user']=myUser;
                $location.path('/customerhome');

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
        $location.path('/addnew');
    }

    $scope.closeRegister=function(){
        $location.path('/adminhome');
    }

    function getUserById(){
        var userid=$routeParams.userId;
        if(userid !=null||userid!=undefined) {
            $rootScope.user= userFactory.getUserById(userid);


        }
    }
    getUserById();


    function getAccountByAccountNumber(){
        var accountnumber=$routeParams.accountNumber;
        if(accountnumber!=null||accountnumber!=undefined){
            $rootScope.myAccount=userFactory.getAccountByAccountNumber(accountnumber);
        }
        //alert("myacccounttype:  "+$rootScope.myAccount.accounttype);
    }
    getAccountByAccountNumber();



    $scope.makeTransfer=function(){



    }



    $scope.editUser=function(){

        var userid=$routeParams.userId;
        if(userid !=null||userid!=undefined){
            var user=userFactory.getUserById(userid);
                user=$rootScope.user;
        }
        $location.path('/adminhome');

    }

    $scope.deleteUser=function(userid){
        alert(userid);
        if(userid!=null||userid!=undefined){
            var user=userFactory.getUserById(userid);
            var users=userFactory.getUsers();
            users.splice(userid-1,1);
        }
        $location.path('/adminhome');
    }

    $scope.saveAccount=function(){
        var userid= $routeParams.userId;
        $rootScope.userAccount.accountid=userid;

        userFactory.saveAccount($rootScope.userAccount);

        $location.path('/adminhome');

    }



    //$scope.toTransferpage=function(){
    //
    //    $location.path('/transfer');
    //}
    });
