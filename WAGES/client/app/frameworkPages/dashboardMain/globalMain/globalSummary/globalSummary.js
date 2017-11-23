
import globalSummaryComponent from './globalSummary.component';


const globalSummaryModule = angular.module('globalSummary', [

])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('globalSummary', {
             parent:'globalMain',
            url: '/globalSummary',
            component: 'globalSummary'
        })
})
.component('globalSummary',globalSummaryComponent)

.name;

export default globalSummaryModule;
