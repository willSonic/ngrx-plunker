/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  var ngVer = '@2.0.0-rc.1'; // lock in the angular package version; do not let it float to current!

  //map tells the System loader where to look for things
  var  map = {
    'app':                        'app',

    '@angular':                   'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
    'angular2-in-memory-web-api': 'https://npmcdn.com/angular2-in-memory-web-api', // get latest
    '@ngrx/store':                'https://npmcdn.com/@ngrx/store@2.0.0',
    '@ngrx/effects':              'https://npmcdn.com/@ngrx/effects@1.0.1',
    '@ngrx/core':                 'https://npmcdn.com/@ngrx/core@1.0.0',
    'rxjs':                       'https://npmcdn.com/rxjs@5.0.0-beta.6',
    'ts':                         'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript':                 'https://npmcdn.com/typescript@1.8.10/lib/typescript.js',
 };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.browser.ts',  defaultExtension: 'ts' },
    'rxjs':                       { main: 'index.js', defaultExtension: 'js' },
    '@ngrx/store':                       { main:'index.js', defaultExtension: 'js' },
    '@ngrx/effects':                       { main: 'index.js', defaultExtension: 'js' },
    '@ngrx/core':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    
    meta: { 'app/models/audio-artist-model.ts': { format: 'es6' }},
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'typescript',
    typescriptOptions: {
      emitDecoratorMetadata: true
    },

    map: map,
    packages: packages
  }

  System.config(config);

})(this);