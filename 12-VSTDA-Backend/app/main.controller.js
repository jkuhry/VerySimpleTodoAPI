(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('MainController', MainController);

    MainController.$inject = ['MainFactory', 'toastr'];

    /* @ngInject */
    function MainController(MainFactory, toastr) {
        var vm = this;
        vm.title = 'MainController';
        vm.addTodo = addTodo;
        vm.deleteTodo = deleteTodo;
        vm.TodoUpdated = TodoUpdated;
        var reverse = true;

        activate();

        ////////////////


        function activate() {
            MainFactory.getTodos()
                .then(function(response) {

                        vm.todos = response.data;
                        toastr.success('Your Todos Have Loaded!');


                    },
                    function(error) {
                        if (typeof error === 'object') {
                            toastr.error('There was an error: ' + error.data);
                        } else {
                            toastr.info(error);
                        }
                    })
        }



        function addTodo(todoName, todoPriority) {
            MainFactory.addTodo(todoName, todoPriority).then(function(response) {

                    vm.todoAdded = response.data;
                    vm.todos.push(vm.todoAdded);
                    toastr.success('Todo Successfully Added!');


                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });
        }

        //Delete Function 

        function deleteTodo(data) {
            var index = data.toDoEntryId;
            MainFactory.deleteTodo(index).then(function(response) {

                    vm.deleteTodo = response.data;
                    toastr.success('Todo Successfully Deleted!');

                    vm.todos.splice(index, 1);

                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });
        }

        //Update Function

        function TodoUpdated(todoName, todoPriority) {
            MainFactory.TodoUpdated(todoName, todoPriority).then(function(response) {


                    toastr.success('New Task Successfully Updated!');

                },
                function(error) {
                    if (typeof error === 'object') {
                        toastr.error('There was an error: ' + error.data);
                    } else {
                        toastr.info(error);
                    }
                });
        }

    }
})();

