import  dryerPerformanceComponent from './dryerPerformance.component';
import lodash from 'lodash';
const dryerPerformanceModule = angular.module('dryerPerformance', [])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('dryerPerformance', {
          parent:'plantsMain',
            url:'/dryerPerformance',
            component: 'dryerPerformance'
        })
})
.component('dryerPerformance', dryerPerformanceComponent)

.name;

export default dryerPerformanceModule;
