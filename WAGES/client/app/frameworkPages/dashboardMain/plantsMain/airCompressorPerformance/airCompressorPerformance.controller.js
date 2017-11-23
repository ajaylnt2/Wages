class AirCompressorPerformanceController {
  constructor($rootScope, $scope, auth, $timeout, $location, myService, performanceService) {
    'ngInject';
    this.name = 'airCompressorPerformance';
    this.auth = auth;
    this.plotData = [];
    this.chartState = '';
    this.jsonData = [];

    this.myModalFirst=false;
    this.myModalSecond=false;
    this.myModalThird=false;
    this.disableDay=true;
    this.chart1 = [];
    this.chart2 = [];
    this.chart3 = [];
    this.commonProperties = [];
    var d = new Date();
    this.currentYear = d.getFullYear();
    this.performanceService = performanceService;
    this.myService = myService;

      var obj = this;
      $scope.$watch(function () {
        return myService.getAnnual(); },
        function (newValue, oldValue) {
          if(newValue){
              obj.filterChart(newValue[0], newValue[1], newValue[2]);

          }

          });

    this.bigNumberProperties1 = {
      decimals: 2,
      value: "557.24k",
    };

    this.bigNumberProperties2 = {
      decimals: 10,
      value:"557.24k",
    };

}
maximize(type)
{
  if(type=='power')
  {
    this.myModalThird = !this.myModalThird;
  }else if(type=='elect') {
    this.myModalSecond = !this.myModalSecond;
  }
  else {
    this.myModalFirst = !this.myModalFirst;
  }
}
runChartProperties()
{
  this.chart1.colors = [
    {
      borderColor: '#456a76',
      fill: false /* this option hide background-color */
    }];
    this.chart2.colors = [
      {
        borderColor: '#ffa100',
        fill: false /* this option hide background-color */
      }
    ];
    this.chart3.colors = [
        {
          borderColor: '#53BCE9',
          fill: false /* this option hide background-color */
        }
      ];
  this.chart1.series = ['Compressed Air FLow'];
  this.chart2.series = ['Electricity Consumption'];
  this.chart3.series = ['Specific Power Consumption'];
  this.commonProperties.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  this.commonProperties.options = {
    //legend: { display: true, position: 'top' },
    bezierCurve: false,
    elements: {
      line: { tension: 0 }
    },
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
}
disabledDaySelect()
{
  if(this.yearProperties.model=="All" || this.monthProperties.model=="All")
  {
    return true;
  }
  else {
    return false;
  }
}
  //First Time when Page Load   Begins
  init(data, color, status) {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.baseYear = (date.getFullYear() - 1);
    this.month = monthNames[date.getMonth()];
    var obj = this;
    this.performanceService.getAirCompressorPerformance()
      .then(function(data) {
          obj.jsondata = data.data;
          obj.initChart(data, "#456a76", status, obj.jsondata);
          },
        function(data) {
          console.log('retrieval failed.')
        });
  }
  //First Time when Page Load  End

  //On initialization of page Begins
  initChart(data, color, status, jsonData) {
     this.getAnnualDetails(jsonData);
    this.runLineChart('#456a76', status);
    this.runChartProperties();
    }
  //On initialization of page  End

  //DropDown Begins
   getAnnualDetails(data) {
    this.years = Object.keys(data);
    this.months = _.union(_.flatten(_.map(data , (e) => _.keys(e))));
    this.years.unshift('All');
    this.months.unshift('All');
    this.yearProperties = {
      placeHolder: 'All Options',
      model: this.currentYear.toString(),
      label: 'Yearly',
      options: this.years,
      onChange: () => {
      },
    };
    this.monthProperties = {
      placeHolder: 'All Options',
      model: 'All',
      label: 'Monthly',
      options:this.months,
      onChange: () => {
      },
    };
    this.dayProperties = {
      placeHolder: 'All Options',
      model: 'All',
      label: 'Daily',
      options:['All'],
      onChange: () => {
      },
    };

    var consoledData = {};
    consoledData = {year:this.yearProperties,month:this.monthProperties,day:this.dayProperties}
    this.myService.setNavName(consoledData);
  }
  //DropDown Ends

  //Line Chart Begins
  runLineChart(color, status) {
    this.yearlyData(this.currentYear.toString());
  }
  //Line Chart Ends

  //Filtering Begins
  filterChart(year, month, day) {
      this.disableDay = this.disabledDaySelect();
      if(year=="All")
      {
        month = "All";
        day = "All";
      }
      if(month == "All")
      {
        day = "All";
      }
      if(year == 'All' && month == 'All' && day == 'All')
      {
        this.yearlyData (year);
      }else if(year != 'All' && month == 'All' && day == 'All')
      {
        this.monthProperties.model="All";
        this.dayProperties.model="All";
        this.yearlyData(year);
      }else if(year != 'All' && month != 'All' && day == 'All')
      {
          this.dayProperties.model="All";
        this.monthlyData(year, month);
      }else if(year != 'All' && month != 'All' && day != 'All')
      {
        this.dailyData(year, month, day);
      }
      else if(year == 'All' && month != 'All' && day != 'All')
      {
        this.yearlyData(year);
      }
      else {
        console.log(year+"-"+month+"-"+day);
      }

    }
  //Filtering Ends
    yearlyData(yearName) {

      var label = [];
      var data1 = [];
      var data2 = [];
      var datapc = [];
      var monthsDetails = {};
      var yearDetails = {};
      if (this.jsondata && yearName=="All") {
        var obj = this.jsondata;
          var x=0
          angular.forEach(obj,function(xval,key){
            yearDetails[x] = {
              data1: 0,
              data2: 0,
              datapc: 0
            };
            label.push(key);
            angular.forEach(xval,function(yval){
              angular.forEach(yval,function(zval){
                angular.forEach(zval,function(wval){
                  yearDetails[x].data1 += wval.data1;
                  yearDetails[x].data2 += wval.data2;
                  yearDetails[x].datapc = yearDetails[x].data2/yearDetails[x].data1 ;
                });
              });
            });
              data1.push(yearDetails[x].data1);
              data2.push(yearDetails[x].data2);
              datapc.push(yearDetails[x].datapc);
            x++;
          });

      }else {
        var obj = this.jsondata[yearName];
        var x=0
          angular.forEach(obj,function(yval,key){
            monthsDetails[x] = {
              data1: 0,
              data2: 0,
              datapc: 0
            };
            label.push(key);
            angular.forEach(yval,function(zval){
              angular.forEach(zval,function(wval){
                monthsDetails[x].data1 += wval.data1;
                monthsDetails[x].data2 += wval.data2;
                monthsDetails[x].datapc = monthsDetails[x].data2/monthsDetails[x].data1 ;
              });
            });
            data1.push(monthsDetails[x].data1);
            data2.push(monthsDetails[x].data2);
            datapc.push(monthsDetails[x].datapc);
            x++;
          });
      }
        this.airFlowProperties = {
          labels: label,
          data:
          [
            data1
          ]
        }
        this.electricityConsumptionProperties = {
          labels: label,
          data:
          [
            data2
          ]
        }
        this.specificConsumptionProperties = {
          labels: label,
          data:
          [
            datapc
          ]
        }
    }

   monthlyData(year, month){
       if (this.jsondata && this.jsondata[year][month])
        {
         var obj = this.jsondata[year][month];
         var data1 = [];
         var data2 = [];
         var datapc = [];
         var labels = [];
         var monthsDetails = {};
         var x=0

            angular.forEach(obj,function(zval,key){
              monthsDetails[x] = {
                data1: 0,
                data2: 0,
                datapc: 0
              };
              labels.push(key);
              angular.forEach(zval,function(wval,key){
                monthsDetails[x].data1 += wval.data1;
                monthsDetails[x].data2 += wval.data2;
                monthsDetails[x].datapc = monthsDetails[x].data2/monthsDetails[x].data1 ;
              });
              data1.push(monthsDetails[x].data1);
              data2.push(monthsDetails[x].data2);
              datapc.push(monthsDetails[x].datapc);
              x++;
            });

        var daylist = Object.keys(obj);
        daylist.unshift('All');
        this.dayProperties.options=daylist;

         this.airFlowProperties = {
           labels: labels,
           data: [
               data1
           ]
         }
         this.electricityConsumptionProperties = {
           labels: labels,
           data: [
               data2
           ]
         }
         this.specificConsumptionProperties = {
           labels: labels,
           data: [
               datapc
           ]
         }
       }
   }
 dailyData(year, month, day){
   var obj = this.jsondata[year][month][day];
   var data1 = [];
   var data2 = [];
   var datapc = [];
   var labels = [];
   var monthsDetails = {};
   var x=0
        angular.forEach(obj,function(wval,key){
        labels.push(key);
        data1.push(wval.data1);
        data2.push(wval.data2);
        datapc.push(wval.data2/wval.data1);
          x++;
        });

                 this.airFlowProperties = {
                   labels: labels,
                   data: [
                       data1
                   ]
                 }
                 this.electricityConsumptionProperties = {
                   labels: labels,
                   data: [
                       data2
                   ]
                 }
                 this.specificConsumptionProperties = {
                   labels: labels,
                   data: [
                       datapc
                   ]
                 }
 }

}

export default AirCompressorPerformanceController;
