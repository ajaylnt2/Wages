class consumptionController {

  constructor($rootScope, myService, $scope, $timeout, $location, $http, consumptionService) {
    'ngInject';
    this.name = 'consumption';
    this.plotData = [];
    this.$http = $http;
    this.measureddl = '';
    this.estimateRate = '';
    this.chart = '';
    this.year = '';
    this.wagesType='elec';
    this.consumptionService = consumptionService;
    this.myService = myService;
    this.myModalFirst = false;
    var obj = this;
    $scope.$watch(function () {
      return myService.getAnnual(); },
      function (newValue, oldValue) {
        if(newValue)
        {
          obj.filterChart(newValue[0], newValue[1], newValue[2]);
        }

        });


    var d = new Date();
    this.currentYear = d.getFullYear();
    this.bigNumberProperties1 = {
      decimals: 2,
      value: "284.24",
      title: 'USD'
    };

    this.bigNumberProperties = {
      decimals: 10,
      value: "4006.24",
      title: 'kWh'
    };

  }

  maximize()
  {
      this.myModalFirst = !this.myModalFirst;
  }
  clickWages(type){
  this.wagesType=type;
  }
  //-------------------------  First Time when Page Load   START-------------//
  init(data) {
    let currentYear = new Date().getFullYear();
    this.year = currentYear;
    var obj = this;
    this.consumptionService.getData().then(function (datas) {
      obj.jsondata = datas.data;
      obj.initChart( data, obj.jsondata)
    });
  }
  //------------------------------First Time when Page Load   END--------------//

  //------Initialized the values for Forcast  and Budget on First page load  Begin-----//
  initChart(data,jsonData ) {
    this.getAnnualDetails(jsonData);
    // this.runChart(this.currentYear);
    // this.runChartProperties();

    const CHART = document.getElementById("pareto").getContext('2d');
         var myCHART = new Chart(CHART, {
           type: 'bar',
           data: {
             datasets: [{
               label: 'Estimated Cost',
               yAxisID: 'Cost',
               data: [10995.04, 9961.28, 9068.64, 7798.56, 9052.96, 11851.84, 9732.80, 10392.48, 7984.48, 9615.20, 7789.60, 9582.72, 7568.96, 13975.36, 11707.36, 9701.44, 8947.68, 7278.88, 10951.36, 11126.08, 9570.40, 10614.24, 9322.88, 7843.36, 6651.68, 8974.56, 8673.28, 8790.88, 9556.96, 9565.92],
               fill: false,
               lineTension: 0,
               backgroundColor: "black",
               borderColor: "#4484D3",
               borderCapStyle: 'butt',
               borderDash: [],
               borderDashOffset: 0.0,
               borderJoinStyle: 'miter',
               pointRadius: 0,
               // Changes this dataset to become a line
               type: 'line'
             },{
               label: "Consumption",
               yAxisID: 'Consumption',
               data: [157072.00, 142304.00, 129552.00, 111408.00, 129328.00, 169312.00, 139040.00, 148464.00, 114064.00, 137360.00, 111280.00, 136896.00, 108128.00, 199648.00, 167248.00, 138592.00, 127824.00, 103984.00, 156448.00, 158944.00, 136720.00, 151632.00, 133184.00, 112048.00, 95024.00, 128208.00, 123904.00, 125584.00, 136528.00, 136656.00],
               fill: false,
               lineTension: 0.4,
               backgroundColor: "#53BCE9",
               borderColor: "#53BCE9",
               borderCapStyle: 'butt',
               borderDash: [],
               borderDashOffset: 0.0,
               borderJoinStyle: 'miter',
               pointBackgroundColor: "#fff",
               pointRadius: 0
             }
             ],
             labels: ["6/1/2017", "6/2/2017", "6/3/2017", "6/4/2017", "6/5/2017", "6/6/2017", "6/7/2017", "6/8/2017", "6/9/2017", "6/10/2017", "6/11/2017", "6/12/2017",
               "6/13/2017", "6/14/2017", "6/15/2017", "6/16/2017", "6/17/2017", "6/18/2017", "6/19/2017", "6/20/2017", "6/21/2017", "6/22/2017", "6/23/2017", "6/24/2017",
               "6/25/2017", "6/26/2017", "6/27/2017", "6/28/2017", "6/29/2017", "6/30/2017"],
           },
           options: {
             scales: {
               yAxes: [{
                 id: 'Consumption',
                 type: 'linear',
                 position: 'left',
                 ticks: {
                   beginAtZero: true,
                   userCallback: function (label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                       return label / 1000000 + ' M';
                     }
                   },
                   stepSize: 100000,
                 }
               },
               {
                 id: 'Cost',
                 type: 'linear',
                 position: 'right',
                 ticks: {
                   beginAtZero: false,
                   userCallback: function (label, index, labels) {
                     // when the floored value is the same as the value we have a whole number
                     if (Math.floor(label) === label) {
                       return label / 1000 + ' K';
                     }
                   },
                   stepSize: 2000,
                 }
               }],
               xAxes: [{
                 // Change here
                 barThickness: 20
               }]
             }
           }
         });



  }
  getAnnualDetails(data) {
    this.years = Object.keys(data);
    this.months = _.union(_.flatten(_.map(data , (e) => _.keys(e))));
    this.months.unshift('All');
        // this.years.unshift('All');
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
      model: 'Jun',
      label: 'Monthly',
      options:['Jun'],
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
  runChartProperties()
  {
    this.columnChartProperties.colors = [
      {
        borderColor: '#666666',

      },
      {
        borderColor: '#31B6FD',
        backgroundColor:'#31B6FD',
        fill: true /* this option hide background-color */
      }
    ];

    this.columnChartProperties.series = ['Budgeted Consumption', 'Actual Consumption'];
    this.columnChartProperties.options = {
      legend: { display: true, position: 'top' },
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
    }

  this.columnChartProperties.datasetOverride = [

    {
      label: "Estimated Cost",
      borderWidth: 3,
      type: 'line'
    },
     {
       label: "Consumption",
       borderWidth: 1,
       type: 'bar'
     }
   ];
  }

  //Line Chart Begins
  runChart(year) {
    this.yearlyData(this.currentYear.toString());
  }

  //Filtering Begins
  filterChart(year, month, day) {


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
  this.runChartProperties();

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
            data2: 0
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
            data2: 0
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
        this.columnChartProperties = {
        labels: label,
        data:
        [
          data2,data1
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
               data2: 0
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

       this.columnChartProperties = {
       labels: labels,
       data:
       [
         data2,data1
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

       this.columnChartProperties = {
       labels: labels,
       data:
       [
         data2,data1
       ]
     }
}


}

export default consumptionController;
