import angular from 'angular';

class sharedService {
    constructor($rootScope) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.yearValue = null;
    }

    changeYear = function(yearValue) {
        this.yearValue = yearValue;
        this.broadcastYear();
    };

    changeHeader = function(headerText) {
        if(headerText == 'Summary')
            this.headerText = 'PLANT SUMMARY';
        else if(headerText == 'Energy Efficiency')
            this.headerText = 'ENERGY EFFICIENCY';
        else if(headerText == 'Utility Consumption & Cost')
            this.headerText = 'UTILITY - CONSUMPTION AND COST';
        else if(headerText == 'Budgeted Vs Actual')
            this.headerText = 'BUDGETED Vs ACTUAL';
        else if(headerText == 'Forecast')
            this.headerText = 'FORECAST';
        else if(headerText == 'Boiler ')
            this.headerText = 'BOILER PERFORMANCE';
        else if(headerText == 'Dryer ')
            this.headerText = 'DRYER PERFORMANCE';
        else if(headerText == 'Chiller ')
            this.headerText = 'CHILLER PERFORMANCE';
        else if(headerText == 'Air Compressor ')
            this.headerText = 'AIR COMPRESSOR PERFORMANCE';
        this.broadcastHeader();
    };

    broadcastYear = function() {
        this.$rootScope.$broadcast('yearChanged');
    };

    broadcastHeader = function() {
        this.$rootScope.$broadcast('headerChanged');
    };
}

export default sharedService;
