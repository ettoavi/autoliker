// Define global variables needed to access Picasa Web Albums Data API
var SCOPE = 'http://picasaweb.google.com/data/';
var SCOPE1 = 'https://www.googleapis.com/auth/drive.photos.readonly';
var URL = "https://picasaweb.google.com/data/feed/api/user/default";
var CLIENT_EMAIL = 'etto.avianto@gmail.com';
var USER_EMAIL = 'etto.avianto@gmail.com';

var NAME = 'GoogleDrive:' + USER_EMAIL; //'lh2';

/*
- Fetch the Picasa albums of the current user
- Find the public albums among them
- Add their titles to a listbox
- Put this listbox in a UI and show it in the spreadsheet
*/
function getPicasaAlbums(){
  RoboApp.logger.clear();
  var svc = getService();

      if (!svc.hasAccess()) {
        RoboApp.logger.log('oAuthConfig has ho access!!');
        RoboApp.logger.log('Authorization Url : '+svc.getAuthorizationUrl());
        RoboApp.logger.log('RedirectUri Url : '+svc.getRedirectUri());
        return {};
      } else {
        RoboApp.logger.log('Access Granted!!');
        RoboApp.logger.log('oauth :'+JSON.stringify(svc));
        RoboApp.logger.log('token :'+svc.getAccessToken());
      }

  var data = UrlFetchApp.fetch(URL , {headers:{ Authorization: 'Bearer ' + svc.getAccessToken()} }).getContentText();
 var xmlOutput = Xml.parse(data, false);
 var albums = xmlOutput.getElement().getElements('entry');
 var info = [];
 var app = UiApp.createApplication().setTitle('Picasa');
 var panel = app.createVerticalPanel();
 var listBox = app.createListBox().setName('albumListBox').addItem('select');
 var handler = app.createServerHandler('showImagesEventHandler').addCallbackElement(listBox);
 listBox.addChangeHandler(handler);
 for(var i = 0; i < albums.length; i++){
   if(albums[i].getElement('rights').getText() == "public"){
     var title = albums[i].getElement('title').getText();
     var id = albums[i].getElement('http://schemas.google.com/photos/2007', 'id').getText();
     info.push([title,id]);
     listBox.addItem(title);
     RoboApp.logger.log(title+' id:'+id);
   }
 }
 // use a script property to save the links to each album for later use
 ScriptProperties.setProperty('info', JSON.stringify(info));
 var scrollPanel = app.createScrollPanel().setWidth('500').setHeight('300');
 scrollPanel.setAlwaysShowScrollBars(true);
 scrollPanel.add(app.createVerticalPanel().setId('panelForImages'));
 app.add(panel.add(listBox).add(scrollPanel));
  
 showImagesEventHandler('19/08/16') 
 
 //SpreadsheetApp.getActiveSpreadsheet().show(app);
}


/*
- Clear the UI
- Retrieve the album selected by the user from the listBox
- Get the ID of this album from the 'info' script property
- Get the photos of this album from Picasa
- Show those photos in the UI
*/
function showImagesEventHandler(e){
  var svc = getService();
 var app = UiApp.getActiveApplication();
 var panel = app.getElementById('panelForImages').clear();
 var info = JSON.parse(ScriptProperties.getProperty('info'));
 for(i in info){
   if(info[i][0] == e){
     var data = UrlFetchApp.fetch(URL+'/albumid/'+info[i][1], {headers:{ Authorization: 'Bearer ' + svc.getAccessToken()} }).getContentText();
     var xmlOutput = Xml.parse(data, false);
     var photos = xmlOutput.getElement().getElements('entry');
     for(j in photos){
       RoboApp.logger.log(photos[j].getElement('content').getAttribute('src').getValue() );
       panel.add(app.createImage(photos[j].getElement('content').getAttribute('src').getValue()));
     }
   }
 }
 return app;
}


function getOAuthToken() {
  DriveApp.getRootFolder();
  return { headers: {
      Authorization: 'Bearer ' + ScriptApp.getOAuthToken()
    }
  }
}

function getService() {
  var web = {client_id  :"744476467212-po06vq5hrvt73nilpsaifaejsdht3fja.apps.googleusercontent.com",
             project_id :"project-id-7443741285673408010",
             auth_uri   :"https://accounts.google.com/o/oauth2/auth",
             token_uri  :"https://accounts.google.com/o/oauth2/token",
             auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
             client_secret:"zv8wujkf1WNppTcH2Jd-VXF1"};
            
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
 
  
  var oAuthConfig = OAuth2.createService('lh2')

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl(web.auth_uri)
      .setTokenUrl(web.token_uri)
      // Set the client ID and secret, from the Google Developers Console.
      .setClientId(web.client_id)
      .setClientSecret(web.client_secret)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('authCallback')

      // Set the property store where authorized tokens should be persisted.
      .setPropertyStore(PropertiesService.getUserProperties())

      // Set the scopes to request (space-separated for Google services).
      .setScope(SCOPE)

      // Below are Google-specific OAuth2 parameters.

      // Sets the login hint, which will prevent the account chooser screen
      // from being shown to users logged in with multiple accounts.
      .setParam('login_hint', Session.getActiveUser().getEmail())

      // Requests offline access.
      .setParam('access_type', 'offline');

  return oAuthConfig;
      
   //return { headers: {
   //   Authorization: 'Bearer ' + oAuthConfig.getAccessToken()
   // }
  //};
}

function authCallback(request) {
  RoboApp.logger.log('authCallback is called');
  var driveService = getService();
  RoboApp.logger.log('getAuthorizationUrl '+driveService.getAuthorizationUrl());
  
  
  var isAuthorized = driveService.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}

