import alertsComponent from './alerts.component';
const alertsModule = angular.module('alerts', [

])
.config(($stateProvider) => {
    'ngInject';

    $stateProvider
        .state('alerts', {
            url: '/alerts',
            component: 'alerts'
        })
})
.component('alerts',alertsComponent)

.name;

export default alertsModule;
