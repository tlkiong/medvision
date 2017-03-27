(function() {
  'use strict';
  
  angular.module('Report')
    .controller('acqReportController', acqReportController);

  acqReportController.$inject = ['httpRequestService', 'commonService', 'reportService'];

  function acqReportController(httpRequestService, commonService, reportService) {
    var vm = this;

    /* ======================================== Var ==================================================== */
    vm.misc = {};
    vm.chartOpt = {};
    vm.chartData = [];

    /* ======================================== Services =============================================== */
    var svc = reportService;
    var cmnSvc = commonService;
    var httpSvc = httpRequestService;

    /* ======================================== Public Methods ========================================= */

    /* ======================================== Private Methods ======================================== */
    function setChart() {
      vm.chartOpt = {   
        chart: {   
          type: 'lineWithFocusChart',
          height: 350,
          margin: {
            top: 20,
            right: 20,
            bottom: 60,
            left: 60
          },
          duration: 500,
          useInteractiveGuideline: true,
          xAxis: {   
            axisLabel: 'Date',
            tickFormat: function (d) {
              return d3.time.format('%b %d')( new Date(d) );
            }
          },
          x2Axis: {   
            tickFormat: function (d){
              return d3.time.format('%b %d')( new Date(d) );
            }
          },
          xScale: d3.time.scale.utc(),
          yAxis: {   
            axisLabel: 'ACQ Score',
            tickFormat: function (d){
              return d3.format(',.2f')(d);
            },
            rotateYLabel: true,
            axisLabelDistance: -10
          },
          y2Axis: {   
            tickFormat: function (d){
              return d3.format(',.2f')(d);
            }
          }
        }
      }
    }

    function getAcqReport() {
      var dataObj = {
        authToken: 'helloletmeinplease',
        sort: 'TIMESTAMP',
        descending: false
      }

      httpSvc.http('acq_get', undefined, dataObj, undefined, '452')
        .then(function(rs) {
          // console.log('acq: ',rs);
          vm.chartData.push({
            key: 'ACQ Score',
            seriesIndex: 0,
            values: []
          });
          rs.data.measurement.forEach(function(e) {
            vm.chartData[0].values.push({
              series: 0,
              x: new Date(e.time),
              y: e.acqScore
            })
          });
        }, function(err) {
          console.log('acq err: ',err);
        });
    }

    function init() {
      setChart();
      getAcqReport();
    }

    init();
  }
})();