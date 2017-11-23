
class RightbarController {
constructor(myService,auth,$location,$timeout,store,$scope) {
  'ngInject';
    this.name = 'rightbar';
    this.$location = $location;
    this.myService = myService;
      this.plants = {
        placeHolder: 'All Options',
        model: 'Plant 1',
        label: 'Yearly',
        options:['Plant 1'],
        onChange: () => {
        },
      };

      this.yearProperties=[];
      this.monthProperties=[];
      this.dayProperties=[];
      this.yearProperties.model="NA";
      this.monthProperties.model="NA";
      this.dayProperties.model="NA";
      this.yearProperties.options=["NA"];
      this.monthProperties.options=["NA"];
      this.dayProperties.options=["NA"];
      this.runBigNumbers();
      var obj = this;
      $scope.$watch(function () {
        return myService.getNavName(); },
        function (newValue, oldValue) {
          if(newValue)
          {
            obj.yearProperties=newValue.year;
            obj.monthProperties=newValue.month;
            obj.dayProperties = newValue.day;
          }
          });

      this.labels =
        [
          {
            shown:true,
            label: 'Total',
            selected: true,
            artists: [
              {
                shown:true,
                artist: 'Plant 1',
                selected: true,
                departments:[
                  {artist: 'Dept1', selected: true},
                  {artist: 'Dept2', selected: true},
                ]
              }
            ]
          }
          // {
          //   shown:true,
          //   label: 'Plant1',
          //   selected: true,
          //   name: [
          //     {name: 'Dept1', selected: true},
          //     {name: 'Dept2', selected: true},
          //     {name: 'Dept3', selected: true},
          //     {name: 'Dept4', selected: true},
          //     {name: 'Dept5', selected: true},
          //   ]
          // }
        ];
    }
    getChecked(type){
      this.recursiveChecked=[];
      this.pushThese(this.labels,type);
      console.log(this.recursiveChecked);
        }
    pushThese(ar,type){
      console.log(type);
    var obj = this;
    angular.forEach(ar,function(e){
      if(type=='parent')
      {
        if(e.selected) obj.recursiveChecked.push(e);
        if(e.artists) obj.pushThese(e.artists,type);
        if(e.artist && e.departments.artist) obj.pushThese(e.artist,type);
      }else if(type=='child')
      {
        angular.forEach(e.artists,function(f){
              if(f.selected) obj.recursiveChecked.push(e);
              if(f.artist && f.departments.artist) obj.pushThese(f.artist,type);
        });
      }else {
        {

          angular.forEach(e.artists.departments,function(g){
                if(g.selected) obj.recursiveChecked.push(e);
          });
        }
      }

    });
    }
    clicker(label,state){
      if(state=='parent')
      {
        label.artists.forEach(function(e){
            e.selected = label.selected;
            e.departments.forEach(function(f){
              f.selected = label.selected;
            });
          });
      }
      else {
        label.departments.forEach(function(e){
          e.selected = label.selected;
        });
      }

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
    filterChart(year, month, day) {
  this.disableDay = this.disabledDaySelect();
  if(month=='All')
  {
    this.monthProperties.model="All";
  }
  var annual = [];
  annual = [year,month,day]
     this.myService.setAnnual(annual);
    }
  runBigNumbers() {
    this.bigNumberProperties1 = {
      decimals: 10,
      value: -0.14
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
  //For Static Data specific consumption change Ends


}

export default RightbarController;
