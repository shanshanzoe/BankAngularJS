/**
 * Created by shanshan on 7/25/15.
 */
app.factory('userFactory', function(){
    var obj={};
    var data=[{userId:1, username:'admin', password:'admin',firstname:'shanshan',lastname:'gao',email:'gao@gmail.com',mobile:'12345'}];
    var accounts=[];
    var myAccounts=[];
    var myTransactions=[];

    obj.addUser=function(user){
        user.userId=data.length+1;
        data.push(user);
    }

    obj.getUsers=function(){
        return data;
    }

    obj.validateLogin=function(username, password){
        var isValid=false;

       for(var i= 0; i<data.length; i++){
            if(data[i].username==username&&data[i].password==password){
                isValid=true;
                break;
            }
        }

        return isValid;
    }

    obj.getUserById=function(id){
        var user=null;
        for(var i=0; i<data.length; i++){
            if(data[i].userId==id){
                user = data[i];
                break;
            }

        }
        return user;

    }

    obj.getUserByUsername=function(username){
        var user=null;
        for (var i= 0; i<data.length; i++){
            if(data[i].username==username){
                user=data[i];
                break;
            }

        }
        return user;

    }

    /*
     /////////////////
     hjy
     ///////////////////
     */
    obj.getAccountsByAccountsId=function(accountId){
        var myAccount=null;
        /*
         /////////////////
         hjy
         ///////////////////
         */
        var tempAccounts=[];  // temp variable, please DO NOT use global variable
        for (var i= 0; i<accounts.length; i++){
            if(accounts[i].accountId==accountId){
                myAccount=accounts[i];
                tempAccounts.push(myAccount);
            }
        }

        return tempAccounts;
    }


    /*
     /////////////////
     hjy
     ///////////////////
     */
 /*   obj.getFromAccountByAccountType=function(fromAccountType){
        var myFromAccount=null;
        for (var i= 0; i<myAccounts.length;i++){
            if([i].accountType==fromAccountType){
                myFromAccount=myAccounts[i];

            }
        }
        return myFromAccount;

    }


    obj.getToAccountByAccountType=function(toAccountType){
        var myToAccount=null;
        for (var i= 0; i<myAccounts.length;i++){
            if(myAccounts[i].accountType==toAccountType){
                myToAccount=myAccounts[i];
            }
        }
        return myToAccount;
    }*/

    obj.getTransactions= function () {

    }


    obj.saveAccount=function(account){
        accounts.push(account);

        //alert("saving"+ accounts[0].accountNumber);
        //alert("checking"+accounts[accounts.length-1].accountNumber);
    }


    obj.getAccounts=function(){
        return accounts;
    }
    

    return obj;




});

