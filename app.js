(function(){
  'use strict';

  angular.module('MenuCategoriesApp', [])
  .controller('MenuCategoriesController', MenuCategoriesController)
  .service('MenuCategoriesService', MenuCategoriesService)
  .constant('APIBasePath', "http://davids-restaurant.herokuapp.com");

  MenuCategoriesController.$inject = ['MenuCategoriesService'];
  function MenuCategoriesController(MenuCategoriesService) {
    var menu = this;

    // consuming call to service to get item
    var promise = MenuCategoriesService.getMenuCategories();

    // consuming call to service to add item method
    promise.then(function (response) {
      menu.categories = response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    })

    menu.logMenuItems = function (shortName) {
      var promise = MenuCategoriesService.getMenuForCatgory(shortName);

      promise.then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    };
  }

  MenuCategoriesService.$inject = ['$http','APIBasePath'];
  function MenuCategoriesService($http, APIBasePath) {
      var service = this;

      // 3rd version of addItem using promise and all and then method
      // more efficient way to handle asynchronous code/task
      service.getMenuCategories = function () {
        var response = $http({
          method: "GET",
          url: (APIBasePath + "/categories.json")
        });
        return response;
      };

      service.getMenuForCatgory = function (shortName) {
        var response = $http({
          method: "GET",
          url: (APIBasePath + "/menu_items.json"),
          params:{
            category: shortName
          }
        });
        return response;
      };

  }

})();
