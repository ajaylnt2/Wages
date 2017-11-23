
import  productionComponent from './production.component';


const productionModule = angular.module('production', [


])
.config(($stateProvider) => {
    'ngInject';
    $stateProvider
        .state('production', {
            parent:'plantsMain',
            url: '/production',
            component: 'production'
        })
})
.component('production', productionComponent)

.name;

export default productionModule;
