import plantsMainComponent from './plantsMain.component';
import airCompressorPerformance from './airCompressorPerformance/airCompressorPerformance';
import budgetedVsActual from './budgetedVsActual/budgetedVsActual';
import production from './production/production';
import forecast from './forecast/forecast';
import boilerPerformance from './boilerPerformance/boilerPerformance';
import chillerPerformance from './chillerPerformance/chillerPerformance';
import dryerPerformance from './dryerPerformance/dryerPerformance';
import efficiency from './efficiency/efficiency';
import consumption from './consumption/consumption';
const plantsMainModule = angular.module('plantsMain', [
  airCompressorPerformance,
  budgetedVsActual,
  production,
  forecast,
  boilerPerformance,
  chillerPerformance,
  dryerPerformance,
  efficiency,
  consumption,
])
.config(($stateProvider) => {
    'ngInject';
    $stateProvider
        .state('plantsMain', {
            parent:'dashboardMain',
            url: 'plantsMain',
            component: 'plantsMain'
        })
})
.component('plantsMain',plantsMainComponent)

.name;

export default plantsMainModule;
