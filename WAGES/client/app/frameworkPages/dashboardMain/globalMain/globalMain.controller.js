
class GlobalMainController {
  constructor( auth, $timeout, $location) {
      'ngInject';
        this.name = 'globalMain';
        this.auth = auth;
    }
}

export default GlobalMainController;
