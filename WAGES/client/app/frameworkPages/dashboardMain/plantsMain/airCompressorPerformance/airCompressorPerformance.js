import  airCompressorPerformanceComponent from './airCompressorPerformance.component';
import lodash from 'lodash';
const airCompressorPerformanceModule = angular.module('airCompressorPerformance', [])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('airCompressorPerformance', {
          parent:'plantsMain',
            url:'/airCompressorPerformance',
            component: 'airCompressorPerformance'
        })
})
.component('airCompressorPerformance', airCompressorPerformanceComponent)

.name;

export default airCompressorPerformanceModule;
