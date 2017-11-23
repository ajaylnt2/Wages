function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
class productionController {
  constructor(productionService, myService, $rootScope, $scope, auth, $timeout,  $location, ngDialog) {
      'ngInject';
        this.name = 'plantsData';
        this.runLineChart();
        this.productionService = productionService;
        this.runBigNumbers();
        var d = new Date();
        this.currentYear = d.getFullYear();
        this.myService = myService;
        this.myModalFirst = false;
        this.myModalSecond = false;

        var obj = this;
        $scope.$watch(function () {
          return myService.getAnnual(); },
          function (newValue, oldValue) {
              if(newValue){
                obj.filterChart(newValue[0], newValue[1], newValue[2]);
              }
            });

    }
    maximize(type)
    {
      if(type=='rolling')
      {
      this.myModalSecond = !this.myModalSecond;
      }else {
        this.myModalFirst = !this.myModalFirst;
          }
    }
    runBigNumbers() {
      this.bigNumberProperties1 = {
        decimals: 10,
        value: -1.2
      };
      this.mediumNumberProperties1 = {
        decimals: 10,
        value: 2016
      };
      this.bigNumberProperties2 = {
        decimals: 10,
        value: -0.11,
      };
    }

canvasgauge (id,color,endPoint,value,estimatedValue,text) {
  new gauge(id,color,endPoint,value,estimatedValue,text);
};
  //------Initialized the values for moonGauge  -----//
  init(data, status) {
    var obj = this;
    this.productionService.getData()
      .then(function(data) {
          obj.jsondata = data;
          obj.initChart(status, obj.jsondata);
          },
        function(data) {
          console.log('data failed.')
        });
  }
  initChart( status, jsonData) {
    this.getAnnualDetails(jsonData);
    this.runChart(this.currentYear);
    this.runChartProperties();
  }
  runChartProperties()
  {
    this.chartProperties.series = ['Consumption (kWh)', 'Electricity Demand'];
    this.chartProperties.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    this.chartProperties.options = {
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
            position: 'left',
            ticks: {
              userCallback: function(label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                         return label/10000 + ' k';
                     }
                 },
              stepSize: 20000,
            }
          }
        ]
      }
    }

    this.chartProperties.colors = [
      {
        borderColor: '#00008B',
        backgroundColor:'#bbf5ff',
        fill: false /* this option hide background-color */
      },
      {
        borderColor: '#dc143c',
        backgroundColor:'#bbf5ff',
        fill: false /* this option hide background-color */
      }
    ];

  }
  //Line Chart Begins
  runChart(data) {
    this.yearlyData(this.currentYear.toString());
  }
  //Line Chart Ends
  getAnnualDetails(data) {
   this.years = Object.keys(data);
   this.months = _.union(_.flatten(_.map(data , (e) => _.keys(e))));
  //  this.years.unshift('All');
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
     model: 'Jul',
     label: 'Monthly',
     options:['Jul'],
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
  //Filtering Begins
  filterChart(year, month, day) {

    console.log(year);
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
      this.runChartProperties()
    }
  //Filtering Ends

  yearlyData(yearName) {

    var label = [];
    var data1 = [];
    var data2 = [];
  var monthsDetails = {};
    var yearDetails = {};
    if (this.jsondata && yearName=="All") {
      var obj = this.jsondata;
        var x=0
        angular.forEach(obj,function(xval,key){
          yearDetails[x] = {
            data1: 0,
            data2: 0,
          };
          label.push(key);
          angular.forEach(xval,function(yval){
            angular.forEach(yval,function(zval){
              angular.forEach(zval,function(wval){
                yearDetails[x].data1 += wval.data1;
                yearDetails[x].data2 += wval.data2;
            });
            });
          });
            data1.push(yearDetails[x].data1);
            data2.push(yearDetails[x].data2);
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
          });
          });
          data1.push(monthsDetails[x].data1);
          data2.push(monthsDetails[x].data2);
          x++;
        });
    }
      this.chartProperties = {
        labels: label,
        data:
        [
          data1,data2
        ]
      }

  }

 monthlyData(year, month){
     if (this.jsondata && this.jsondata[year][month])
      {
       var obj = this.jsondata[year][month];
       var data1 = [];
       var data2 = [];
       var labels = [];
       var monthsDetails = {};
       var x=0

          angular.forEach(obj,function(zval,key){
            monthsDetails[x] = {
              data1: 0,
              data2: 0,
          };
            labels.push(key);
            angular.forEach(zval,function(wval,key){
              monthsDetails[x].data1 += wval.data1;
              monthsDetails[x].data2 += wval.data2;
            });
            data1.push(monthsDetails[x].data1);
            data2.push(monthsDetails[x].data2);
          x++;
          });

      var daylist = Object.keys(obj);
      daylist.unshift('All');
      this.dayProperties.options=daylist;

      this.chartProperties = {
        labels: labels,
        data:
        [
          data1,data2
        ]
      }

     }
 }
dailyData(year, month, day){
 var obj = this.jsondata[year][month][day];
 var data1 = [];
 var data2 = [];
 var labels = [];
 var monthsDetails = {};
 var x=0
      angular.forEach(obj,function(wval,key){
      labels.push(key);
      data1.push(wval.data1);
      data2.push(wval.data2);
      x++;
      });

      this.chartProperties = {
        labels: labels,
        data:
        [
          data1,data2
        ]
      }
}

  //DropDown Ends
  runLineChart(color, status){

     if(status == 'daily'){

       this.lineChartProperties = {
           labels: ["7/1/2017", "7/2/2017", "7/3/2017", "7/4/2017", "7/5/2017", "7/6/2017", "7/7/2017", "7/8/2017", "7/9/2017", "7/10/2017", "7/11/2017", "7/12/2017", "7/13/2017" , "7/14/2017" , "7/15/2017" , "7/16/2017" , "7/17/2017" , "7/18/2017"
           , "7/19/2017" , "7/20/2017" , "7/21/2017" , "7/22/2017" , "7/23/2017" , "7/24/2017" , "7/25/2017" , "7/26/2017", "7/27/2017" ],
           data:
             [
               [125280, 120176, 121520, 119152,120128, 122816, 131792,114000, 109616, 146720, 157232, 163568,158304,146656,133168,118304,149408,146960,157952,149184,138208,116480,109680,133104,135200,139232,39808]
             ]

         }
       }
       else if(status == 'monthly'){
         this.lineChartProperties1 = {
         labels: ["Jan 2017", "Feb 2017", "Mar 2017", "Apr 2017","May 2017","Jun 2017"],
         data:
           [
              [6.13, -10.68, -4.94,-4.38,-7.54,2.00]
           ],
           options: { elements: { point: { radius: 0 } } }
         }

this.lineChartProperties1.series = ['Performance %'];
   this.lineChartProperties1.options = {
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
           position: 'left',
           ticks: {
             stepSize: 5,
           }
         }
       ]
     }
   }
  this.lineChartProperties1.colors = [
     {
       borderColor: '#00008B',
       backgroundColor:'#bbf5ff',
       fill: false /* this option hide background-color */
     }
   ];

       }
       else{
         this.lineChartProperties = {
           labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
           data:
             [
               [40, 55, 56, 81, 80, 59, 65]
             ],

         }
       }

       this.lineChartProperties.series = ['Consumption (kWh)', 'YTD Actual'];
   this.lineChartProperties.datasetOverride = [{ yAxisID: 'y-axis-1' }];
   this.lineChartProperties.options = {
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
           position: 'left',
           ticks: {
             userCallback: function(label, index, labels) {
                    // when the floored value is the same as the value we have a whole number
                    if (Math.floor(label) === label) {
                        return label/1000 + ' K';
                    }
                },
             stepSize: 50000,
           }
         }
       ]
     }
   }

   this.lineChartProperties.colors = [
     {
       borderColor: '#00008B',
       backgroundColor:'#bbf5ff',
       fill: false /* this option hide background-color */
     }
   ];
   }
}
export default productionController;
