(function() {
  'use strict';

  angular.module('app', [
      'Core',
      'Directives',
      'Root',
      'Report'
  ])
  .config(function($translateProvider, translationHelperProvider, $locationProvider, $stateProvider, $urlRouterProvider, $compileProvider) {
    $urlRouterProvider.otherwise('report-acq');
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//);
    // Uncomment the below line when deploying. This will remove all errors that is shown in console.log
    // $compileProvider.debugInfoEnabled(false);
    // 
    // use the HTML5 History API
    // Also known as remove the '#' from the URL
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
    /* ==================================== Translation ==================================== */
    // --- To use the below translation provider, add as param in the config's fn: translationHelperProvider
    // ---      The dependency used here is 'angular-translate'
    var translationSvc = translationHelperProvider.$get();
    
    $translateProvider.translations('en', translationSvc.getTranslationType('en'));
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize'); // Refer http://angular-translate.github.io/docs/#/guide/19_security for security on Angular-translate
    /* ==================================== End: Translation ==================================== */
  }).run(function(sessionService, commonService,$state, $rootScope) {
  	var cmnSvc = commonService;
    var sessionSvc = sessionService;

    $rootScope.$on('$stateChangeStart', function(evnt, toState, toParams, fromState, fromParams) {
      if(cmnSvc.isObjPresent(toState.role) && cmnSvc.isObjPresent(sessionSvc.userData) && cmnSvc.isObjPresent(sessionSvc.userData.role)) {
        // This is for ALC
      }
    });

    function hasNoAccess(roleList) {
      if(cmnSvc.getObjType(roleList) === 'array') {
        for(var i=0,j=roleList.length; i<j; i++) {
          if(roleList[i].toLowerCase() == sessionSvc.userData.role.toLowerCase()) {
            return false;
          }
        }
        return true;
      } else if (cmnSvc.getObjType(roleList) === 'string') {
        if(roleList.toLowerCase() == sessionSvc.userData.role.toLowerCase()) {
          return false;
        } else {
          return true;
        }
      }
    }
  });
})();