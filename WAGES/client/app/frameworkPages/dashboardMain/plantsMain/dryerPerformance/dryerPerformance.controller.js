class DryerPerformanceController {
  constructor($rootScope, $scope, auth, $timeout, $location,myService, performanceService) {
    'ngInject';
    this.name = 'dryerPerformance';
    this.auth = auth;
    this.plotData = [];
    this.jsonData = [];
    this.myModalFirst=false;
    this.myModalSecond=false;
    this.chart1 = [];
    this.chart2 = [];
    this.commonProperties = [];
    var d = new Date();
    this.currentYear = d.getFullYear();
    this.performanceService = performanceService;
    this.myService = myService;

    var obj = this;
    $scope.$watch(function () {
      return myService.getAnnual(); },
      function (newValue, oldValue) {
        if(newValue)
        {
          obj.filterChart(newValue[0], newValue[1], newValue[2])
        }

        });

    this.bigNumberProperties1 = {
      decimals: 2,
      value: "557.24k",
    };

    this.bigNumberProperties2 = {
      decimals: 10,
      value:"$557.24k",
    };

  }
  maximize(type)
  {
    if(type=='total')
    {
    this.myModalSecond = !this.myModalSecond;
    }else {
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
    this.performanceService.getDryerPerformance()
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
      model: 'Jan',
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
    // this.yearlyData("All");
    this.monthlyData(this.currentYear.toString(),'Jan');
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
        this.consumptionEfficiencyProperties = {
          labels: label,
          data:
          [
            data1
          ]
        }
        this.condenceEfficiencyProperties = {
          labels: label,
          data:
          [
            data2
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

         this.consumptionEfficiencyProperties = {
           labels: labels,
           data: [
               data1
           ]
         }
         this.condenceEfficiencyProperties = {
           labels: labels,
           data: [
               data2
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
          x++;
        });

                 this.consumptionEfficiencyProperties = {
                   labels: labels,
                   data: [
                       data1
                   ]
                 }
                 this.condenceEfficiencyProperties = {
                   labels: labels,
                   data: [
                       data2
                   ]
                 }

 }

  water(){

      document.getElementById("water").classList.add('button-focus');
      document.getElementById("water").classList.remove('btn-primary-default');

      document.getElementById("air").classList.remove('button-focus');
      document.getElementById("air").classList.add('btn-primary-default');

      document.getElementById("gas").classList.remove('button-focus');
      document.getElementById("gas").classList.add('btn-primary-default');

      document.getElementById("electricity").classList.remove('button-focus');
      document.getElementById("electricity").classList.add('btn-primary-default');

      document.getElementById("steam").classList.remove('button-focus');
      document.getElementById("steam").classList.add('btn-primary-default');

  }

  air(){

      document.getElementById("air").classList.add('button-focus');
      document.getElementById("air").classList.remove('btn-primary-default');

      document.getElementById("water").classList.remove('button-focus');
      document.getElementById("water").classList.add('btn-primary-default');

      document.getElementById("gas").classList.remove('button-focus');
      document.getElementById("gas").classList.add('btn-primary-default');

      document.getElementById("electricity").classList.remove('button-focus');
      document.getElementById("electricity").classList.add('btn-primary-default');

      document.getElementById("steam").classList.remove('button-focus');
      document.getElementById("steam").classList.add('btn-primary-default');

  }

  gas(){

      document.getElementById("gas").classList.add('button-focus');
      document.getElementById("gas").classList.remove('btn-primary-default');

      document.getElementById("water").classList.remove('button-focus');
      document.getElementById("water").classList.add('btn-primary-default');

      document.getElementById("air").classList.remove('button-focus');
      document.getElementById("air").classList.add('btn-primary-default');

      document.getElementById("electricity").classList.remove('button-focus');
      document.getElementById("electricity").classList.add('btn-primary-default');

      document.getElementById("steam").classList.remove('button-focus');
      document.getElementById("steam").classList.add('btn-primary-default');


  }

  electricity(){

      document.getElementById("electricity").classList.add('button-focus');
      document.getElementById("electricity").classList.remove('btn-primary-default');

      document.getElementById("water").classList.remove('button-focus');
      document.getElementById("water").classList.add('btn-primary-default');

      document.getElementById("air").classList.remove('button-focus');
      document.getElementById("air").classList.add('btn-primary-default');

      document.getElementById("gas").classList.remove('button-focus');
      document.getElementById("gas").classList.add('btn-primary-default');

      document.getElementById("steam").classList.remove('button-focus');
      document.getElementById("steam").classList.add('btn-primary-default');

  }

  steam(){

      document.getElementById("steam").classList.add('button-focus');
      document.getElementById("steam").classList.remove('btn-primary-default');

      document.getElementById("water").classList.remove('button-focus');
      document.getElementById("water").classList.add('btn-primary-default');

      document.getElementById("air").classList.remove('button-focus');
      document.getElementById("air").classList.add('btn-primary-default');

      document.getElementById("gas").classList.remove('button-focus');
      document.getElementById("gas").classList.add('btn-primary-default');

      document.getElementById("electricity").classList.remove('button-focus');
      document.getElementById("electricity").classList.add('btn-primary-default');

  }

show(line) {
      if (line === 1) {
        this.firstAlert = !this.firstAlert;
        this.secondAlert = !this.secondAlert;
        this.thirdAlert = !this.thirdAlert;
        if (!this.firstAlert)
        this.myModalfirst = true;
        this.myModalsecond=false;
        this.myModalthird=false;
      }
      else if(line === 2){
        this.secondAlert = !this.secondAlert;
         this.firstAlert = !this.firstAlert;
           this.thirdAlert = !this.thirdAlert;
      if (!this.secondAlert)
      this.myModalfirst = false;
      this.myModalsecond = true;
        this.myModalthird=false;
      }
      else if(line === 3){
        this.secondAlert = !this.secondAlert;
         this.firstAlert = !this.firstAlert;
           this.thirdAlert = !this.thirdAlert;
      if (!this.thirdAlert)
        this.myModalfirst = false;
        this.myModalsecond = false;
        this.myModalthird=true;
      }
      else{
         this.firstAlert = true;
         this.secondAlert = true;
        this.thirdAlert = true;
      }
    }
}

export default DryerPerformanceController;
