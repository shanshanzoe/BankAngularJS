/**
 * Created by shanshan on 7/26/15.
 */
app.controller=('customercontroller',function($scope,$rootScope,$location, $routeParams, userFactory){

    function init(){
        $scope.data=userFactory.getUsers();


    }
    init();



});
