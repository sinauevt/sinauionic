# Sinau IONIC #

Perkembangan technology akhir-akhir ini berjalan sangat cepat terutama yang berhubungan dengan smartphone. Terbukti dengan seringnya kita melihat rilis terbaru smartphone dari berbagai pabrikan.

Tidak hanya smartphone saja namun sistem operasinya juga berkembang tidak kalah cepat. Seperti kita tahu Android (penguasa pasar dengan 76% market share) saat ini sudah sampai versi 7 yang diberi nama `Nougat`. Begitu juga dengan sistem operasi mobile yang lain seperti iPhone (penguasa ke-2 dengan 19% market share) dan Windows Mobile (penguasa ke-3 dengan 2% market share).

Perkembangan canggih smartphone ini harus diimbangi dengan ketersediaan aplikasi yang banyak bagi pengguna supaya tetap exist. Jika tidak maka siap-siap saja diderus oleh kompetitor. Ini yang terjadi pada `symbian` yang pada akhirnya memakan korban perusahaan sebesar `Nokia` dan `Blackberry` yang kemudian menyusul.

Masing-masing sistem operasi tersebut memiliki bahasa pemrograman sendiri untuk dapa membuat aplikasi didalamnya. Artinya jika kita ingin membuat aplikasi yang sama untuk Android dan iPhone kita harus menguasai Android-programming (Java-like programming) dan iPhone-programming (Objective-C dan Swift). Ketika kita melakukan pembaruan di salahsatunya maka kita juga harus melakukan hal yang sama di environment yang lain (maintain 2 kode secara bersamaan). Tentu hal ini tidak mudah, lalu adakah cara lain yang lebih sederhana?

Untuk dapat melakukan hal tersebut kita harus menggunakan pendekatan yang dinamakan dengan pemrograman `hybrid`. Dengan menggunakan ini kode yang telah kita buat dapat dipakai untuk mobile environment mana saja, jadi `1 coding for all platform`.

Ada banyak technology yang bisa kita gunakan, diantaranya: `Cordova`, `Ionic` dan `ReactNative`. Cordova menggunakan HTML5 dan Javascript, Ionic menggunakan AngularJS dan ReactNative menggunakan ReactJS sebagai bahasanya.

Yang akan kita bahas adalah Ionic. Ionic saat ini sudah sampai versi 2 akan tetapi statusnya masih Beta version, jadi belum benar-benar rilis dan bisa jadi belum begitu stabil untuk kita gunakan. Jadi kita akan menggunakan Ionic versi 1 untuk workshop kali ini.

## Persiapan ##

Sebelum memulai koding Ionic ada beberapa peralatan yang perlu kita install.
- Java SDK versi 8
- NodeJS versi 6
- Android SDK versi 24.4.1 (install API 19 beserta pendukunganya)
- Studio IDE versi 145 (install emulator)
- Gradle versi 2.10 dengan mode daemon (lihat [link berikut](https://docs.gradle.org/current/userguide/gradle_daemon.html) untuk lebih jelasnya)

Setelah selesai install semuanya, jangan lupa kita pasang di path environment variable supaya dikenali oleh command prompt atau console.

Kemudian kita install Ionic dan beberapa tambahan tools dari NodeJS.
- Install Cordova dengan perintah `npm install -g cordova`
- Install Ionic dengan perintah `npm install -g ionic`
- Install Bower dengan perintah `npm install -g bower`
- Install Gulp dengan perintah `npm install -g gulp`

## Hello World ##

Buat project baru dan ikuti langkah-langkah dibawah ini.
- `ionic start demoapp`
- `ionic platform add android`
- `ionic build android`
- `ionic emulate android`
- `/home/kakashi/Installed/android-sdk-linux-r24.4.1/tools/emulator -avd Nexus_5_API_19`

Kalo HP kita terhubung dengan komputer kita bisa menjalankan aplikasi langsung ke HP kita `ionic run android`. Baca [ini terlebih dahulu untuk menghidupkan fitur debug mode pada HP](https://developer.android.com/studio/run/device.html?hl=id) sebelum melakukan running dari HP secara langsung.

## Routing dan Navigasi ##

Kita bikin project baru lagi `ionic start mynotes blank`.

Tambahkan controller di app.js.

```javascript
.controller('ListCtrl', function($scope) {
    $scope.notes = [
        {
            title: "First Note",
            description: "First Note"
        },
        {
            title: "Second Note",
            description: "Second Note"
        }
    ];
})
```

Ganti content di index.html.

```xml
      <ion-nav-view>

      </ion-nav-view>
```

Buat folder baru didalam folder www dan beri nama templates. Buat file baru dengan nama list.html dan letakkan didalam folder templates. Isi file tersebut dengan kode dibawah ini.

```xml
<ion-view>
    <ion-content ng-controller="ListCtrl">
          <div class="list">
              <a href="#/edit" class="item" ng-repeat="note in notes">
                  <h2> {{note.title}} </h2>
                  <p> {{note.description}} </p>
              </a>
          </div>
      </ion-content>
</ion-view>
```

Tambahkan routing di app.js.

```javascript
.config(function($stateProvider) {
    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html'
    });
})
```

Kita buat tampilan edit. Buat file baru didalam folder templates dan beri nama edit.html. Isi file tersebut dengan kode berikut.

```xml
<ion-view>
    <ion-content>
          Ini tampilan Edit
      </ion-content>
</ion-view>
```

Kita tambahkan routing nya didalam config app.js.

```javascript
$stateProvider.state('edit', {
        url: '/edit',
        templateUrl: 'templates/edit.html'
    });
```

Setelah kita coba jalankan semuanya berjalan dengan baik, akan tetapi kurang pas rasanya kalau tidak ada tombol back. Biasanya tombol back ada diposisi paling atas sebelah kiri. Mari kita tambahkan. Caranya ganti ion header di file index.html menjadi berikut.

```xml
    <ion-pane>
      <ion-nav-bar class="bar-stable">
      	<ion-nav-back-button></ion-nav-back-button>
      </ion-nav-bar>
      <ion-nav-view>
      </ion-nav-view>
    </ion-pane>
```

Judul kita tempatkan di masing-masing file list.html dan edit.html.

```xml
<ion-view view-title="My Notes">
	............
    ............
</ion-view>
```

```xml
<ion-view view-title="Edit Note">
	............
    ............
</ion-view>
```

## State Parameter dan Form ##

Kita akan mengubah behaviour dari edit supaya edit yang ditampilkan berdasarkan dengan nomor note-nya. Pertama kita ubah link di file list.html.

```xml
<a href="#/edit/{{note.id}}" class="item" ng-repeat="note in notes">
```

Kita tambahkan satu property baru didalam object notes kita yang terdapat didalam file app.js.

```javascript
    $scope.notes = [
        {
            id: '1',
            title: "First Note",
            description: "First Note"
        },
        {
            id: '2',
            title: "Second Note",
            description: "Second Note"
        }
    ];
```

Ubah routing edit didalam file app.js supaya dapat menerima parameter dari url.

```javascript
angular.module('starter', ['ionic'])

.controller('ListCtrl', function($scope) {
    $scope.notes = notes;
})

.controller('EditCtrl', function($scope, $state) {
    $scope.note = getNote($state.params.noteId);
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html'
    });

    $stateProvider.state('edit', {
        url: '/edit/:noteId',
        templateUrl: 'templates/edit.html'
    });

    $urlRouterProvider.otherwise('/list');
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

function getNote(noteId) {
    for(var i=0; i < notes.length; i++) {
        if(notes[i].id === noteId) {
            return notes[i];
        }
    }

    return undefined;
}

var notes = [
    {
        id: '1',
        title: "First Note",
        description: "First Note Description"
    },
    {
        id: '2',
        title: "Second Note",
        description: "Second Note Description"
    }
];
```

Ubah koding didalam edit.html.

```xml
<ion-view view-title="Edit Note">
   <ion-content ng-controller="EditCtrl">
       <div class="list card">
           <div class="item item-input">
               <input type="text" ng-model="note.title">
           </div>
           <div class="item item-input">
               <textarea rows="5" ng-model="note.description"></textarea>
           </div>
       </div>
   </ion-content>
</ion-view>
```

Kalo kita coba jalankan secara otomatis setelah kita mengubah-ubah nilai didalam tampilan edit maka akan secara otomatis merubah isi dihalaman list.

Coba kita edit supaya ketika diklik button save baru sata akan tersimpan.

Ubah controller edit yang terdapat di app.js menjadi seperti dibawah ini.

```javascript
.controller('EditCtrl', function($scope, $state) {
    $scope.note = angular.copy(getNote($state.params.noteId));
    $scope.save = function() {
        updateNote($scope.note);
        $state.go('list');
    };
})
```

```javascript
function updateNote(note) {
    for(var i=0; i < notes.length; i++) {
        if(notes[i].id === note.id) {
            notes[i] = note;
            return;
        }
    }

    return undefined;
}
```

Tambahkan ini pada tampilan edit.html.

```xml
       <div class="padding">
           <button class="button button-block button-positive"
           ng-click="save()">Save</button>
       </div>
```

Sekarang mari kita tambahkan fitur untuk membuat note baru. Pertama kita delete ng-controller yang terdapat di file edit.html sehingga menjadi seperti dibawah ini.

```xml
<ion-view view-title="Edit Note">
   <ion-content>
       <div class="list card">
           <div class="item item-input">
               <input type="text" ng-model="note.title">
           </div>
           <div class="item item-input">
               <textarea rows="5" ng-model="note.description"></textarea>
           </div>
       </div>
       <div class="padding">
           <button class="button button-block button-positive"
           ng-click="save()">Save</button>
       </div>
   </ion-content>
</ion-view>
```

Kemudian kita tambahkan controller baru di file app.js.

```javascript
.controller('AddCtrl', function($scope, $state) {
    $scope.note = {
        id: new Date().getTime().toString(),
        title: '',
        description: ''
    };

    $scope.save = function() {
        createNote($scope.note);
        $state.go('list');
    };
})
```

Ubah config routing-nya menjadi seperti berikut.

```javascript
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
```

Tambahkan function baru untuk add.

```javascript
function createNote(note) {
    notes.push(note);
}
```

## Custom Service ##

Pada sample kita yang sebelumnya masih ada beberapa function javascript biasa yang kita gunakan. Kita akan mencoba untuk merefactor kode kita untuk merubah function tersebut menjadi custom service.

Kita pindahkan semua function ke dalam factory.

```javascript
.factory('NoteStore', function() {
    var notes = [];

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
        },

        update: function(note) {
            for(var i=0; i < notes.length; i++) {
                if(notes[i].id === note.id) {
                    notes[i] = note;
                    return;
                }
            }

            return undefined;
        }
    };
})
```

Update semua controller supaya mengadopsi service yang baru.

```javascript
.controller('ListCtrl', function($scope, NoteStore) {
    $scope.notes = NoteStore.list();
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
```

## Store Data ##

Kalau kita amati aplikasi yang kita buat ini, ketika kita sudah pernah menggunakan dan menambahkan beberapa data, kemudian kita stop aplikasi tersebut dan buka kembali maka semua data yang telah kita buat telah hilang. Tentu ini kurang bagus. Sekarang kita akan memodifikasi supaya data yang telah kita masukkan tadi tidak hilang dan disimpan di suatu tempat.

```javascript
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
        }
    };
})
```

Ketika kita jalankan dan menyimpan beberapa data, kemudian kita cek menggunakan developer tools, pada bagian tab application local storage, maka akan terlihat disana bahwa data kita telah tersimpan. Ketika aplikasi kita matikan kemudian kita nyalakan kembali, maka data akan tetap tersimpan.

## Delete ##

Kita akan menambahkan satu fitur terakhir di aplikasi kita yaitu fitur delete. Kita akan membuat setiap list dari note kita ketika digeser maka akan keluar button delete. Ini bukan sesuatu yang sulit, sangat mudah, karena telah disediakan oleh Ionic.

Pertama kita ubah file list.html menjadi seperti dibawah ini.

```xml
<ion-view view-title="My Notes">
    <ion-content ng-controller="ListCtrl">
        <ion-list>
            <ion-item class="item-remove-animate item-icon-right" 
                href="#/edit/{{note.id}}" ng-repeat="note in notes">
                <h2> {{note.title}} </h2>
                <p> {{note.description}} </p>
                <i class="icon ion-arrow-right-b"></i>
                <ion-option-button class="button-assertive icon-left ion-trash-b"
                    ng-click="remove(note.id)">Delete</ion-option-button>
            </ion-item>
        </ion-list>
      </ion-content>
      <div class="bar bar-footer bar-stable">
          <a href="#/add" class="button button-assertive icon-left ion-compose">New Note</a>
      </div>
</ion-view>
```

Tambahkan functionality remove kedalam list controller.

```javascript
.controller('ListCtrl', function($scope, NoteStore) {
    $scope.notes = NoteStore.list();
    $scope.remove = function(noteId) {
        NoteStore.remove(noteId);
    };
})
```

Tambahkan function remove kedalam factory.

```javascript
remove: function(noteId) {
            for(var i=0; i < notes.length; i++) {
                if(notes[i].id === noteId) {
                    notes.splice(i, 1);
                    persist();
                    return;
                }
            }
        }
```

