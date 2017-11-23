
import  efficiencyComponent from './efficiency.component';


const efficiencyModule = angular.module('efficiency', [


])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('efficiency', {
          parent:'plantsMain',
            url: '/efficiency',
            component: 'efficiency'
        })
})
.component('efficiency', efficiencyComponent)

.name;

export default efficiencyModule;
