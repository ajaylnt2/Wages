class PagingController {
  constructor($timeout, $scope) {
    'ngInject';
    
     this.name='paging';
     $scope.reverseSort = false;

     $scope.allColumns = [];
     $scope.getFilteredData = [];
     $scope.filterDataObject = {};

    //On submit Filter the data
      $scope.onSubmit=function(data){ 

        $scope.filteredTodos = data;
        if($scope.getFilteredData[0] != undefined){
          $scope.filterDataObject.name = $scope.getFilteredData[0];
        }

        if($scope.getFilteredData[1] != undefined){
          $scope.filterDataObject.age = $scope.getFilteredData[1];
        }

        if($scope.getFilteredData[2] != undefined){
          $scope.filterDataObject.designation = $scope.getFilteredData[2];
        } 

           $scope.getLength = Object.keys($scope.filterDataObject).length;
      }  

     //On clear clear the data
      $scope.clear=function(){       
            $scope.filterDataObject = {
              name: $scope.getFilteredData[0]='',
              age: $scope.getFilteredData[1]='',
              designation: $scope.getFilteredData[2]=''
            }
            $scope.getLength = 0;
            $scope.filteredTodos;
            $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
        end = begin + $scope.numPerPage;
         $scope.filteredTodos = $scope.employeeArray.slice(begin,end);
  });
          }



      $scope.getColumnName = function(columnNames){
        $scope.allColumns = columnNames;
      }

    //Sorting
    $scope.orderByMe = function(x, num,reverseSort){
       if(x=='name' && reverseSort == false){        
        $scope.myOrderBy = x;        
      }
      else if(x=='name' && reverseSort == true){
         $scope.myOrderBy = '-'+x;
      }
       else if(x=='age' && reverseSort == false){
        
        $scope.myOrderBy = x;

        
      }
      else if(x=='age' && reverseSort == true){
         $scope.myOrderBy = '-'+x;
      }
      else if(x=='designation' && reverseSort == false){
        
        $scope.myOrderBy = x;
        
      }
      else{
         $scope.myOrderBy = '-'+x;
      }
    }

    //Pagination
    this.name='paging';
    $scope.currentPage;
    $scope.numPerPage;

    this.getData = function(data1, data2, data3, dataArray){
      $scope.employeeArray = dataArray;
      this.pagingData = {
        total: data1,
        page: data2,
        pagesize: data3
      }
      if(this.pagingData.total > 0){
        this.paginationFormat = [];
        for (var i=1;i<=Math.ceil(this.pagingData.total/this.pagingData.pagesize);i++) {
          this.paginationFormat.push(i);
        }
      }

   $scope.filteredTodos = []
  ,$scope.currentPage = this.pagingData.page
  ,$scope.numPerPage = this.pagingData.pagesize
  ,$scope.maxSize = this.pagingData.total;
  
  }

   $scope.pageNumber = function(pageNum){    
      $scope.currentPage = pageNum;
    }

    $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
        end = begin + $scope.numPerPage;
    $scope.filteredTodos = $scope.employeeArray.slice(begin,end);
    
    
  });


}
}



export default PagingController;