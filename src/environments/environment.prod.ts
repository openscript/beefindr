export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAm_dN9s20yHnFbO8e5lsIFjUg1Q61xYHE',
    authDomain: 'beefindr.firebaseapp.com',
    databaseURL: 'https://beefindr.firebaseio.com',
    projectId: 'beefindr',
    storageBucket: 'beefindr.appspot.com',
    messagingSenderId: '764165825652'
  },
  baseUrl: 'https://beefindr.firebaseapp.com',
  version: require('../../package.json').version + ' (prod)'
};
