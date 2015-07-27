/**
 * Created by shanshan on 7/23/15.
 */
var app = angular.module('app',['ngRoute']);
app.config(function ($routeProvider){
    $routeProvider
        .when('/',{controller:'homecontroller',templateUrl:'App/partials/home.html'})
        .when('/about',{controller:'homecontroller',templateUrl:'App/partials/about.html'})
        .when('/login', {controller:'accountcontroller',templateUrl:'App/partials/login.html'})
        .when('/adminhome',{controller:'accountcontroller', templateUrl:'App/partials/adminhome.html'})
        .when('/logout',{controller:'accountcontroller', templateUrl:'App/partials/logout.html'})
        .when('/addnew',{controller:'accountcontroller', templateUrl:'App/partials/register.html'})
        .when('/customerhome',{controller:'accountcontroller', templateUrl:'App/partials/customerhome.html'})
        .when('/customerinfo/:userId',{controller:'accountcontroller', templateUrl:'App/partials/customerinfo.html'})
        .when('/customeraccounts/:userId', {controller:'accountcontroller', templateUrl:'App/partials/customeraccounts.html'})
        .when('/customeraccounts', {controller:'accountcontroller', templateUrl:'App/partials/customeraccounts.html'})
        .when('/transfer/:accountNumber', {controller:'accountcontroller', templateUrl:'App/partials/transfer.html'})
        .otherwise({redirectTo:'/'});


});
