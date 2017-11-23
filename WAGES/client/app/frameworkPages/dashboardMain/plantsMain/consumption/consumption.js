
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import consumptionComponent from './consumption.component';

const consumptionModule = angular.module('consumption', [
    uiRouter
])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('consumption', {
          parent:'plantsMain',
            url: '/consumption',
            component: 'consumption'
        })
})
.component('consumption',consumptionComponent)

.name;

export default consumptionModule;
