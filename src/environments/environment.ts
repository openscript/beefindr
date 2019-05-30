// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCZ4SEUvMZdX1eFMNsq7EMYT7CdwPrvIQM',
    authDomain: 'beefindr-dev.firebaseapp.com',
    databaseURL: 'https://beefindr-dev.firebaseio.com',
    projectId: 'beefindr-dev',
    storageBucket: 'beefindr-dev.appspot.com',
    messagingSenderId: '1034428049462',
    appId: '1:1034428049462:web:9f37442c8643f49c'
  },
  baseUrl: 'http://localhost:4200',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
