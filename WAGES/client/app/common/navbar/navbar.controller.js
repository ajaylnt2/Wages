
class NavbarController {
constructor(store,auth,$location,$timeout) {
  'ngInject';
    this.name = 'navbar';
    this.auth = auth;
    this.$timeout = $timeout
    this.profile = [];
    this.topMenu='plant';
    this.profile = store.get('profile');

    this.isActive = function (viewLocation) {
      var str = $location.path();
      var location = [];
      var location = str.split("/");
      return viewLocation === "/"+location[location.length-1];
    };

    }
        logoutClick()
        {
          var obj = this;
          obj.auth.logout();
          obj.$location.path('/login');
        }


}

export default NavbarController;
