import dashboardComponent from './dashboardMain.component';
import PlantsMain from './plantsMain/plantsMain';
import Alerts from './alerts/alerts';
import GlobalMain from './globalMain/globalMain';
const dashboardModule = angular.module('dashboardMain', [
PlantsMain,
Alerts,
GlobalMain
])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('dashboardMain', {
            url: '/',
            component: 'dashboardMain'
        })
      
})
.component('dashboardMain',dashboardComponent)

.name;

export default dashboardModule;
