import PagingComponent from './paging.component';
import PlantsDataComponent from './plantsdata.component';
import paging from 'angular-paging';
const PagingModule = angular.module('pagingModule', ['bw.paging'])
  .component('customPagination', PagingComponent);

export default PagingModule;

