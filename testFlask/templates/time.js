function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var pre;
    pre = setAmOrPm(h);
    h = checkHour(h);
    m = checkTime(m);
    s = checkTime(s);

    //document.getElementById('txt').style.fontFamily = "Impact,Charcoal,sans-serif";
    document.getElementById('txt').style.fontSize = "xx-large";
    document.getElementById('txt').style.color = "#feffe1";
    document.getElementById('txt').style.textAlign = "center";
    document.getElementById('txt').innerHTML =
        h + ":" + m + ":" + s + pre;
    var t = setTimeout(startTime, 500);



}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    // add zero in front of numbers < 10
    return i;
}

function checkHour(hour) {
    var hourValue;
    if (hour > 0 && hour <= 12) {
        hourValue = "" + hour;
    }
    else if (hour > 12) {
        hourValue = "" + (hour - 12);
    }
    else if (hour == 0) {
        hourValue = "12";
    }
    return hourValue;
}

function setAmOrPm(hour) {
    var value;
    if (hour >= 12) {
        value = "PM";
    }
    else {
        value = "AM";
    }
    return value;
}






