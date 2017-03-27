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
    /* Random Data Generator (took from nvd3.org) */
    function generateData() {
        return stream_layers(3,10+Math.random()*200,.1).map(function(data, i) {
            return {
                key: 'Stream' + i,
                values: data
            };
        });
    }

    /* Inspired by Lee Byron's test data generator. */
    function stream_layers(n, m, o) {
        if (arguments.length < 3) o = 0;
        function bump(a) {
            var x = 1 / (.1 + Math.random()),
                y = 2 * Math.random() - .5,
                z = 10 / (.1 + Math.random());
            for (var i = 0; i < m; i++) {
                var w = (i / m - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        return d3.range(n).map(function() {
            var a = [], i;
            for (i = 0; i < m; i++) a[i] = o + o * Math.random();
            for (i = 0; i < 5; i++) bump(a);
            return a.map(stream_index);
        });
    }

    function stream_index(d, i) {
        return {x: i, y: Math.max(0, d)};
    }

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
        descending: false,
        // date: The value can be a single date or a time interval formatted using the ISO 8601 format.
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
          // vm.chartData = generateData();
          // console.log('vm.chartData: ',vm.chartData);
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