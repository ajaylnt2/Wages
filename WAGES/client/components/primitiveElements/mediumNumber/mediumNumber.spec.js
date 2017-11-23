
import MediumNumberModule from './';
import MediumNumberController from './mediumNumber.controller';
import MediumNumberComponent from './mediumNumber.component';
import MediumNumberTemplate from './mediumNumber.web.html';


describe('MediumNumber', () => {
  let $rootScope;  // eslint-disable-line no-unused-vars
  let makeController;

  beforeEach(window.module(MediumNumberModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => new MediumNumberController();
  }));

  describe('Controller', () => {
    // controller specs
    it('has a name property', () => { // erase if removing this.name from the controller
      const controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template', () => {
      expect(MediumNumberTemplate).to.match(/vm.title/);
    });
    it('has name in template', () => {
      expect(MediumNumberTemplate).to.match(/vm.value/);
    });
    it('has name in template', () => {
      expect(MediumNumberTemplate).to.match(/vm.unit/);
    });
  });

  describe('Component', () => {
      // component/directive specs
    const component = MediumNumberComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(MediumNumberTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(MediumNumberController);
    });
  });
});
