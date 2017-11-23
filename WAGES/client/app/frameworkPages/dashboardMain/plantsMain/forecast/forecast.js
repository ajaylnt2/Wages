
import  forecastComponent from './forecast.component';


const forecastModule = angular.module('forecast', [


])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('forecast', {
            parent:'plantsMain',
            url: '/forecast',
            component: 'forecast'
        })
})
.component('forecast', forecastComponent)

.name;

export default forecastModule;
