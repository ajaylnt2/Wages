import  chillerPerformanceComponent from './chillerPerformance.component';
import lodash from 'lodash';
const chillerPerformanceModule = angular.module('chillerPerformance', [])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('chillerPerformance', {
          parent:'plantsMain',
            url:'/chillerPerformance',
            component: 'chillerPerformance'
        })
})
.component('chillerPerformance', chillerPerformanceComponent)

.name;

export default chillerPerformanceModule;
