function ProductController($scope) {

    $scope.selectedItem = "";

    $scope.items = [
        { product: 'Product 1', quantity: 2, select: false },
        { product: 'Product 2', quantity: 1, select: false },
        { product: 'Product 3', quantity: 8, select: false },
        { product: 'Product 4', quantity: 4, select: false },
        { product: 'Product 5', quantity: 1, select: false },
        { product: 'Product 6', quantity: 6, select: false }
    ];

    $scope.filteredList = $scope.items;

    $scope.addItem = function () {

        var existingProduct = $scope.items.filter((productInfo) => {
            return productInfo.product == $scope.item.product;
        })

        if(existingProduct.length == 1) {
            toastr.error("Duplicate Product cannot be added.");
        } else {
            $scope.items.push({product: $scope.item.product, quantity: $scope.item.quantity, select: false});
            $scope.item.product = $scope.item.quantity = '';
            toastr.success("Product Added Successfully.");
        }
    };

    $scope.editItem = function(index){

        $scope.item = {
            product: $scope.items[index].product, 
            quantity: $scope.items[index].quantity
        }

        $scope.selectedItem = $scope.items[index].product;

        $scope.edit = true;
    };

    $scope.applyChanges = function(index){

        var selectedElement = $scope.items.find(function(element) {
            return element.product == $scope.selectedItem;
        });

        selectedElement.product = $scope.item.product;
        selectedElement.quantity = $scope.item.quantity;

        $scope.item = {};
        $scope.edit = false;
        toastr.success("Product Updated Successfully.");
    };

    $scope.deleteItem = function(index){
        $scope.items.splice(index, 1);
        toastr.success("Product Deleted Successfully.");
    };

    $scope.filterProductList = function() {

        if($scope.search == "") {
            $scope.filteredList = $scope.items;
        } else {
            $scope.filteredList = $scope.items.filter((productInfo) => {
                return productInfo.product.indexOf($scope.search) > -1;
            })
        }
        
    }
}

var app = angular.module("myApp", []);

app.controller("myCtrl", ProductController);

