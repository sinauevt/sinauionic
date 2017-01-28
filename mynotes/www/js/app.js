angular.module('starter', ['ionic'])

.controller('ListCtrl', function($scope, NoteStore) {
    $scope.notes = NoteStore.list();
    $scope.remove = function(noteId) {
        NoteStore.remove(noteId);
    };
})

.controller('AddCtrl', function($scope, $state, NoteStore) {
    $scope.note = {
        id: new Date().getTime().toString(),
        title: '',
        description: ''
    };
    
    $scope.save = function() {
        NoteStore.create($scope.note);
        $state.go('list');
    };
})

.controller('EditCtrl', function($scope, $state, NoteStore) {
    $scope.note = angular.copy(NoteStore.get($state.params.noteId));
    $scope.save = function() {
        NoteStore.update($scope.note);
        $state.go('list');
    };
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html'        
    });
    
    $stateProvider.state('add', {
        url: '/add',
        templateUrl: 'templates/edit.html',
        controller: 'AddCtrl'        
    });
    
    $stateProvider.state('edit', {
        url: '/edit/:noteId',
        templateUrl: 'templates/edit.html',
        controller: 'EditCtrl'        
    });
    
    $urlRouterProvider.otherwise('/list');
})

.factory('NoteStore', function() {
    var notes = angular.fromJson(window.localStorage['notes'] || '[]');
  
    function persist() {
        window.localStorage['notes'] = angular.toJson(notes);
    }
    
    return {
        list: function() {
            return notes;
        },
        
        get: function(noteId) {
            for(var i=0; i < notes.length; i++) {
                if(notes[i].id === noteId) {
                    return notes[i];
                }
            }
            
            return undefined;
        },
        
        create: function(note) {
            notes.push(note);
            persist();
        },
        
        update: function(note) {
            for(var i=0; i < notes.length; i++) {
                if(notes[i].id === note.id) {
                    notes[i] = note;
                    persist();
                    return;
                }
            }
            
            return undefined;
        },
        
        remove: function(noteId) {
            for(var i=0; i < notes.length; i++) {
                if(notes[i].id === noteId) {
                    notes.splice(i, 1);
                    persist();
                    return;
                }
            }
        }
    };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
