
import controller from './mediumNumber.controller';

let template;

  template = require('./mediumNumber.web.html');
  require('./mediumNumber.web.scss');


const mediumNumberComponent = {
  restrict: 'E',
  bindings: {
    value: '<',
    text:'<',
    unit: '<',
    title: '<',
    decimals: '<',
  },
  template,
  controller,
  controllerAs: 'vm',
};

export default mediumNumberComponent;
