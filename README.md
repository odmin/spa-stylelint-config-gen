## Stylelint configuration object generator

Single-page web-browser application

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and eject. In project are used [css modules](https://github.com/css-modules/css-modules).

## Table of Contents

- [Description](#description)
- [Start as local server](#start-as-local-server)
- [Build for Production](#build-for-production)
- [Global styles](#global-styles)

## Description

This simple single-page application for build your personal configuration object for [stylelint](//stylelint.io) from GUI in browser. You choose one from examples of code.

The generator is building config with rules, based of your preferences. If current display code not actual for you, press `Skip step` button for go to next step.

## Start as local server

4 simple steps for run this application on local server:

1. Install [npm](https://nodejs.org/)
2. Clone project to folder for you need:
```
git clone https://github.com/odmin/spa-stylelint-config-gen.git ./folder
```
3. Load dependencies:
```
cd ./folder
npm install
```
4. Run development web-server:
```
npm start
```

## Build for Production

Use command for build and optimize application files:
```
npm run build
```
You can read more about workspace, how to perform common tasks in the most recent version of this guide of create-react-app [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Global styles

Use this styles for formatting code into input JSON:

* .cssSelector
* .cssProperty
* .cssValue
* .cssComment
