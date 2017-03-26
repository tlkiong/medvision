(function() {
  'use strict';
  
  angular.module('Report')
    .controller('acqReportController', acqReportController);

  acqReportController.$inject = ['httpRequestService', 'commonService', 'reportService'];

  function acqReportController(httpRequestService, commonService, reportService) {
    var vm = this;

    /* ======================================== Var ==================================================== */
    vm.misc = {};

    /* ======================================== Services =============================================== */
    var svc = reportService;
    var cmnSvc = commonService;
    var httpSvc = httpRequestService;

    /* ======================================== Public Methods ========================================= */

    /* ======================================== Private Methods ======================================== */
    function getAcqReport() {
      var dataObj = {
        authToken: 'helloletmeinplease',
        sort: 'TIMESTAMP',
        descending: false,
        // date: The value can be a single date or a time interval formatted using the ISO 8601 format.
      }

      httpSvc.http('acq_get', undefined, dataObj, undefined, '452')
        .then(function(rs) {
          console.log('acq: ',rs);
        }, function(err) {
          console.log('acq err: ',err);
        });
    }

    function init() {
      getAcqReport();
    }

    init();
  }
})();