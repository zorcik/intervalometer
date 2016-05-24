angular.module('starter.services', [])

        .factory('Bluetooth', function ($q) {

           var items = [];

           return {
              all: function () {
                 return items;
              },
              refresh: function (chat) {
                 console.log("Refresh service");
                 var deferred = $q.defer();
                 bluetoothSerial.list(function (devices) {
                    var deviceId;

                    items = [];
                    devices.forEach(function (device) {
                       if (device.hasOwnProperty("uuid")) { // TODO https://github.com/don/BluetoothSerial/issues/5
                          deviceId = device.uuid;
                       } else if (device.hasOwnProperty("address")) {
                          deviceId = device.address;
                       } else {
                          deviceId = "ERROR " + JSON.stringify(device);
                       }
                       items.push({'deviceId': device.address, 'name': device.name});
                       deferred.resolve(items);
                    });

                 }, function () {
                    alert("Nie znaleziono urzadzeń");
                    deferred.reject(false);
                 });
                 return deferred.promise;
              },
              connect: function(device) {
                 var deferred = $q.defer();

                 bluetoothSerial.connect(device.deviceId, function() {
                    deferred.resolve(true);
                 }, function() {
                    deferred.reject(false);
                 });

                 return deferred.promise;
              },
              disconnect: function() {
                 var deferred = $q.defer();
                 bluetoothSerial.disconnect(function() {
                    deferred.resolve(true);
                 });
                 return deferred.promise;
              },
              send: function(data) {
                 bluetoothSerial.write(data);
              },
              read: function() {
                 var deferred = $q.defer();
                 bluetoothSerial.read(function(data) {
                    deferred.resolve(data);
                 });
                 return deferred.promise;
              }
           };
        });
