import angular from 'angular';

class consumptionService {
  constructor($http, $q, $rootScope) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

    getData() {
      let $that = this;
      let deferred = this.$q.defer();

      this.$http.get('app/json/consumptionData.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }

}

export default consumptionService;
