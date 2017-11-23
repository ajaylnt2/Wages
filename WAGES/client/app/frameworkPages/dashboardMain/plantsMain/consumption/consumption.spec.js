
// import ParetoAnalysis from './paretoAnalysis';
// import ParetoAnalysisController from './paretoAnalysis.controller';
// import ParetoAnalysisComponent from './paretoAnalysis.component';
// import ParetoAnalysisTemplate from './paretoAnalysis.html';

// describe('paretoAnalysis', () => {
//   let  $rootScope, $state,auth, $location, $componentController, $compile;
//   let makeController;

//   beforeEach(window.module(ParetoAnalysis));
//   beforeEach(inject((_$rootScope_) => {
//     $rootScope = _$rootScope_;
//     makeController = () =>
//        new ParetoAnalysisController();
//   }));

//   beforeEach(inject(($injector) => {

//     // $rootScope = $injector.get('$rootScope');
//     $componentController = $injector.get('$componentController');
//     $state = $injector.get('$state');
//     $location = $injector.get('$location');
//     $compile = $injector.get('$compile');
//   }));

//   describe('Module', () => {

//     it('About component should be visible when navigates to /paretoAnalysis', () => {
//       $location.url('/paretoAnalysis');
//       $rootScope.$digest();
//       expect($state.current.component).to.eq('paretoAnalysis');
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
//     const component = ParetoAnalysisComponent;

//     it('includes the intended template', () => {
//       expect(component.template).to.equal(ParetoAnalysisTemplate);
//     });

//     it('uses `controllerAs` syntax', () => {
//       expect(component).to.have.property('controllerAs');
//     });

//     it('invokes the right controller', () => {
//       expect(component.controller).to.equal(ParetoAnalysisController);
//     });

//   });
// });
