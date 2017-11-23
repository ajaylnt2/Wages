import angular from 'angular';
import Login from './login/login';
import DashboardMain from './dashboardMain/dashboardMain';

let pageModule = angular.module('app.frameworkPages', [
  DashboardMain,
  Login,
])
.name;

export default pageModule;
