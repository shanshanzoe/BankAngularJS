/**
 * Created by shanshan on 7/23/15.
 */
var app = angular.module('app',['ngRoute']);
app.config(function ($routeProvider){
    $routeProvider
        .when('/',{controller:'homeController',templateUrl:'App/partials/home.html'})
        .when('/about',{controller:'homeController',templateUrl:'App/partials/about.html'})
        .when('/login', {controller:'accountController',templateUrl:'App/partials/login.html'})
        .when('/adminHome',{controller:'accountController', templateUrl:'App/partials/adminHome.html'})
        .when('/logout',{controller:'accountController', templateUrl:'App/partials/logout.html'})
        .when('/addNew',{controller:'accountController', templateUrl:'App/partials/register.html'})
        .when('/customerHome',{controller:'accountController', templateUrl:'App/partials/customerHome.html'})
        .when('/customerInfo/:userId',{controller:'accountController', templateUrl:'App/partials/customerInfo.html'})
        .when('/customerAccounts/:userId', {controller:'accountController', templateUrl:'App/partials/customerAccounts.html'})
        .when('/customerAccounts', {controller:'accountController', templateUrl:'App/partials/customerAccounts.html'})
        .when('/transfer/:accountNumber', {controller:'accountController', templateUrl:'App/partials/transfer.html'})
        .otherwise({redirectTo:'/'});


});
