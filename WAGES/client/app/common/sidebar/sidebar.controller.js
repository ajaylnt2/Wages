
class SidebarController {
constructor(auth,$location,$timeout,store,$rootScope,$scope, sharedService) {
  'ngInject';
    this.name = 'sidebar';

    this.sharedService = sharedService;
    this.$location = $location;
    this.plants = {
        placeHolder: 'All Options',
        model: 'Plant 1',
        label: 'Yearly',
        options:['Plant 1','Plant 2','Plant 3','Plant 4'],
        onChange: () => {
        },
      };
    $timeout(function () {
      if(angular.element("#subMenu").hasClass('active'))
        {
        angular.element("#department").addClass('in');
        }
      },5);
      this.isActive = function (viewLocation) {
        var str = $location.path();
        var location = [];
        var location = str.split("/");
        return viewLocation === "/"+location[location.length-1];
      };

  }

  getText = function(headerText){
    this.sharedService.changeHeader(headerText);
  }
}

export default SidebarController;
