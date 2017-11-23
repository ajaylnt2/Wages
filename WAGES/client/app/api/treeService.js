import angular from 'angular';

class treeService {
  constructor($http, $q, $rootScope) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
  }

    getData() {
      let $that = this;
      let deferred = this.$q.defer();

      this.$http.get('app/frameworkPages/dashboardMain/plantsMain/tree/tree.json')
        .then((resp) => {
              deferred.resolve(resp);
        }, (err) => {
          deferred.reject(err);
        });
      return deferred.promise;
    }

}

export default treeService;
