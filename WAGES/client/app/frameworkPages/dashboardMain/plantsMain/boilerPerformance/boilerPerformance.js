import  boilerPerformanceComponent from './boilerPerformance.component';
import lodash from 'lodash';
const boilerPerformanceModule = angular.module('boilerPerformance', [])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('boilerPerformance', {
          parent:'plantsMain',
            url:'/boilerPerformance',
            component: 'boilerPerformance'
        })
})
.component('boilerPerformance', boilerPerformanceComponent)

.name;

export default boilerPerformanceModule;
