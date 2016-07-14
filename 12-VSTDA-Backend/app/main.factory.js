(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('MainFactory', MainFactory);

    MainFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function MainFactory($http, $q) {

        var url = 'http://localhost:51967/api/todoentries/'
        var service = {
            getTodos: getTodos,
            addTodo: addTodo,
            deleteTodo: deleteTodo,
            TodoUpdated: TodoUpdated
        };
        return service;

        ////////////////

        // Gets data with GET API

        function getTodos() {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: url,
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;


        }

        //POST API Call

        function addTodo(todoName, todoPriority){

            var defer = $q.defer();

            var newTodo = {text: todoName, priority: todoPriority, createdDate: "1996-07-04T00:00:00"}

            $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: newTodo
                }).then(function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                        } else {
                            defer.reject("No data found!");
                        }
                    },
                    function(error) {
                        defer.reject(error);
                    });

                return defer.promise;

        }
      
         //Delete function/ Will delete from SQL database
        function deleteTodo(toDoId){

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: url + toDoId
            }).then(function(response) {
                    if (typeof response.data === 'object') {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;      

        }
      

        function TodoUpdated(todoName, todoPriority){

            var defer = $q.defer();
            var newAdd = {text: todoName, priority: todoPriority, createdDate: "1996-07-04T00:00:00"};

            $http({
                method: 'PUT',
                url: url,
                headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                },
                data: newAdd
            }).then(function(response) {
                    if (response.status === 204) {
                        defer.resolve(response);
                    } else {
                        defer.reject("No data found!");
                    }
                },
                function(error) {
                    defer.reject(error);
                });

            return defer.promise;      

        }
    }
})();