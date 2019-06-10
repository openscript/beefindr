# Beefinder
![Beefinder logo](./doc/res/logo.small.png)

BeeFinder (primary name; sometimes BeeFindr if BeeFinder is not available) connects beekeepers with wild or escaped hives. 

[![Build Status](https://travis-ci.org/openscript/beefindr.svg?branch=master)](https://travis-ci.org/openscript/beefindr)
[![Maintainability](https://api.codeclimate.com/v1/badges/6b2fe433052b3e8fa019/maintainability)](https://codeclimate.com/github/openscript/beefindr/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6b2fe433052b3e8fa019/test_coverage)](https://codeclimate.com/github/openscript/beefindr/test_coverage)

## Overview
* Continuous integration and delivery with TravisCI <br> https://travis-ci.org/openscript/beefindr
* Backend with Firebase <br> https://console.firebase.google.com/project/beefindr
* Hosting with Firebase <br> https://beefindr-dev.firebaseapp.com/
* Code quality with CodeClimate <br> https://codeclimate.com/github/openscript/beefindr
* Test Coverage with CodeClimate <br> https://codeclimate.com/github/openscript/beefindr

## Contribute
* Write commit messages in English and follow https://chris.beams.io/posts/git-commit/

### Getting started
1. Install [git](https://git-scm.com/) and configure your user and email
1. Clone project <br> `git clone git@github.com:openscript/beefindr.git`
1. Set up development environment
   * Install [Visual Studio Code](https://code.visualstudio.com/)
   * Install [NodeJS](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/docs/install) ([preferably with asdf](#asdf))
     * NodeJS version `12.3.1` for the Angular app
     * NodeJS version `8.15.0` for the Firebase functions
   * Install Angular CLI globally <br> `yarn global add @angular/cli`
1. Change to the workspace <br> for example with `cd`
1. Install dependencies <br> `yarn install`
1. Run application and open browser <br> `ng serve --open`

### Add a feature
1. Clone or pull project <br> `git clone git@github.com:openscript/beefindr.git` or `git pull`
1. Create a new branch <br> `git checkout -b features/`**[yourFeature]**
1. Run tests <br> `ng test --code-coverage`
1. Push new branch to remote <br> `git push --set-upstream origin features/`**[yourFeature]**
1. Follow the `Add a pull request` instructions

### Add a pull request
1. Finish development of your feature
   * Make sure the tests are passing with `ng test --code-coverage`
1. Merge any commit from the master into the feature branch <br> `git merge master`
1. [Create a pull request](https://github.com/openscript/beefindr/pulls)
   * Select a reviewer
   * Make sure the checks are passing
   * Make sure the branch is mergable

## Tooling
The following sections contain additional information about the tools, which are used to develop this application.

### <span id="asdf">[asdf](https://asdf-vm.com)</span>
This helps to manage differnt versions of NodeJS.
1. Install [asdf](https://asdf-vm.com/#/core-manage-asdf-vm)
1. Install the [nodejs](https://github.com/asdf-vm/asdf-nodejs) plugin <br> with `asdf plugin-add nodejs`
1. Install the appropriate runtime (with .tool-versions) <br> by running `asdf install` in the project root or functions folder
## Glossary
The following terms should be used throughout.

Term | Definition
---- | ----------
beehive |  Man made enclosure to keep bees. In this project it's also used for wild bee colonies.
beekeeper | A person who works with bees.

## Ressources
* [[Tutorial] AngularFire2: Installation and Setup](https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md)
* [[Tutorial] Angular 7: Firebase Authentication](https://www.positronx.io/full-angular-7-firebase-authentication-system/)
* [[Media] Bee for the logo](https://openclipart.org/detail/221154/cartoon-bee)
* [[Media] Map for the logo](https://openclipart.org/detail/177208/map-location)
* [[Tutorial] Material UI: Getting started](https://material.angular.io/guide/getting-started)
