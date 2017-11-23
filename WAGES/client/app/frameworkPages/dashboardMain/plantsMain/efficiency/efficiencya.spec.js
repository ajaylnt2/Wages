// import Efficiency from './efficiency';
// import EfficiencyController from './efficiency.controller';
// import EfficiencyComponent from './efficiency.component';
// import EfficiencyTemplate from './efficiency.html';

// describe('Efficiency', () => {
//   let  $rootScope, $state,auth, $location, $componentController, $compile;
//   let makeController;

//   beforeEach(window.module(Efficiency));
//   beforeEach(inject((_$rootScope_) => {
//     $rootScope = _$rootScope_;
//     makeController = () =>
//        new EfficiencyController();
//   }));

//   beforeEach(inject(($injector) => {
     
//     // $rootScope = $injector.get('$rootScope');
//     $componentController = $injector.get('$componentController');
//     $state = $injector.get('$state');
//     $location = $injector.get('$location');
//     $compile = $injector.get('$compile');
//   }));

//   describe('Module', () => {
   
//     it('About component should be visible when navigates to /efficiency', () => {
//       $location.url('/efficiency');
//       $rootScope.$digest();
//       expect($state.current.component).to.eq('efficiency');
//     });
//   });


//   describe('Controller', () => {
//     // controller specs

//     let controller;
  
//     it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
//       const controller = makeController();
//       expect(controller).to.have.property('name');
//     });
//   });

 



//   describe('Component', () => {
//       // component/directive specs
//     const component = EfficiencyComponent;

//     it('includes the intended template', () => {
//       expect(component.template).to.equal(EfficiencyTemplate);
//     });

//     it('uses `controllerAs` syntax', () => {
//       expect(component).to.have.property('controllerAs');
//     });

//     it('invokes the right controller', () => {
//       expect(component.controller).to.equal(EfficiencyController);
//     });

//   });
// });
