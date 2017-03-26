(function() {
  'use strict';
  
  angular.module('Report')
    .controller('bmiReportController', bmiReportController);

  bmiReportController.$inject = ['commonService', 'reportService'];

  function bmiReportController(commonService, reportService) {
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