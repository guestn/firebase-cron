// Copyright 2017 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var functions = require('firebase-functions');
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var fetch = require('node-fetch');
//var admin = require("firebase-admin");
// var serviceAccount = require("path/to/serviceAccountKey.json");
//
// var config = {
//     apiKey: "AIzaSyDdTmZPfamocJYLs3ce7tnHA_12niJBfCk",
//     authDomain: "terracetemp2.firebaseapp.com",
//     databaseURL: "https://terracetemp2.firebaseio.com",
//     projectId: "terracetemp2",
//     storageBucket: "terracetemp2.appspot.com",
//     messagingSenderId: "607134304579"
//   };
//   firebase.initializeApp(config);

exports.hourly_job =
  functions.pubsub.topic('hourly-tick').onPublish((event) => {
    console.log("This job is ran every hour!")
  });

exports.minute_job =
  functions.pubsub.topic('five-minute-tick').onPublish((event) => {
    console.log("This job goes each 5 MINUTES! -")
    var URL='https://api.spark.io/v1/devices/53ff71066667574808382467/data?access_token=d1d253a2a98001d4df65eee7d919e0d9149a2ae7';

    fetch(URL)
      .then(function(data){
        return data.json()
      })
      .then(function(datajson){
        console.log('datajson',datajson)
        if (!datajson.error) {
          var timestamp = new Date().getTime()
          admin.database().ref('dataset').child(timestamp).set(datajson);
        }
      })
      .catch(function(error){
        console.log('ERR',error)
      })
  //  var timestamp = (Math.random()*999999).toFixed(0)

  });
