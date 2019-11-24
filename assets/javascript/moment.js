
// const config = require('./config.json');

var config = {
    apiKey: "AIzaSyAu586G6NrLSzCe9vQXotXYcx4W9BAjms8",
    authDomain: "pritchard-bee-traintime.firebaseapp.com",
    databaseURL: "https://pritchard-bee-traintime.firebaseio.com",
    projectId: "pritchard-bee-traintime",
    storageBucket: "pritchard-bee-traintime.appspot.com",
    messagingSenderId: "357499868637",
    appId: "1:357499868637:web:b0221e93bc3f96a071d234",
    measurementId: "G-E6PCS14HR7"
  };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#AddnewTrain").on("click", function(){

        var name = $("#EnterTrainName").val().trim();
        var destination = $("#EnterDest").val().trim();
        var fTrain = $("#EnterFirstTrain").val().trim();
        var freq = $("#EnterFreq").val().trim();

        var newTrain = {
            name: name,
            dest : destination,
            first: fTrain,
            frequen: freq,
        }

        database.ref().push(newTrain);

        $('#EnterTrainName').val("");
        $('#EnterDest').val("");
        $('#EnterFirstTrain').val("");
        $('#EnterFreq').val("");

        return false;
    }); 

    database.ref().on("child_added", function(child) {
        console.log(child.val());

        var name = child.val().name;
        var destination = child.val().dest;
        var fTrain = child.val().first;
        var freq = child.val().frequen;

    // moment JS

    var firstTimeConverted = moment(fTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var nowTime = moment();
    console.log("NOW: " + moment(nowTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE: " + diffTime);

    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES AWAY: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" 
        + destination  + "</td><td>" + freq + "</td><td>" + nextTrain 
        + "</td><td>" + tMinutesTillTrain + "</td></tr>");


    });
