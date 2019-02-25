var CLIENT_ID = '1079893516406-b3gjokrog4rcseompgpbtfeamjh1rr3p.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD7tydEW7tS2fFT0MaV4_Zj6n80TAkNOn8';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function (error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 *
 *  CHANGE signoutButton.style.display = 'block' TO SEE THE SIGN OUT BUTTON!!!
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'none';
        listUpcomingEvents();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * Also calling the startTime function to output the time on the screen.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    startTime();
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);

    pre.style.transition = "all 2s";
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then(function (response) {
        var events = response.result.items;

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var startInfo = event.start.dateTime;
                if (!startInfo) {
                    startInfo = event.start.date;


                }
                var SYear = startInfo.substring(0,4);
                var SMonth = startInfo.substring(6,7);
                var SDay = startInfo.substring(8,10);
                var SNameOfDay = startInfo.substring(10,11);
                //var SstartTime = startInfo.substring(11,16);
                var SstartHour = startInfo.substring(11,13);
                var SstartMinute = startInfo.substring(13,16);


                var endInfo = event.end.dateTime;
                var EYear = endInfo.substring(0,4);
                var EMonth = endInfo.substring(6,7);
                var EDay = endInfo.substring(8,10);
                var ENameOfDay = endInfo.substring(10,11);
                var EEndTime = endInfo.substring(11,16);

                var pmOrAm = setAmOrPm(SstartHour);
                var realHour = checkHour(SstartHour);



                if(SYear === "201")
                {
                    appendPre(SstartHour);
                }
                else
                {
                  appendPre(event.summary + ': ' + SMonth +'/' + SDay + '/' + SYear + " Start Time " + realHour+SstartMinute + pmOrAm);
                }





            }
        } else {
            appendPre('No upcoming events found.');
        }
    });
}