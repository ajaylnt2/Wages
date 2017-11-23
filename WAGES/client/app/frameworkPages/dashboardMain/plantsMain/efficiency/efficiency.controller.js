
class EfficiencyController {
  //Constructor called
  constructor(auth, $timeout, $location, $http,myService, efficiencyService,$scope) {
    'ngInject';
    this.name = 'efficiency';
    this.myService = myService;
    this.auth = auth;
    this.plotData = [];
    this.$http = $http;
    this.chartState = '';
    this.jsonData = [];

    this.myModalFirst=false;
    this.myModalSecond=false;
    this.wagesType="water";
    this.chart1 = [];
    this.chart2 = [];
    this.commonProperties = [];
    var d = new Date();
    this.currentYear = d.getFullYear();
    this.efficiencyService = efficiencyService;
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
      decimals: 10,
      value: -0.14
    };

  }

  maximize(type)
  {
    if(type=='percent')
    {
    this.myModalSecond = !this.myModalSecond;
    }else {
      this.myModalFirst = !this.myModalFirst;
        }
  }
  clickWages(type){
  // this.wagesType=type;
  }

  runChartProperties()
{
  this.chart1.colors = [{
    borderColor: '#FDB45C',
        fill: false /* this option hide background-color */
    },
{
        borderColor: '#000088',
       fill: false /* this option hide background-color */
    }];
this.chart2.colors = [
      {
        borderColor: '#000088',
        fill: false /* this option hide background-color */
      }
    ];

  this.chart1.series = ['YTD Base','YTD Actual'];
  this.chart2.series = ['Specific Consumption Change(%)'];
   this.commonProperties.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  this.commonProperties.options = {
    // legend: { display: true, position: 'right', usePointStyle: true },
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


  //First Time when Page Load   Begins
  init(data, color, status) {
            var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          var date = new Date();
          this.currentYear = date.getFullYear();
          this.baseYear = (date.getFullYear() - 1);
          this.month = monthNames[date.getMonth()];
          var obj = this;
          this.efficiencyService.getData().then(function (datas) {
            obj.jsondata = datas.data;
            obj.initChart(data, color, status,obj.jsondata);
          }, function(error) {
                      console.log(error);
                    }
    );
  }
  //First Time when Page Load  End


  //On initialization of page Begins
  initChart(data, color, status,jsonData) {

    this.getAnnualDetails(jsonData);
    this.chartState = data;
    this.runLineChart('#456a76', status);
    this.runChartProperties();
  }
  //On initialization of page  End

    //DropDown Begins
    getAnnualDetails(data) {
          this.months = _.union(_.flatten(_.map(data , (e) => _.keys(e))));
          this.months.unshift('All');
          this.monthProperties = {
            placeHolder: 'All Options',
            model: 'All',
            label: 'Monthly',
            options:this.months,
            onChange: () => {
            },
          };
          var consoledData = {};
          consoledData = {year:"",month:this.monthProperties,day:""}
          this.myService.setNavName(consoledData);
  }
  //DropDown Ends

  //Line Chart Begins
  runLineChart(color, status) {
  this.displayData('All','All');
  }
  //Line Chart Ends

  //Filtering Begins
  filterChart(year, month, day) {

      this.displayData(year, month);
      this.runChartProperties();
  }
  //Filtering Ends

   //function for Year='All' Begins
    displayData(yearName,monthName) {
        var label = [];
        var currentLabel = [];
        var data1 = [];
        var data2 = [];
        var yearDetails = {};
        var obj = this.jsondata;
        var currentYear = this.currentYear.toString();
        if (this.jsondata && monthName=="All")
        {
            label = _.union(_.flatten(_.map(obj, (e) => _.keys(e))));
          var x=0
          var currentMonthsDetails = [];
          angular.forEach(obj,function(yval,key){
            var monthsDetails = [];
            if(key==currentYear)
            {
              angular.forEach(yval,function(xval,key){
                currentMonthsDetails.push(xval[0].data2);
                currentLabel.push(key);
              });
              data2.push(currentMonthsDetails);
            }
            angular.forEach(yval,function(xval,key){
              monthsDetails.push(xval[0].data1);
            });
            data1.push(monthsDetails);
            x++;
          });

        }else {
          var x=0
              var currentMonthsDetails = [];
                label.push(monthName);
            angular.forEach(obj,function(yval,key){
            var monthsDetails = [];
            if(key==currentYear)
            {
              angular.forEach(yval,function(xval,key){
                if(key == monthName)
                {
                  currentMonthsDetails.push(xval[0].data2);
                  currentLabel.push(key);
                }

              });
              data2.push(currentMonthsDetails);
            }
              angular.forEach(yval,function(xval,key){
                if(key == monthName)
                {
                    monthsDetails.push(xval[0].data1);
                }

            });
            data1.push(monthsDetails);
            x++;
        });

        }
         this.dataProperties = {
           labels: label,
          data:data1

        }
        this.dataProperties2 = {
             labels: currentLabel,
          data:data2
        }
    }
  //function for Year='All' Ends

  }


export default EfficiencyController;
