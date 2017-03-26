(function() {
  'use strict';

  angular.module('Root')
    .controller('rootController', rootController);

  rootController.$inject = ['commonService', 'rootService'];

  function rootController(commonService, rootService) {
    var vm = this;
    vm.goToPage = goToPage;
    vm.toggleSideMenu = toggleSideMenu;

    /* ======================================== Var ==================================================== */
    vm.misc = {
      isSideMenuOpen: false
    };
    vm.sideMenuItem = [];

    /* ======================================== Services =============================================== */
    var svc = rootService;
    var cmnSvc = commonService;

    /* ======================================== Public Methods ========================================= */
    function toggleSideMenu() {
      vm.misc.isSideMenuOpen = !vm.misc.isSideMenuOpen;
    }

    function goToPage(stateName) {
      activateSideMenuItem(stateName);
      cmnSvc.goToPage(stateName);
    }

    /* ======================================== Private Methods ======================================== */
    function activateSideMenuItem(stateName) {
      vm.sideMenuItem.forEach(function(e) {
        if(e.stateName === stateName) {
          e.isActive = true;
        } else {
          e.isActive = false;
        }
      })
    }

    function setSideMenu() {
      cmnSvc.getAllStates().forEach(function(ele){
        if(cmnSvc.isObjPresent(ele) && cmnSvc.isObjPresent(ele.sidemenu)) {
          // NOTE: the first URL in ele is '^'. It might cause error as there is no check for that here (its not needed)
          vm.sideMenuItem.push({
            url: ele.url,
            iconName: ele.sidemenu.iconName,
            lbl: ele.sidemenu.lbl,
            stateName: ele.name,
            isActive: false,
            order: ele.sidemenu.order
          });
        }
      });
      vm.sideMenuItem.sort(function(a, b){
        return a.order - b.order;
      });

      activateSideMenuItem(cmnSvc.getCurrentState().name);
    }

    function init() {
      setSideMenu();
    }

    init();
  }
})();