(function() {
  'use strict';
  
  angular.module('Report')
    .controller('bloodPressureReportController', bloodPressureReportController);

  bloodPressureReportController.$inject = ['httpRequestService', 'commonService', 'reportService'];

  function bloodPressureReportController(httpRequestService, commonService, reportService) {
    var vm = this;

    /* ======================================== Var ==================================================== */
    vm.misc = {};

    /* ======================================== Services =============================================== */
    var svc = reportService;
    var cmnSvc = commonService;
    var httpSvc = httpRequestService;

    /* ======================================== Public Methods ========================================= */

    /* ======================================== Private Methods ======================================== */
    function getBloodPressureReport() {
      var dataObj = {
        authToken: 'helloletmeinplease',
        sort: 'TIMESTAMP',
        descending: false,
        // date: The value can be a single date or a time interval formatted using the ISO 8601 format.
      }

      httpSvc.http('bp_get', undefined, dataObj, undefined, '452')
        .then(function(rs) {
          console.log('bp: ',rs);
        }, function(err) {
          console.log('bp err: ',err);
        });
    }

    function init() {
      getBloodPressureReport();
    }

    init();
  }
})();