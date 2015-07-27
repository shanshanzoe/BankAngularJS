/**
 * Created by shanshan on 7/25/15.
 */
app.factory('userFactory', function(){
    var obj={};
    var data=[{userid:1, username:'admin', password:'admin',firstname:'shanshan',lastname:'gao',email:'gao@gmail.com',mobile:'12345'}];
    var accounts=[];

    obj.addUser=function(user){
        user.userid=data.length+1;
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
            if(data[i].userid==id){
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

    obj.getAccountsByAccountsid=function(accountid){
        var myAccounts=[];
        var myAccount=null;
        for (var i= 0; i<accounts.length; i++){
            if(accounts[i].accountid==accountid){
                myAccount=accounts[i];
                myAccounts.push(myAccount);
            }
        }
        return myAccounts;
    }

    obj.getAccountByAccountNumber=function(accountNumber){
        var myAccount=null;
        for (var i=0; i<accounts.length; i++){
            if(accounts[i].accountnumber==accountNumber){
                myAccount=accounts[i];
            }
        }
        return myAccount;
    }


    obj.saveAccount=function(account){
        accounts.push(account);
        //alert("saving"+ accounts[0].accountnumber);
        //alert("checking"+accounts[accounts.length-1].accountnumber);
    }


    obj.getAccounts=function(){
        return accounts;
    }
    

    return obj;




});

