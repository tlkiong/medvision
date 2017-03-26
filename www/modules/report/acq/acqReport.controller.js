(function() {
  'use strict';
  
  angular.module('Report')
    .controller('acqReportController', acqReportController);

  acqReportController.$inject = ['commonService', 'reportService'];

  function acqReportController(commonService, reportService) {
    var vm = this;

    /* ======================================== Var ==================================================== */
    vm.misc = {};

    /* ======================================== Services =============================================== */
    var svc = reportService;
    var cmnSvc = commonService;

    /* ======================================== Public Methods ========================================= */

    /* ======================================== Private Methods ======================================== */
    function init() {
        
    }

    init();
  }
})();