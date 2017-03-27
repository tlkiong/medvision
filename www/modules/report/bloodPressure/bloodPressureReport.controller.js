(function() {
  'use strict';
  
  angular.module('Report')
    .controller('bloodPressureReportController', bloodPressureReportController);

  bloodPressureReportController.$inject = ['httpRequestService', 'commonService', 'reportService'];

  function bloodPressureReportController(httpRequestService, commonService, reportService) {
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
            axisLabel: 'BP Score',
            tickFormat: function (d){
              return d;
            },
            rotateYLabel: true,
            axisLabelDistance: -10
          },
          y2Axis: {   
            tickFormat: function (d){
              return d;
            }
          }
        }
      }
    }

    function getBloodPressureReport() {
      var dataObj = {
        authToken: 'helloletmeinplease',
        sort: 'TIMESTAMP',
        descending: false
      }

      httpSvc.http('bp_get', undefined, dataObj, undefined, '452')
        .then(function(rs) {
          // console.log('bp: ',rs);
          vm.chartData.push({
            key: 'Systolic',
            seriesIndex: 1,
            values: []
          });

          vm.chartData.push({
            key: 'Diastolic',
            seriesIndex: 0,
            values: []
          });
          rs.data.measurement.forEach(function(e) {
            vm.chartData[0].values.push({
              series: 0,
              x: new Date(e.time),
              // Used toFixed(2) here to set the max dp to be 2. If its less, it'll be less
              y: Number(e.systolic.toFixed(2))
            });
            vm.chartData[1].values.push({
              series: 1,
              x: new Date(e.time),
              // Used toFixed(2) here to set the max dp to be 2. If its less, it'll be less
              y: Number(e.diastolic.toFixed(2))
            });
          });
        }, function(err) {
          console.log('bp err: ',err);
        });
    }

    function init() {
      setChart();
      getBloodPressureReport();
    }

    init();
  }
})();