class DashboardMainController {
  constructor(auth, $timeout, $location, $scope, sharedService) {
      'ngInject';

        this.name = 'dashboardMain';
        debugger;
       $state.go("/plantsMain/production");
    }

}

export default DashboardMainController;