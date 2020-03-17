var express = require('express');
var moment = require('moment');
var sql =  require("mssql");
const {performance} = require('perf_hooks');
const config = {
    user: 'sa',
    password: '12345678',
    server: 'localhost',
    database: 'Track'
};
var app = express();
app.use(express.json());

app.get('/', function (req, res) {
    sql.connect(config, function (err) {י 
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        // request.query('select * from Table_1', function (err, recordset) {

        //     if (err) console.log(err)

        //     // send records as a response
        //     res.send(recordset);

        // });
    });
});
app.get('/getUserDetails/:deviceName', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        request.input('deviceName', sql.VarChar, req.params.deviceName);
        console.log('The user: ' + req.params.deviceName + ' is connecting in: ' + new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" }))
        // query to the database and get the records
        request.query('select * from TrackAppUsers where DeviceName = @deviceName ', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            if (recordset.recordset.length == 0) {
                request.query('insert into TrackAppUsers (DeviceName, Status, DateOfDiagnosis) VALUES (@deviceName,0,null)', function (err, records) {
                    if (err) console.log(err)
                    else {
                        console.log("The user: " + req.params.deviceName + " register to the app")
                    }
                });
            }
            res.send(recordset);
        });
    });
});
app.post('/insertLocation', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
        var jerusalemTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
        var request = new sql.Request();
        request.input('deviceName', sql.VarChar, req.body.deviceName);
        request.input('latitude', sql.Float, req.body.latitude);
        request.input('longitude', sql.Float, req.body.longitude);
        //  request.input('timestamp', sql.BigInt, req.body.timestamp);
        request.input('datetime', sql.DateTime2(7), jerusalemTime);
        request.query('insert into DataVirus (DeviceName, Longitude, Latitude,Datetime) VALUES (@deviceName,@longitude,@latitude,@datetime)', function (err, recordset) {
            if (err) console.log(err)
            res.send('hey');
        });
    });
});
app.post('/carryVirus', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
        var request = new sql.Request();
        request.input('deviceName', sql.VarChar, req.body.deviceName);
        var jerusalemTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
        request.input('dateOfDiagnosis', sql.DateTime2(7), jerusalemTime);
        //request.input('dateOfDiagnosis', sql.DateTime2(7), req.body.datetime);
        request.query('insert into InfectedUsers (DeviceName, IsRecover, DateOfDiagnosis) VALUES (@deviceName,0,@dateOfDiagnosis)', function (err, recordset) {
            if (err) console.log(err)
            else {
                request.query('update TrackAppUsers set status = 3 where DeviceName = @deviceName', function (err, recordset) {
                    if (err) console.log(err)
                });
                let statusOfFirstCircle = 2
                checkForCircle(req.body.deviceName, jerusalemTime, statusOfFirstCircle);
            }
            res.send('hey')
        });
    });

});
function checkForCircle(deviceName, dateOfDiagnosis, status) {
    var arrayOfInfectedPoints = [];
    var arrayOfSuspectedPoints = [];
    var arrayOfCircleUsersPoints = [];
    var statusOfFirstCircle = 2;
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
        var request = new sql.Request();
        request.input('deviceName', sql.VarChar, deviceName);
        request.input('dateOfDiagnosis', sql.DateTime2(7), dateOfDiagnosis);
        request.query('select * from DataVirus where DeviceName = @deviceName and DATEDIFF(day,[Datetime],@dateOfDiagnosis) < 14 order by [Datetime]', function (err, recordset) {
            if (err) console.log(err)
                arrayOfInfectedPoints = recordset.recordset;
                arrayOfInfectedPoints = reduceArray(arrayOfInfectedPoints);
        });
        // reduce the array by distance of at least 2.5m between 2 following points
        request.query('select * from DataVirus where DeviceName != @deviceName and DATEDIFF(day,[Datetime],@dateOfDiagnosis) < 14 order by DeviceName,[Datetime]', function (err, records) {
            if (err) console.log(err)
            arrayOfSuspectedPoints = records.recordset;
            arrayOfSuspectedPoints = reduceArray(arrayOfSuspectedPoints,true);
            for (var i = 0; i < arrayOfSuspectedPoints.length; i++) {
                for (var j = 0; j < arrayOfInfectedPoints.length; j++) {
                    if ((Math.abs(moment(arrayOfSuspectedPoints[i].Datetime).diff(moment(dateOfDiagnosis))/3600000) < 6) && distance(arrayOfSuspectedPoints[i].Latitude, arrayOfSuspectedPoints[i].Longitude, arrayOfInfectedPoints[j].Latitude, arrayOfInfectedPoints[j].Longitude) < 22);
                        arrayOfCircleUsersPoints.push(arrayOfSuspectedPoints[i]);
                        break;
                }
            }
            arrayOfCircleUsersPoints = reduceArrayByExposureTime(arrayOfCircleUsersPoints);
            var arrayOfCircleUsers = fromOrderedPointsToUsers(arrayOfCircleUsersPoints);
            if (arrayOfCircleUsers.length != 0) {
                for (var m = 0; m < arrayOfCircleUsers.length; m++) {
                    let newRequest = new sql.Request();
                    newRequest.input('device', sql.VarChar, arrayOfCircleUsers[m].DeviceName);
                    newRequest.input('status', sql.Int, status)
                    newRequest.input('dateOfDiagnosis', sql.DateTime2(7), dateOfDiagnosis);
                    newRequest.query('update [TrackAppUsers] set Status = @status,DateOfDiagnosis = @dateOfDiagnosis where DeviceName =@device and Status <= @status ', function (err, records) {
                        if (err) console.log(err)
                    });
                }
                // if (status == statusOfFirstCircle) {
                //     for (var k = 0; k < arrayOfCircleUsers.length; k++) {
                //         let statusOfSecondCircle = 1;
                //         checkForCircle(arrayOfCircleUsers[k].DeviceName, arrayOfCircleUsers[k].Datetime, statusOfSecondCircle);
                //     }
                // }
            }
        });
    });
}
function fromOrderedPointsToUsers(arr){
    var newArr =[];
    newArr.push(arr[0]);
    for (var i = 0 ; i< arr.length-1 ; i++){
        if (arr[i].DeviceName != arr[i+1].DeviceName){
            newArr.push(arr[i+1]);
        }
    }
    return newArr;
}
function reduceArrayByExposureTime(arr){
    var position = 0;
    var duration = 0;
    var newArray = [];
    var exposureTime;
    while (position < arr.length -1){
        if (Math.abs(moment(arr[position].Datetime).diff(moment(arr[position + 1 ].Datetime))/1000) < 121 && (arr[position].DeviceName == arr[position+1].DeviceName)) {
            duration ++;
            position++;
            if (position == arr.length -1){
                exposureTime = Math.abs(moment(arr[position].Datetime).diff(moment(arr[position - duration].Datetime)))/60000;
                if (exposureTime > 2 && duration > 5){
                   newArray = newArray.concat(arr.slice(position-duration,position));
                }
            }
        }
        else {
             exposureTime = Math.abs(moment(arr[position].Datetime).diff(moment(arr[position - duration].Datetime)))/60000;;
             if (exposureTime > 5 && duration > 5){
                newArray = newArray.concat(arr.slice(position-duration,position));
             }
        }
    }
    return newArray;
}
// function reduceWithOrder(arr){
//   var i = 0
//   while (i < arr.length -1){
//       if (Math.abs(distance(arr[i].Latitude,arr[i].Longitude,arr[i+1].Longitude,arr[i+1].Latitude)) < 2.5 && arr[i].DeviceName == arr[i+1].DeviceName){
//         array.splice(i,1); 
//       }
//       else{
//           i++;
//       }
//   }
//  return arr;
// }
function reduceArray(arr,checkName){
    var i = 0 
    while (i < arr.length -1)
    {
        let sameName = true;
        checkName ? sameName = arr[i].DeviceName = arr[i+1].DeviceName : sameName = true;
        if (Math.abs(distance(arr[i].Latitude,arr[i].Longitude,arr[i+1].Longitude,arr[i+1].Latitude)) < 2.5 && sameName){
            array.splice(i,1);   
        }
        else {
            i++;
        }
    }
    return arr;
}
// function distance2(lat1, lon1, lat2, lon2) {
//     var t0 = performance.now();
//     if ((lat1 == lat2) && (lon1 == lon2)) {
//         return 0;
//     }
//     else {
//         var radlat1 = Math.PI * lat1 / 180;
//         var radlat2 = Math.PI * lat2 / 180;
//         var theta = lon1 - lon2;
//         var radtheta = Math.PI * theta / 180;
//         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//         if (dist > 1) {
//             dist = 1;
//         }
//         dist = Math.acos(dist);
//         dist = dist * 180 / Math.PI;
//         dist = dist * 60 * 1.1515;
//         // transfer to meters
//         dist = dist * 1.609344;
//         var t1 = performance.now();
// console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
// console.log("dist1:" + dist);

//         return dist;
//     }
// }
function distance(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // metres
    var φ1 = Math.PI * lat1 / 180;
    var φ2 = Math.PI * lat2 / 180;
    var Δφ = ((lat2 - lat1) * Math.PI) / 180;
    var Δλ = ((lon2 - lon1) * Math.PI) / 180;
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c / 1000;
    return d;
}
var server = app.listen(5000, function () {
    console.log('Server is running..');
});