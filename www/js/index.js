/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();


var resultDiv;

// document.addEventListener("deviceready", init, false);
//toggled on and off when debugging in chrome

///////////////  Code for Barcode Scanner
function init() {
    document.querySelector("#startScan").addEventListener("click", startScan, false);
    resultDiv = document.querySelector("#results");

    document.querySelector("#signIn").addEventListener("click", logInForm, false);

    $(document).on("click", "#loginform", function(event){
        event.preventDefault();
        startSession();
    })



}

init(); //Toggle this on and off when debugging in chrome

function startScan() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var s = "Result: " + "<a href=" + result.text + ">"+ "Click here to sign up"  +"</a>" + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            var signUpLink = "<a href=" + result.text + ">"+ "Click here to sign up"  +"</a>"
            resultDiv.innerHTML = signUpLink;
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
};
///////////////////////////////////END Barscanner JS

function logInForm () {
    var form = ("<form action='#' method='post'> Email:<br><input type='text' name='email'><br> Password:<br><input type='text' name='password_digest'><br><input type='button' value='Login!!!' id='loginform'></form>")
    resultDiv.innerHTML = form;
};

function startSession() {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/sessions",
        data: z.serialize,
    }).done(function(response) {
        $('body').empty();
        $('body').append('<a href="#">' + 'Login Success! Continue to your Profile!' + '</a>')
    });
};


