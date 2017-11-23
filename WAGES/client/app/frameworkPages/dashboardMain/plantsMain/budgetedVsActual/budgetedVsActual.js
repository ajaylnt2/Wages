import  budgetedVsActualComponent from './budgetedVsActual.component';
const budgetedVsActualModule = angular.module('budgetedVsActual', [])
.config(($stateProvider) => {
    'ngInject';
    $stateProvider
        .state('budgetedVsActual', {
          parent:'plantsMain',
            url:'/budgetedVsActual',
            component: 'budgetedVsActual'
        })
})
.component('budgetedVsActual', budgetedVsActualComponent)
.name;
export default budgetedVsActualModule;
