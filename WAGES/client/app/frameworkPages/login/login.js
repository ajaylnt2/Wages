import angular from 'angular';

import loginComponent from './login.component';

let loginModule = angular.module('login', [

])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('login', {
          url: '/login',
          template: '<login layout-fill></login>',
          params: {
            previous: 'production',
            previousParams: {},
          },
        });
})

.component('login', loginComponent)

.name;

export default loginModule;
