// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAm_dN9s20yHnFbO8e5lsIFjUg1Q61xYHE',
    authDomain: 'beefindr.firebaseapp.com',
    databaseURL: 'https://beefindr.firebaseio.com',
    projectId: 'beefindr',
    storageBucket: 'beefindr.appspot.com',
    messagingSenderId: '764165825652'
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
