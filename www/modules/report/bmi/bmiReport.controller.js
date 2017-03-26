(function() {
  'use strict';
  
  angular.module('Report')
    .controller('bmiReportController', bmiReportController);

  bmiReportController.$inject = ['httpRequestService', 'commonService', 'reportService'];

  function bmiReportController(httpRequestService, commonService, reportService) {
    var vm = this;

    /* ======================================== Var ==================================================== */
    vm.misc = {};

    /* ======================================== Services =============================================== */
    var svc = reportService;
    var cmnSvc = commonService;
    var httpSvc = httpRequestService;

    /* ======================================== Public Methods ========================================= */

    /* ======================================== Private Methods ======================================== */
    function getBmiReport() {
      var dataObj = {
        authToken: 'helloletmeinplease',
        sort: 'TIMESTAMP',
        descending: false,
        // date: The value can be a single date or a time interval formatted using the ISO 8601 format.
      }

      httpSvc.http('bmi_get', undefined, dataObj, undefined, '452')
        .then(function(rs) {
          console.log('bmi: ',rs);
        }, function(err) {
          console.log('bmi err: ',err);
        });
    }

    function init() {
      getBmiReport();
    }

    init();
  }
})();