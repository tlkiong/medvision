(function() {
  'use strict';
  
  angular.module('Report')
    .controller('bmiReportController', bmiReportController);

  bmiReportController.$inject = ['httpRequestService', 'commonService', 'reportService'];

  function bmiReportController(httpRequestService, commonService, reportService) {
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
            axisLabel: 'BMI Values',
            tickFormat: function (d, t){
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

    function getBmiReport() {
      var dataObj = {
        authToken: 'helloletmeinplease',
        sort: 'TIMESTAMP',
        descending: false
      }

      httpSvc.http('bmi_get', undefined, dataObj, undefined, '452')
        .then(function(rs) {
          // console.log('bmi: ',rs);
          vm.chartData.push({
            key: 'BMI Value',
            seriesIndex: 0,
            values: []
          });
          vm.chartData.push({
            key: 'Weight',
            seriesIndex: 1,
            values: []
          });
          vm.chartData.push({
            key: 'Height',
            seriesIndex: 2,
            values: []
          });

          var chartDataBmiUnit = '';
          var chartDataWeightUnit = '';
          var chartDataHeightUnit = '';

          rs.data.measurement.forEach(function(e) {
            if(!cmnSvc.isObjPresent(chartDataBmiUnit)) {
              chartDataBmiUnit = e.bmiUnit;
            } else if (!cmnSvc.isObjPresent(chartDataWeightUnit)) {
              chartDataWeightUnit = e.weightUnit;
            } else if (!cmnSvc.isObjPresent(chartDataHeightUnit)) {
              chartDataHeightUnit = e.heightUnit;
            }
            
            vm.chartData[0].values.push({
              series: 0,
              x: new Date(e.time),
              // Used toFixed(2) here to set the max dp to be 2. If its less, it'll be less
              y: Number(e.bmi.toFixed(2))
            });
            
            vm.chartData[1].values.push({
              series: 1,
              x: new Date(e.time),
              // Used toFixed(2) here to set the max dp to be 2. If its less, it'll be less
              y: Number(e.weight.toFixed(2))
            });
            
            vm.chartData[2].values.push({
              series: 2,
              x: new Date(e.time),
              // Used toFixed(2) here to set the max dp to be 2. If its less, it'll be less
              y: Number(e.height.toFixed(2))
            })
          });

          vm.chartData[0].key += ' (' + chartDataBmiUnit +')';
          vm.chartData[1].key += ' (' + chartDataWeightUnit +')';
          vm.chartData[2].key += ' (' + chartDataHeightUnit +')';
        }, function(err) {
          console.log('bmi err: ',err);
        });
    }

    function init() {
      setChart();
      getBmiReport();
    }

    init();
  }
})();