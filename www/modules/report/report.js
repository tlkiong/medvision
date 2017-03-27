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
          },
          sidemenu: {
            iconName: 'asthma',
            lbl: 'ACQ_REPORT',
            order: 1
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
          },
          sidemenu: {
            iconName: 'bp',
            lbl: 'BP_REPORT',
            order: 2
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
          },
          sidemenu: {
            iconName: 'bmi',
            lbl: 'BMI_REPORT',
            order: 3
          }
        });
    })
})();