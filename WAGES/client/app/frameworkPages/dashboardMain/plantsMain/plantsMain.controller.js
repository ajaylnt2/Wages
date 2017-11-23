
class PlantsMainController {
  constructor(auth, $timeout, $location, $scope, sharedService) {
      'ngInject';

        this.name = 'plantsMain';
        this.auth = auth;
        $scope.$on('headerChanged', function() {
            $scope.headerText = sharedService.headerText;
        });
    }

}

export default PlantsMainController;
