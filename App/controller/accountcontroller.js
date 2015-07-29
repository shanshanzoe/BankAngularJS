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
    $rootScope.fromAccount={accountId:1, accountType:'',accountNumber:'',accountBalance:''};
    $rootScope.toAccount={accountId:1, accountType:'',accountNumber:'',accountBalance:''};
    //$rootScope.fromAccount1={};
    //$rootScope.toAccount1={};

    //$rootScope.amount=0;


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
                //$rootScope.fromAccount=userFactory.getFromAccountByAccountType($scope.fromAccount1.accountType);
                //$rootScope.toAccount=userFactory.getToAccountByAccountType($scope.toAccount1.accountType);
                //var theAccount1=userFactory.getFromAccountByAccountType($scope.fromAccount.accountType);
                //var theAccount2=userFactory.getToAccountByAccountType($scope.toAccount.accountType);
                //$rootScope.fromAccount=theAccount1;
                //$rootScope.toAccount=theAccount2;

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

    $scope.toTransferPage=function(){

        $location.path('/transfer');
    }


    $scope.getFromAccountByAccountType=function (){

        var fromAccountType=$scope.fromAccount1.accountType;
        if(fromAccountType!= null || fromAccountType!=undefined){
            alert("fromAccounttype"+fromAccountType);
            $rootScope.fromAccount=userFactory.getFromAccountByAccountType(fromAccountType);
        }
    }

   $scope.getToAccountByAccountType= function(){

        var toAccountType=$scope.toAccount1.accountType;
        if(toAccountType!= null || toAccountType!=undefined){
            $rootScope.toAccount=userFactory.getToAccountByAccountType(toAccountType);

        }
    }

    $scope.makeTransfer=function(){

        $scope.getFromAccountByAccountType();
        $scope.getToAccountByAccountType();

        var fromAccountType=$rootScope.fromAccount.accountType;
        var toAccountType=$rootScope.toAccount.accountType;
        var fromAccountBalance = $rootScope.fromAccount.accountBalance;
        var toAccountBalance = $rootScope.toAccount.accountBalance;
        var amount =document.getElementById("shanshan").value;
        alert("fromaccountbalance  "+fromAccountBalance );

        //if(fromAccountType=="saving"||fromAccountType=="checking") {
        //    if (fromAccountBalance >= amount) {
        //        fromAccountBalance = fromAccountBalance - amount;
        //        toAccountBalance = toAccountBalance -(-amount);
        //        alert("FROMACCOUNT " + fromAccountBalance);
        //        alert("TOACCOUNT   " + toAccountBalance)
        //    } else {
        //        alert("credit is not enough");
        //
        //    }
        //
        //}
        //$location.path('/customerHome');

        if(fromAccountType=="saving"&&toAccountType=="checking"){
            if(fromAccountBalance>=amount){
                fromAccountBalance=fromAccountBalance-amount;
                toAccountBalance=toAccountBalance-(-amount);
                alert("DFASF  "+fromAccountBalance);
                alert("TOACCOUNT   "+toAccountBalance)
            }else{
                alert("credit is not enough");
            }
        }else if (fromAccountType=="checking"&&toAccountType=="saving"){
            if(fromAccountBalance>=amount){
                fromAccountBalance=fromAccountBalance-amount;
                toAccountBalance=toAccountBalance-(-amount);
            }else{
                alert("credit is not enough");
            }

        }else{
            alert("error!");
        }
        $location.path('/customerHome');



    }




    $scope.showTransaction=function(){


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
    });
