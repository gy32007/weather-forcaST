var app = angular.module('weatherApp', []);

app.controller('MainController', function($scope, $http) {
  $scope.unit = 'C';
  $scope.favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  $scope.searchCity = function() {
    if (!$scope.city) {
      $scope.errorMessage = "Please enter a city name.";
      return;
    }
    $scope.errorMessage = "";
    var apiKey = "10d8d992be11bf234ca793155e198082"; 
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + $scope.city + "&appid=" + apiKey + "&units=metric";
    var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + $scope.city + "&appid=" + apiKey + "&units=metric";

    $http.get(urlCurrent).then(function(response) {
      $scope.currentWeather = response.data;
      $scope.lastUpdated = new Date();
    }, function() {
      $scope.errorMessage = "City not found or API error.";
    });

    $http.get(urlForecast).then(function(response) {
      $scope.forecast = response.data;
    }, function() {
      $scope.errorMessage = "Forecast data unavailable.";
    });
  };

  $scope.convertTemp = function(temp) {
    return $scope.unit === 'C' ? Math.round(temp) : Math.round((temp * 9/5) + 32);
  };

  $scope.toggleUnit = function() {
    $scope.unit = ($scope.unit === 'C') ? 'F' : 'C';
  };

  $scope.toggleFavorite = function(city) {
    var index = $scope.favorites.indexOf(city);
    if (index === -1) $scope.favorites.push(city);
    else $scope.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify($scope.favorites));
  };
});
