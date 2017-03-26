(function () {
  'use strict';
    
  angular.module('Report', [])
    .config(function ($stateProvider) {
      $stateProvider
        .state('root.acqReport', {
          url: '/report-acq',
          views: {
            'subMain': {
              templateUrl: './modules/report/acq/acqReport.html',
              controller: 'acqReportController',
              controllerAs: 'vm'
            }
          }
        })
        .state('root.bloodPressureReport', {
          url: '/report-blood-pressure',
          views: {
            'subMain': {
              templateUrl: './modules/report/bloodPressure/bloodPressureReport.html',
              controller: 'bloodPressureReportController',
              controllerAs: 'vm'
            }
          }
        })
        .state('root.bmiReport', {
          url: '/report-bmi',
          views: {
            'subMain': {
              templateUrl: './modules/report/bmi/bmiReport.html',
              controller: 'bmiReportController',
              controllerAs: 'vm'
            }
          }
        });
    })
})();