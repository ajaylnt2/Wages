import globalMainComponent from './globalMain.component';
import globalSummary from './globalSummary/globalSummary';
const globalMainModule = angular.module('globalMain', [
globalSummary,
])
.config(($stateProvider) => {
    'ngInject';
    $stateProvider
        .state('globalMain', {
            url: '/globalMain',
            component: 'globalMain'
        })
})
.component('globalMain', globalMainComponent)
.name;

export default globalMainModule;
