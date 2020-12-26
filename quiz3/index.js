const Axios = require('axios');
const url = "https://codequiz.azurewebsites.net/";
const reqColName = 'Nav';
const columnName = ['Fund Name', 'Nav', 'Bid', 'Offer', 'Change'];
const rowName = ['B-INCOMESSF', 'BM70SSF', 'BEQSSF', 'B-FUTURESSF'];
var allArrayData = []; //re-arrange data to simple array

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//get command for accept cookie
const myArgs = process.argv.slice(2);

//accept cookie
if (myArgs[0] == "FUNDCODE") {
    const hasCookie = true;
    console.log("Accept Cookie!");
    getData(hasCookie);

    rl.question('Next command:', (answer) => {
        var a = answer.split("node index.js");
        if (a.length == 2 && a[1] != "") {
            var reqRowName = a[1].replace(/\s/g, ''); //replace for remove space from string
            var check = rowName.findIndex(x => x == reqRowName); // check row name valid

            if (check != -1) {
                var rIndex = allArrayData.findIndex(x => x == reqRowName);
                var cIndex = columnName.findIndex(x => x == reqColName);
                console.log("Answer:", allArrayData[rIndex + cIndex]);
            }
            else {
                console.log("Error: Not found column '"+ reqRowName+"'");
            }
        }
        else {
            console.log("Error: Command should be 'node index.js xxxx'");
        }
        rl.close();
    });
}
else{
    console.log("Error: Wrong command, Enter 'node index.js FUNDCODE' to run and accept cookie")
    rl.close();
}

async function getData(hasCookie) {
    await Axios.get(url, {
        headers: {
            Cookie: "hasCookie=" + hasCookie
        }
    })
        .then(res => {
            // console.log(res.data);
            splitData(res.data);
        })
        .catch(error => {
            console.error(error)
        })
}

//re-arrange data to simple array
function splitData(data) {
    var allArr = (data.split("<td>"));
    allArr.shift(); //remove index 0

    var index_rowName = topicIndex();
    for (var i = 0; i < allArr.length; i++) {
        var idx = index_rowName.findIndex(x => x == i)

        if (idx !== -1) {
            var s = allArr[i].split("</td>");
            allArr[i] = s[0].replace(/\s/g, ''); //replace for remove space from string
        }
        else {
            var a = allArr[i].match(/[+-]?([0-9]*[.])?[0-9]+/gi);
            allArr[i] = Number(a[0]);
        }
    }
    allArrayData = allArr;
}

function topicIndex() {
    var index_rowName = [];
    for (var n = 0; n < rowName.length; n++) {
        index_rowName[n] = columnName.length * n;
    }
    return index_rowName;
}
