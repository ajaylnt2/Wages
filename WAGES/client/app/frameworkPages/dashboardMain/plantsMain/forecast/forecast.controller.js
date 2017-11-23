class forecastAnalysisController {


  constructor($rootScope, $scope, $timeout, $location, $http, myService) {
    'ngInject';
    this.name = 'forecastAnalysis';
    this.plotData = [];
    this.$http = $http;
    this.measureddl = '';
    this.estimateRate = '';
    this.chart = '';
    this.year = '';
    this.wagesType='elec';
    this.jsonData = [];
    this.myService = myService;
    $scope.selectedNode = "";
    this.myModalFirst = false;
    this.myModalSecond = false;

    this.yearProperties = {
      placeHolder: 'All Options',
      model: '2017',
      label: 'Yearly',
      options: ['2017'],
      onChange: () => {
      },
    };
    this.monthProperties = {
      placeHolder: 'All Options',
      model: 'NA',
      label: 'Monthly',
      options:['NA'],
      onChange: () => {
      },
    };
    this.dayProperties = {
      placeHolder: 'All Options',
      model: 'NA',
      label: 'Daily',
      options:['NA'],
      onChange: () => {
      },
    };

    var consoledData = {};
    consoledData = {year:this.yearProperties,month:this.monthProperties,day:this.dayProperties}
    this.myService.setNavName(consoledData);

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
  clickWages(type){
  this.wagesType=type;
  }
  //-------------------------  First Time when Page Load   START-------------//
  init(data, color, year, measure, month) {
    this.year = "All";

    this.chartState = 'Water';

    var obj = this;
    obj.initChart(data, color, year, measure, month)

  }
  //------------------------------First Time when Page Load   END--------------//

  initChart(data, color, year, measure, month, ) {

    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var date = new Date();
    this.date = monthNames[date.getMonth()];
    month = this.date;
   this.runLineChart(color, year, measure, month);

  }
  //Shows the data on the Chart based on Selected drop down month//
  filterChart(color, year, month) {

    if (year == undefined) {

      if ((month == undefined && this.jsondata == undefined)) {
        this.jsondata = [];
      }

    }

    if (this.jsondata || this.jsondata[year])

    {
      var obj = this.jsondata[year];

      var months = [];
      var monthsDetails = {};
      var dataLine = [];
      var dataBar = [];
      var labels = [];
      var datafc = [];
      var dataFCcost = [];

      if (this.chart.data != null) {
        this.chart.destroy();
      }

      if (month == undefined || year == "All")

      {
        if (year == undefined) {
          var dataBar = [86.9, 115.2];
          var dataLine = [7.9, 15.2];
          var labels = ["Jan-2017","Feb-2017","Mar-2017","Apr-2017","May-2017","Jun-2017","Jul-2017","Aug-2017","Sept-2017","Oct-2017","Nov-2017","Dec-2017"];
          var datafc = [];
          var dataFCcost = [];
        {
            var dataBar = [2967621,3737615,3389637,3471122,3722026,4149415];
            var datafc = [[], [],[],[],[],4149415
              ,3821208,4393381,4091217,4663390,4361226,4933399];
            var dataLine = [231488,275346,257689,260463,284764,306392];
            var dataFCcost = [[], [], [],[],[],306392,311324,324842,338359,351877,365394,378912
              ]
          }
        }
      }
      //-----------Code For High Chart-------------Begins-------------//
      Highcharts.chart('container', {
        xAxis: {

          categories: labels
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return this.value + 'K';
            }
          },
        },
        plotOptions: {
          series: {

            marker: {
              enabled: false
            }
          }
        },
        series: [{
          showInLegend: false,
          name: 'Consumption',
          color: '#33B7FD',
          data: dataBar
        }
          , {
          showInLegend: false,
          name: 'Consumption',
          dashStyle: 'dot',
          color: '#638E6D',
          data: datafc

        }
        ]
      });
      Highcharts.chart('container1', {
        xAxis: {

          categories: labels
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },

        yAxis: {
          title: {
            text: ''
          },
          labels: {
            formatter: function () {
              return '$' + this.value + 'K';
            }
          },
        },

        plotOptions: {
          series: {
           marker: {
              enabled: false
            }
          },
        },
        series: [{
          showInLegend: false,
          name: 'Cost',
          color: '#44BDFD',
          data: dataLine
        }, {
          showInLegend: false,
          name: 'Cost',
          dashStyle: 'dot',
          color: '#606060',
          data: dataFCcost


        }]
      });
      //-----------Code For High Chart-------------Ends-------------//
    }

  }



}

export default forecastAnalysisController;
