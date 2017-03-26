(function() {
  'use strict';
  
  angular.module('Report')
    .controller('bloodPressureReportController', bloodPressureReportController);

  bloodPressureReportController.$inject = ['commonService', 'reportService'];

  function bloodPressureReportController(commonService, reportService) {
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