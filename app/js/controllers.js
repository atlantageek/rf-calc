'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.calculator = {};
    $scope.calculator.frequency=100;
    $scope.calculator.which_calc="loss";
    $scope.calculator.loss=101;
    $scope.calculator.distance=102;
    $scope.calculator.which_cable="R59";
       $scope.msg = "nothing";
    $scope.table_lookup = {
     "5": {"R59":0.86,"R6":0.58,"R7":0.47,"R11":0.38},
     "55": {"R59":2.05,"R6":1.60,"R7":1.25,"R11":0.96},
     "211": {"R59":3.80,"R6":3.05,"R7":2.36,"R11":1.90},
     "270": {"R59":4.22,"R6":3.37,"R7":2.68,"R11":2.13},
     "300": {"R59":4.45,"R6":3.55,"R7":2.82,"R11":2.25},
     "330": {"R59":4.66,"R6":3.74,"R7":2.96,"R11":2.35},
     "350": {"R59":4.80,"R6":3.85,"R7":3.05,"R11":2.42},
     "400": {"R59":5.10,"R6":4.15,"R7":3.27,"R11":2.60},
     "450": {"R59":5.40,"R6":4.40,"R7":3.46,"R11":2.75},
     "500": {"R59":5.70,"R6":4.66,"R7":3.67,"R11":2.90},
     "550": {"R59":5.95,"R6":4.90,"R7":3.85,"R11":3.04},
     "600": {"R59":6.20,"R6":5.10,"R7":4.05,"R11":3.18},
     "750": {"R59":6.97,"R6":5.65,"R7":4.47,"R11":3.65},
     "870": {"R59":7.57,"R6":6.11,"R7":4.96,"R11":4.06},
     "1000": {"R59":8.12,"R6":6.55,"R7":5.32,"R11":4.35}
    };
    $scope.calculator.calculate = function() {
       var target = parseFloat($scope.calculator.frequency);
       var below_neighbor = "0";
       var above_neighbor = "1000";
       for (var freq in $scope.table_lookup) {
          var parsed_freq = parseFloat(freq);
          if (target == parseFloat(freq))
          {
             below_neighbor = freq;
             above_neighbor = freq;
          }
         if ((parsed_freq < target) && (parsed_freq > parseFloat(below_neighbor)))
         {
             below_neighbor = freq;
         }
         if ((parsed_freq > target) && (parsed_freq < parseFloat(above_neighbor)))
         {
             above_neighbor = freq;
         }
       }
       var entry_freq = $scope.calculator.frequency;
       if ($scope.calculator.which_calc == "distance")
       {
         $scope.calculator.distance = Math.pow(parseFloat(below_neighbor) / parseFloat(entry_freq), 0.5) / 
           $scope.table_lookup[below_neighbor][$scope.calculator.which_cable] * 100 * parseFloat($scope.calculator.loss);
         $scope.calculator.distance = Math.round($scope.calculator.distance);
     
       }
       else
       {
         var freq_ratio = Math.pow((parseFloat(below_neighbor)/ parseFloat(entry_freq)), 0.5);
         $scope.calculator.loss = ($scope.table_lookup[below_neighbor][$scope.calculator.which_cable] * parseFloat($scope.calculator.distance))/(freq_ratio * 100);
         $scope.calculator.loss = Math.round($scope.calculator.loss);
       }
       $scope.msg = below_neighbor + " <" + $scope.calculator.frequency + "<" + above_neighbor;

      
    }
  });
