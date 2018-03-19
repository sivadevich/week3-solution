(function (){
  'use strict' ;
  angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
     myTitle: '@title',
     badRemove: '=',
     onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrowCntrl',
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
var narrowCntrl = this;
//narrowCntrl.foundItemsList=[];
}

NarrowItDownController.$inject = ['$scope','MenuSearchService'];

function NarrowItDownController($scope,MenuSearchService) {
  var narrowCntrl = this;
  narrowCntrl.searchText ="";
  narrowCntrl.foundItemsList = [];
  narrowCntrl.title =  " items )";
  console.log("Search Text Keyed in "+narrowCntrl.searchText);
  narrowCntrl.getMatchedMenuItems = function () {
    console.log("narrowCntrl getMatchedItems search Text - "+narrowCntrl.searchText);
    var result =  MenuSearchService.getMatchedMenuItems(narrowCntrl.searchText);
    result.then(function (result) {
        // process result and only keep items that match
        for (var i=0; i<result.data.menu_items.length; i++) {
            var description = result.data.menu_items[i].description;
            if(description.search(narrowCntrl.searchText)!=-1){
            narrowCntrl.foundItemsList.push(result.data.menu_items[i]);
            }
        }
          console.log("narrowCntrl Length ### ****  - "+narrowCntrl.foundItemsList.length);
        //console.log("Items found - "+narrowCntrl.foundItemsList.length);
      //  return service.getFoundItems();
      });
//narrowCntrl.foundItemsList =MenuSearchService.getFoundItems();
    //console.log("narrowCntrl Length - "+narrowCntrl.foundItemsList);
    setTimeout(function () {
           //deferred.resolve();
          console.log("narrowCntrl Length ****  - "+narrowCntrl.foundItemsList.length);
       }, 2000);
  };
  console.log("narrowCntrl Length ())))  - "+narrowCntrl.foundItemsList.length);


}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
var foundItemsList = [];
service.getFoundItems = function () {
   return foundItemsList;
 };
  service.getMatchedMenuItems = function (searchText) {
    console.log("Search Text - "+searchText);
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    };
}
})();
