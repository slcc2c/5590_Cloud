// 'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.weatherList = new Array();
        $scope.mostRecentWeather;
        $scope.getWeather = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            if (placeEntered != null && placeEntered != "") {
                document.getElementById('div_WeatherList').style.display = 'none';
                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("api.openweathermap.org/data/2.5/weather?zip="+
                    placeEntered+
                    ",us&APPID=6c27a80d3623c516e8b1a6ee3444dcd3");

                handler.success(function (data) {

                    if (data != null && data.response != null && data.response.weather != undefined && data.response.weather != null) {
                        // Tie an array named "venueList" to the scope which is an array of objects.
                        // Each object should have key value pairs where the keys are "name", "id" , "location" and values are their corresponding values from the response
                        alert(data)
                    }

                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }

    });
