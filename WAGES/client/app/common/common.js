import angular from 'angular';
import Navbar from './navbar/navbar';
import contentTop from './contentTop/contentTop';
import sidebar from './sidebar/sidebar';
import rightbar from './rightbar/rightbar';

let commonModule = angular.module('app.common', [
  Navbar,
  contentTop,
  sidebar,
  rightbar
])

.name;

export default commonModule;