
import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import contentTopComponent from './contentTop.component';

let contentTopModule = angular.module('contentTop', [
  uiRouter
])

.component('contentTop', contentTopComponent)

.name;

export default contentTopModule;
