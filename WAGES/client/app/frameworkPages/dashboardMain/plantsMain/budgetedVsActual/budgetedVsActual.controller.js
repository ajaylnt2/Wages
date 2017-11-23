class BudgetedVsActualController {
  constructor(myService,$rootScope, $scope, auth, $timeout, $location, budgetedActualService) {
    'ngInject';
    this.name = 'budgetedVsActual';
    this.auth = auth;
    this.plotData = [];
    this.myService = myService;
    this.jsonData = [];
    this.$scope = $scope;
    this.myModalFirst = false;
    this.myModalSecond = false;
    this.yearProperties = [];
    this.wagesType = 'elec';
    var d = new Date();
    this.currentYear = d.getFullYear();
    this.budgetedActualService = budgetedActualService;

    var obj = this;
    $scope.$watch(function () {
      return myService.getAnnual(); },
      function (newValue, oldValue) {
          if(newValue)
          {
            obj.filterChart(newValue[0], newValue[1], newValue[2]);
          }
        });
    }

maximize(type)
{
  if(type=='cost')
  {
  this.myModalSecond = !this.myModalSecond;
  }else {
    this.myModalFirst = !this.myModalFirst;
      }

}

  canvasgauge (id,color,endPoint,value,estimatedValue,text) {
new gauge(id,color,endPoint,value,estimatedValue,text);
};
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

    this.budgetedActualService.getData()
      .then(function(data) {
          obj.jsondata = data.data;
          obj.initChart(data, "#456a76", status, obj.jsondata);
          },
        function(data) {
          console.log('data failed.')
        });
  }
  //First Time when Page Load  End

  //On initialization of page Begins
  initChart(data, color, status, jsonData) {
    this.getAnnualDetails(jsonData);
    this.runColumnChart(this.currentYear);
    this.runChartProperties();
  }
  //On initialization of page  End

  runChartProperties()
  {
    this.columnChartProperties.colors = [
      {
        borderColor: '#31B6FD',
        backgroundColor:'#31B6FD',
        fill: true /* this option hide background-color */
      },
      {
        borderColor: '#666666',
         backgroundColor:'#666666',
        fill: true /* this option hide background-color */
      }
    ];

    this.columnChartProperties1.colors = [
      {
        borderColor: '#5BD078',
        backgroundColor:'#5BD078',
        fill: false /* this option hide background-color */
      },
      {
       borderColor: '#666666',
         backgroundColor:'#666666',
        fill: false /* this option hide background-color */
      }
    ];
    this.columnChartProperties.series = ['Budgeted Consumption', 'Actual Consumption'];
    this.columnChartProperties.datasetOverride = [{ yAxisID: 'y-axis-1' }];
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
            position: 'left',
            ticks: {
              userCallback: function(label, index, labels) {
                // when the floored value is the same as the value we have a whole number
                if (Math.floor(label) === label) {
                  return label/100000;
                }
              },
              stepSize: 2000,
            }
          }
        ]
      }
    }
  }
  getAnnualDetails(data) {
   this.years = Object.keys(data);
   this.months = _.union(_.flatten(_.map(data , (e) => _.keys(e))));
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
   var consoledData = {};
   consoledData = {year:this.yearProperties,month:this.monthProperties,day:""}
   this.myService.setNavName(consoledData);
 }
 //Line Chart Begins
 runChart(color, status) {
   this.yearlyData(this.currentYear.toString());
 }
 //Line Chart Ends
  //Line Chart Begins
  runColumnChart(year) {
    this.displayData(year,'All');

  }
  //Line Chart Ends

  //Filtering Begins
  filterChart(year, month, day) {

      this.displayData(year, month);
          this.runChartProperties();
  }
  //Filtering Ends

  //function for Year='All' Begins
    displayData(yearName, monthName) {
      var label = [];
      var data1 = [];
      var data2 = [];
      var data3 = [];
      var data4 = [];
      var monthsDetails = {};
      if (this.jsondata && monthName=='All') {
        var obj = this.jsondata[yearName];
        var x=0
          angular.forEach(obj,function(yval,key){
            monthsDetails[x] = {
              data1: 0,
              data2: 0,
              data3: 0,
              data4: 0
            };
            label.push(key);
              angular.forEach(yval,function(wval){
                monthsDetails[x].data1 += wval.data1;
                monthsDetails[x].data2 += wval.data2;
                monthsDetails[x].data3 += wval.data3;
                monthsDetails[x].data4 += wval.data4;
            });
            data1.push(monthsDetails[x].data1);
            data2.push(monthsDetails[x].data2);
            data3.push(monthsDetails[x].data3);
            data4.push(monthsDetails[x].data4);
            x++;
          });
      }else {
           var obj = this.jsondata[yearName][monthName]
        var x=0
        monthsDetails = {
           data1: 0,
           data2: 0,
           data3: 0,
           data4: 0
         };
         label.push(monthName);
         angular.forEach(obj,function(wval,key){
             monthsDetails.data1 += wval.data1;
             monthsDetails.data2 += wval.data2;
             monthsDetails.data3 += wval.data3;
             monthsDetails.data4 += wval.data4;
         });
         data1.push(monthsDetails.data1);
         data2.push(monthsDetails.data2);
         data3.push(monthsDetails.data3);
         data4.push(monthsDetails.data4);
      }
      var budgetedData = 0;
      var actualData = 0;
      var budgetedCost = 0;
      var actualCost = 0;
      var totalConsumption = 0;
      var totalCost = 0;
      var date = new Date();
      var currentMonth = date.getMonth();
        if(yearName == this.currentYear)
        {
          angular.forEach(data1,function(data,key){
            if(currentMonth>=key)
            {
            budgetedData += data;
            }
              totalConsumption += data;
          });
          angular.forEach(data3,function(data,key){
            if(currentMonth>=key)
            {
            budgetedCost += data;
          }
            totalCost+= data;
          });
        } else {
          angular.forEach(data1,function(data){
            budgetedData += data;
            totalConsumption += data;
          });
          angular.forEach(data3,function(data){
            budgetedCost += data;
            totalCost+= data;
          });
        }

      angular.forEach(data2,function(data){
        actualData += data;
      });

      angular.forEach(data4,function(data){
        actualCost += data;
      });

      this.canvasgauge ('canvas-consumption','#189218',46560,21437,25522,'Tonnes');
      this.canvasgauge ('canvas-cost','#189218',3259,1616,1786,'USD');
  //     this.columnChartProperties = {
  //    labels: label,
  //    data:
  //    [
  //      data1,
  //      data2
  //    ]
  //  }
  //  this.columnChartProperties1 = {
  //    labels: label,
  //    data:
  //    [
  //      data3,
  //      data4
  //    ]
  //  }
     this.columnChartProperties = {
      labels: label,
      data:
      [
        [2967621,3737615,3389637,3471122,3722026,4149415],
       [5228751,4217253,4256375,4577115,3661423,3581638,3933218,3164367,3262215,4149491,3315370,3213272]
      ]
    }

     this.columnChartProperties1 = {
      labels: label,
      data:
      [
        [231488,275346,257689,260463,284764,306392],
        [366013,295208,297946,320398,256300,250715,275325,221506,228355,290464,232076,224929]
      ]
    }
  }

  clickWages(type){
  this.wagesType=type;
  }

  show(line) {
        if (line === 1) {
          this.firstAlert = !this.firstAlert;
          this.secondAlert = !this.secondAlert;
          if (!this.firstAlert)
          this.myModalfirst = true;
          this.myModalsecond=false;
        }
        else if(line === 2){
          this.secondAlert = !this.secondAlert;
          this.firstAlert = !this.firstAlert;
        if (!this.secondAlert)
        this.myModalfirst = false;
        this.myModalsecond = true;
        }
        else{
           this.firstAlert = true;
           this.secondAlert = true;
        }
    }
}

export default BudgetedVsActualController;
