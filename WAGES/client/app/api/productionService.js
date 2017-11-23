import angular from 'angular';
class productionService {
  constructor($http, $q) {
      'ngInject';
    this.$http = $http;
    this.$q = $q;
  }
    getData() {
      let $that = this;
      let deferred = this.$q.defer();
      // $.ajax({
      //   url: "../json/production.json",
      //   type: 'GET',
      //   contentType: "application/json; charset=utf-8",
      //   dataType: 'json',
      //   success: function (data) {
      //       deferred.resolve(data);
      //   },
      //   async: true
      // });
     this.$http({  
            url: "json/production.json",  
            dataType: 'json',  
            method: 'GET',  
            data: '',  
            headers: {  
                "Content-Type": "application/json"  
            }  
        }).then(function(response) {  
            console.log(response);
            //$scope.value = response.d;  
        }); 
      // this.$http.get('./production.json')
      //   .then((resp) => {
      //         deferred.resolve(resp);
      //   }, (err) => {
      //     deferred.reject(err);
      //   });
      return deferred.promise;
    }
}

export default productionService;
