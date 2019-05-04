# Beefinder
![Beefinder logo](./doc/res/logo.small.png)

BeeFinder (primary name; sometimes BeeFindr if BeeFinder is not available) connects beekeepers with wild or escaped hives. 

[![Build Status](https://travis-ci.org/openscript/beefindr.svg?branch=master)](https://travis-ci.org/openscript/beefindr)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b2fe433052b3e8fa019/maintainability)](https://codeclimate.com/github/openscript/beefindr/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b2fe433052b3e8fa019/test_coverage)](https://codeclimate.com/github/openscript/beefindr/test_coverage)

## Overview
* Continuous integration and delivery with TravisCI <br> https://travis-ci.org/openscript/beefindr
* Backend with Firebase <br> https://console.firebase.google.com/project/beefindr
* Hosting with Firebase <br> https://beefindr.firebaseapp.com/
  * Hello World proof of concept: https://beefindr.firebaseapp.com/hello-world
* Code quality with CodeClimate <br> https://codeclimate.com/github/openscript/beefindr
* Test Coverage with CodeClimate <br> https://codeclimate.com/github/openscript/beefindr

## Contribute
* Write commit messages in English and follow https://chris.beams.io/posts/git-commit/

### Getting started
1. Install [git](https://git-scm.com/) and configure your user and email
1. Clone project <br> `git clone git@github.com:openscript/beefindr.git`
1. Set up development environment
   * Install [Visual Studio Code](https://code.visualstudio.com/)
   * Install [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/docs/install)
   * Install Angular CLI globaly <br> `yarn global add @angular/cli`
1. Change to the workspace <br> for example with `cd`
1. Install dependencies <br> `yarn install`
1. Run application and open browser <br> `ng serve --open`

### Add your feature
1. Clone or pull project <br> `git clone git@github.com:openscript/beefindr.git` or `git pull`
1. Create a new branch <br> `git checkout -b features/`**[yourFeature]**
1. Run tests <br> `ng test --code-coverage`
1. Push new branch to remote <br> `git push --set-upstream origin features/`**[yourFeature]**
1. [Create a pull request](https://github.com/openscript/beefindr/pulls) with a reviewer

## Ressources
* [[Tutorial] AngularFire2: Installation and Setup](https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md)
* [[Tutorial] Angular 7: Firebase Authentication](https://www.positronx.io/full-angular-7-firebase-authentication-system/)
* [[Media] Bee for the logo](https://openclipart.org/detail/221154/cartoon-bee)
* [[Media] Map for the logo](https://openclipart.org/detail/177208/map-location)
* [[Tutorial] Material UI: Getting started](https://material.angular.io/guide/getting-started)
