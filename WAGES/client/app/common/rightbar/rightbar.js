
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import rightbarComponent from './rightbar.component';

let rightbarModule = angular.module('rightbar', [
    uiRouter
])
.config(($locationProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');
  })

.component('rightbar', rightbarComponent)

.name;

export default rightbarModule;
