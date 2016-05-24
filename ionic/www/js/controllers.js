angular.module('starter.controllers', [])

        .controller('discoverController', function ($scope, Bluetooth, $location, $ionicLoading) {

           $scope.items = [];

           $scope.refreshList = function () {
              // $ionicLoading.show({
              //    template: 'Loading...'
              // });
              var promise = Bluetooth.refresh();
              promise.then(function (items) {
                 //   $ionicLoading.hide();
                 $scope.items = items;
              });
           };

           $scope.connect = function (item) {
              $ionicLoading.show({
                 template: '<ion-spinner></ion-spinner> Loading...'
              });
              Bluetooth.connect(item).then(function () {
                 $location.path('/interval');
                 $ionicLoading.hide();
              }, function () {
                 alert("Brak połączenia");
                 $ionicLoading.hide();
              });
           };
        })
        .controller('intervalController', function ($scope, Bluetooth, $ionicLoading, $location, $interval) {

           $scope.data = '';

           $scope.ledOn = function () {
              Bluetooth.send('1');
           };

           $scope.ledOff = function () {
              Bluetooth.send('0');
           };

           $scope.disconnect = function () {
              Bluetooth.disconnect();
              $location.path('/interval');
           };

           bluetoothSerial.subscribe('\n', function(data) {
              $scope.data = data;
              $scope.$apply();
           });

           /*
           stop = $interval(function () {
              console.log("Czytam");
              Bluetooth.read(function(data) {
                 console.log("Przeczytalem: "+data);
                 if (data != "") {
                    $scope.data = data;
                 }
              });
           }, 1000);
           */
        });
