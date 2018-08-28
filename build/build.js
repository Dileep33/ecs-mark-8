'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const translation = require('./i18n');
const languageJSON = translation[process.env.LANGUAGE || 'hi'];
// const navigationJSON = navigation[process.env.LANGUAGE || 'hi'];

const ora = require('ora')
// const rm = require('rimraf')
// const path = require('path')
// const chalk = require('chalk')
// const webpack = require('webpack')
// const config = require('../config')
// const webpackConfig = require('./webpack.i18n.conf')
const copyDir = require('copy-dir')
const fs = require('fs');
const path = require('path')


const spinner = ora('Copying intermediate files for Language : ' + process.env.LANGUAGE)
spinner.start()
path.resolve(__dirname, '../static')
var intermediateFolder = path.resolve(__dirname,'../dist', 'intermediate')
var targetLanguageFolder = path.resolve(__dirname,'../dist', process.env.LANGUAGE)
copyDir.sync(intermediateFolder, targetLanguageFolder);
spinner.stop()
console.log('Copying intermediate files to language folder done for langauge : ' + process.env.LANGUAGE);


console.log('Copying static files for langauge : ' + process.env.LANGUAGE);
var staticFolder = path.resolve(__dirname,'../static')
var targetStaticFolder = path.resolve(__dirname, '..', 'dist',process.env.LANGUAGE, 'static')
copyDir.sync(staticFolder, targetStaticFolder);
var manifestFilePath = path.resolve(targetStaticFolder, 'manifest.json')
console.log("Manifest file Path : " + manifestFilePath);
var manifestData = JSON.parse(fs.readFileSync(manifestFilePath,'utf8').toString());
manifestData.lang = process.env.LANGUAGE;
manifestData.description = languageJSON['home_page_title'];
manifestData.short_name = languageJSON['pratilipi'];
manifestData.name = languageJSON['pratilipi'];
manifestData.gcm_sender_id = '659873510744';
fs.writeFile(manifestFilePath, JSON.stringify(manifestData), function (err) {
  if (err) throw err;
  console.log('Edited Manifest file for language : ' + process.env.LANGUAGE);
});
console.log('Copying static files to language folder done for langauge : ' + process.env.LANGUAGE);
