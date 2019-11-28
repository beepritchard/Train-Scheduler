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
        var freq = $("#Enterfreq").val().trim();

        var newTrain = {
            name: name,
            dest : destination,
            first: fTrain,
            frequen: freq,
        }

        database.ref().push(newTrain);

        $("#EnterTrainName").val("");
        $("#EnterDest").val("");
        $("#EnterFirstTrain").val("");
        $("#Enterfreq").val("");

        return false;
    }); 

    database.ref().on("child_added", function(child) {
        console.log(child.val());

        var name = child.val().name;
        var destination = child.val().dest;
        var fTrain = child.val().first;
        var freq = child.val().frequen;

    // moment JS
    var timeArr = fTrain.split(":");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    var arr;
    var minutes;
    var maxmoment = moment.max(moment(), trainTime);
        if (maxmoment === trainTime){
            arr = trainTime.format("hh:mm A");
            minutes = trainTime.diff(moment(),"minutes");
        }
    var diffTime = moment().diff(trainTime,"minutes");
    console.log("diffTime", diffTime);
    var remainder = diffTime % freq;
    console.log("remainder", remainder);
    minutes = freq - remainder;
    arr = moment().add(minutes, "m").format("hh:mm A");
    console.log("arr", arr);


    

    $("#Train > tbody").append(
        $("<tr>").append(
          $("<td>").text(name),
          $("<td>").text(destination),
          $("<td>").text(freq),
          $("<td>").text(arr),
          $("<td>").text(minutes)
        )
      );

    });
