// Define global variables needed to access Picasa Web Albums Data API
var SCOPE = 'http://picasaweb.google.com/data/';
var URL = "https://picasaweb.google.com/data/feed/api/user/default";
var NAME = 'lh2';

var PicasaApp = {
    success:false,
    data:{
        token:false
    }
};

PicasaApp.getContentText = function(url,param) {
    var result = {};
    try {
        PicasaApp.success = true;
        if (typeof(param) == 'undefined' ) param = PicasaApp.getUrlFetchOptions();
        result = UrlFetchApp.fetch(url, param ).getContentText();
    } catch(e) {
        PicasaApp.success = false;
        RoboApp.logger.log('error:'+JSON.stringify(e));
    }
    return result;
}

PicasaApp.getBlob = function(url,param) {
    var result = {};
    try {
        PicasaApp.success = true;
        if (typeof(param) == 'undefined' ) param = PicasaApp.getUrlFetchOptions();
        result = UrlFetchApp.fetch(url, param ).getBlob();
    } catch(e) {
        PicasaApp.success = false;
        RoboApp.logger.log('error:'+JSON.stringify(e));
    }
    return result;
}

PicasaApp.getResponseCode = function(url,param) {
    var result = {};
    try{
        PicasaApp.success = true;
        result = UrlFetchApp.fetch(url, param ).getResponseCode();
    } catch(e) {
        PicasaApp.success = false;
        RoboApp.logger.log('error:'+JSON.stringify(e));
    }
    return result;
}

/**
 * Creates file storage to save token, useful to reduce calling "urlFetch".
 *
 * @param  {string} title new Album name
 * @param  {object} optAdvancedArgs
 * @return {Album} newly created album
 */
PicasaApp.oauth = {
    fileName:'authentication-info.txt',
    initialized:false,
    accesGranted:false,
    AuthorizationUrl:'',
    data: {}
}

var fileProto = PicasaApp.oauth;

fileProto.checked =  function() {
    var file,count = 0;
    var e = fileProto;
    fileProto.files = DriveApp.getFilesByName(e.fileName);
    while (e.files.hasNext()) {
        count += 1;
        file = fileProto.files.next();
        if (count === 1) {
            e.fileObject =  file;
        } else {
            e.files.setTrashed(true);
        }
    }
    if (count == 0) {
        DriveApp.createFile(e.fileName,'{"token":false}','text/plain');
        return false;
    }
    return true;
}

fileProto.get = function() {
    var e = fileProto;
    if (e.initialized) return e;
    if ( !e.checked() ) e.checked();
    if (e.fileName == e.fileObject.getName()) {
        this.data = JSON.parse( e.fileObject.getBlob().getDataAsString() );
    }
    e.initialized = true;
    return e;
}

fileProto.put =  function() {
    var e = fileProto;
    e.fileObject.setContent(JSON.stringify(e.data));
    return this;
}

fileProto.getToken =  function() { 
    var e = fileProto; var alb = PicasaApp.falbums;
    if (!e.initialized) e.get();
    if (e.data.token) return e.data.token;
    RoboApp.logger.log('oauth create Service');
    var service = e.getService(); alb.get(); 
    if (!service.hasAccess()) {
        e.data.AuthorizationUrl = service.getAuthorizationUrl();
        e.data.token = false; 
        alb.data.token = false; alb.data.config.token.invalid = true; e.put(); alb.put();
        RoboApp.logger.log('oAuthConfig has ho access!!');
        RoboApp.logger.log('Please Authorize using these link : ' + e.data.AuthorizationUrl );
        return {};
    }    
    RoboApp.logger.log('Acces Granted');
    e.data.token = service.getAccessToken();
    alb.data.config.token.invalid = false;
    alb.data.token = e.data.token;
    e.put(); alb.put();
    return e.data.token;
}

PicasaApp.getUrlFetchOptions = function() {
  return {
            //contentType : "application/json",
            headers : {
                         Authorization : "Bearer " + PicasaApp.oauth.getToken()
                         //Accept : "application/json"
                        },
            muteHttpExceptions : true            
         };
}


fileProto.getService = function () {
  var web = {client_id  :"744476467212-po06vq5hrvt73nilpsaifaejsdht3fja.apps.googleusercontent.com",
             project_id :"project-id-7443741285673408010",
             auth_uri   :"https://accounts.google.com/o/oauth2/auth",
             token_uri  :"https://accounts.google.com/o/oauth2/token",
             auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
             client_secret:"zv8wujkf1WNppTcH2Jd-VXF1"};
            
  // Create a new service with the given name. The name will be used when
  // persisting the authorized token, so ensure it is unique within the
  // scope of the property store.
  return OAuth2.createService(NAME)

      // Set the endpoint URLs, which are the same for all Google services.
      .setAuthorizationBaseUrl(web.auth_uri)
      .setTokenUrl(web.token_uri)
      // Set the client ID and secret, from the Google Developers Console.
      .setClientId(web.client_id)
      .setClientSecret(web.client_secret)

      // Set the name of the callback function in the script referenced
      // above that should be invoked to complete the OAuth flow.
      .setCallbackFunction('PicasaAuthCallback')

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

}

/**
 * Creates file storage to save photo albums, reducing calling "urlFetch".
 *
 */
PicasaApp.falbums = {
    fileName:'albums-file.txt',
    initialized:false,
    fileObject:false,
    default_: {token:false,config:{album:{initialized:false,targetTransfer:false},token:{initialized:false,invalid:false}},albums:false},
    data: {}
}

var palbum = PicasaApp.falbums;

palbum.checked =  function() {
    var file,count = 0;
    var e = palbum;
    e.files = DriveApp.getFilesByName(e.fileName);
    while (e.files.hasNext()) {
        count += 1;
        file = e.files.next();
        if (count === 1) {
            e.fileObject =  file;
        } else {
            e.files.setTrashed(true);
        }
    }
    if (count == 0) {
        DriveApp.createFile(e.fileName,JSON.stringigy(palbum.default_),'text/plain');
        return false;
    }
    return true;
}

palbum.get = function(noLogger) {
    var e = palbum;
    if (e.initialized) return e;
    if (typeof(noLogger) == undefined) RoboApp.logger.log('Reading proxy storage');
    if ( !e.checked() ) e.checked();
    if (e.fileName == e.fileObject.getName()) {
        try{
            e.data = JSON.parse( e.fileObject.getBlob().getDataAsString() );
        } catch(e) {
            e.data = e.default_;
        } 
    }
    e.initialized = true;
    return e;
}

palbum.put =  function() {
    var e = palbum;
    if (e.fileObject === false ) e.get(true);
    RoboApp.logger.log('Writing proxy storage');
    e.fileObject.setContent(JSON.stringify( e.data )); 
    return this;
}

// public fuction, accessed by page_7.html page
function checkAuthorization() {
  var e = PicasaApp.falbums;e.get(); 
  return {token_invalid: e.data.config.token.invalid}
}

function setTargetTransfer(albumId) {
    var e = palbum; e.get(true);
    //RoboApp.logger.log('writing target transer id: '+albumId);
    e.data.config.album.targetTransfer = albumId;
    e.put();
    return albumId;
}

function resetProxyStorage() {
    RoboApp.logger.clear();
    var e = PicasaApp.falbums;
    e.get();
    RoboApp.logger.log('Clearing data album storage');
    var config = e.data.config; var token = e.data.token;
    e.data = e.default_;
    e.data.config = config; e.data.token = token;
    e.put();
}

PicasaApp.Title_2_ID = function(TextID) {
    var id = TextID.toUpperCase().replace('.','');
    for (var x = 0; x < 5 ; x++ ) {
        id = id.replace(' ','').replace('(','').replace(')','').replace('@','').replace(' ','').replace('-','');
        id = id.replace('!','').replace('=','').replace('£','');
    }
    return id;
}

function transferThisPhoto(photoID, albumID) { 
    RoboApp.logger.clear();
    var e = PicasaApp.falbums; e.get();
    var targetID = e.data.config.album.targetTransfer;
    var src = PicasaApp.getAlbumById(albumID); 
    var tgt = PicasaApp.getAlbumById(targetID); 
    RoboApp.logger.log('Init Transfer Photo from '+albumID);
    var photos = src.getPhotos();
    for (var i = 0; i < photos.length; i++) {
        var ft = photos[i];
        var fID = PicasaApp.Title_2_ID( ft.getTitle() );
        if (fID == photoID) {
            RoboApp.logger.log('Prepare Transfer Photo');
            tgt.addPhoto(ft.getBlob(),photoID);
            e.data.albums.list[targetID] = false;
        }
    } 
    return {html:OpenAlbumID(albumID).text,pID:photoID}  
}

/**
 * Creates an Album with the given name in Picasa.
 *
 * @param  {string} title new Album name
 * @param  {object} optAdvancedArgs
 * @return {Album} newly created album
 */
PicasaApp.createAlbum = function (title, optAdvancedArgs) {
  if (optAdvancedArgs != undefined) {
    if (optAdvancedArgs.description == undefined) var description = '';
    else var description = optAdvancedArgs.description;
    if (optAdvancedArgs.location == undefined) var location = '';
    else var location = optAdvancedArgs.location;
    if (optAdvancedArgs.visibility != 'public' && optAdvancedArgs.visibility != 'unlisted') var visibility = 'private';
    else var visibility = optAdvancedArgs.visibility;
    if (optAdvancedArgs.date == undefined) var date = new Date().getTime();
    else var date = new Date(optAdvancedArgs.date).getTime();
    if (optAdvancedArgs.tags == undefined) var tags = '';
    else var tags = optAdvancedArgs.tags;
  }
  else {
    var description = '';
    var location = '';
    var visibility = 'private';
    var date = new Date().getTime();
    var tags = '';
  }
  var xmlOutput = PicasaApp.picasaRequest_('post', "\
      <entry xmlns='http://www.w3.org/2005/Atom'\
      xmlns:media='http://search.yahoo.com/mrss/'\
      xmlns:gphoto='http://schemas.google.com/photos/2007'>\
      <title type='text'>" + title + "</title>\
      <summary type='text'>" + description + "</summary>\
      <gphoto:location>" + location + "</gphoto:location>\
      <gphoto:access>" + visibility + "</gphoto:access>\
      <gphoto:timestamp>" + date + "</gphoto:timestamp>\
      <media:group><media:keywords>" + tags + "</media:keywords></media:group>\
      <category scheme='http://schemas.google.com/g/2005#kind'\
      term='http://schemas.google.com/photos/2007#album'></category>\
      </entry>\
      ");
  var album = new PicasaApp.album(xmlOutput.getElement(),this);
  return album;
}

/**
 * Returns all the Photos that contain the specified query string in your gallery.
 *
 * @param  {string} query the search query to match
 * @param  {boolean} optCommunity Optional flag indicating community pictures should be returned.
 * @return {Photo[]} any photo with title, caption or tag matching the search query
 */
PicasaApp.find = function(query, optCommunity) {
    if (optCommunity) {
        var url = 'https://picasaweb.google.com/data/feed/api/all?q=' + query;
        var data = PicasaApp.getContentText( url );
        if (!PicasaApp.success) return [];
        var xmlOutput = Xml.parse(data, false);
    }
    else {
        var xmlOutput = PicasaApp.picasaRequest_('get', '?kind=photo&q=' + query);
    }
    var temp = xmlOutput.getElement().getElements('entry');
    var photos = [];
    for (var i = 0; i < temp.length; i++) {
        photos[i] = new PicasaApp.photo(temp[i]);
    }
    return photos;
}

function objectIsOk(o) {
    return (typeof(o) == 'object'  ) 
}

debug = {
    exec: { getStructure:false,
            force : { stop : false
                    }
        }
}

/**
 * Returns all the Albums in Picasa.
 *
 * @return {Album[]} the Albums in Picasa
 */
PicasaApp.getAlbums = function () {
    var proxy = PicasaApp.falbums;  
    var tm, temp; 
    proxy.get();  
    if ( !objectIsOk(proxy.data.albums) || !proxy.data.config.album.initialized ) {
        RoboApp.logger.log('Reading From Network'); 
        var xmlOutput = PicasaApp.picasaRequest_('get');
        if (!PicasaApp.success) return {};
        var tm = JSON.parse(JSON.stringify( xmlOutput )); //(
        proxy.data.albums = tm;
        proxy.data.albums.list = {};
        proxy.data.config.album.initialized  = true;
        proxy.put();
    } else {
        tm = proxy.data.albums;
        PicasaApp.success = true;

    }
    temp = tm.feed.entry;
    var albums = [];
    for (var i in temp ) {
        if (!objectIsOk(temp[i].bytesUsed) ) {
            temp[i].bytesUsed = {}; temp[i].bytesUsed.Text = '';
        }
        albums[i] = new PicasaApp.album(temp[i]);
    }
    return albums;
}

/**
 * Returns the Album at the given id.
 *
 * @param  {string} id the album id
 * @return {Album} the Album at the given id
 */
PicasaApp.getAlbumById = function (id) {
    var proxy = PicasaApp.falbums;  
    proxy.get(); 
    var tm = proxy.data.albums;
    var temp = tm.feed.entry;
    for (var i in temp ) {
        if (temp[i].id[1].Text == id ) {
            return new PicasaApp.album(temp[i]);
        }
    }
    RoboApp.logger.log('getAlbumById not Found! :'+id);
    return false;
}

/* 

- - - - - - - Class Album - - - - - - - 

Members:

- addPhoto()
- deleteAlbum()
- find(query)
- getDatePublished()
- getDescription()
- getId()
- getLastUpdated()
- getLocation()
- getNumberOfPhotos()
- getPhotos()
- getSize()
- getTitle()
- getVisibility()
- setDescription(description)
- setLocation(location)
- setTitle(title)
- setVisibility(visibility)

*/



// Namespaces
var gphoto = 'http://schemas.google.com/photos/2007';

PicasaApp.album = function (album) {
    this.album = album;
    this.id = album.id[1].Text;
};

var albumClass = PicasaApp.album.prototype;

albumClass.addPhoto = function (blob, optCaption) {
    RoboApp.logger.log('Begin Transfer Photo');
    var authorizedFormats = 'image/bmp, image/gif, image/jpeg, image/png, video/3gpp, video/avi, video/quicktime,';
    authorizedFormats += ' video/mp4, video/mpeg, video/mpeg4, video/msvideo, video/x-ms-asf, video/x-ms-wmv, video/x-msvideo';
    if (authorizedFormats.indexOf(blob.getContentType()) == -1) throw 'Error: wrong format';
    if (Math.round(blob.getBytes().length / 1000000) > 5) throw 'Error: 5MB is the size limit';
    if (optCaption != undefined && typeof(optCaption)!='string') throw 'Caption should be a string';
    var id = this.id;
    RoboApp.logger.log('Transfering Photo');
    var xmlOutput = gasCall(function(){return PicasaApp.picasaRequest_('addPhoto', [blob, optCaption], '/albumid/' + id);});
    RoboApp.logger.log('done.. ');
    return new PicasaApp.photo(xmlOutput.entry);
};


albumClass.deleteAlbum = function () {
    var url = findUrlToUpdateElement_(this.album);
    var xmlOutput = PicasaApp.picasaRequest_('delete', '', url);
    if (xmlOutput = '404') {
        RoboApp.logger.log('Gagal menghapus Album '+this.id+' msg: Not found!');
    } else {
        RoboApp.logger.log('Album '+this.id+' removed '+xmlOutput);
    }
};

albumClass.find = function (query) {
    this.getId();
    var xmlOutput = PicasaApp.picasaRequest_('get', '/albumid/' + this.id + '?kind=photo&q=' + query);
    var temp = xmlOutput.getElement().getElements('entry');
    var photos = [];
    for (var i = 0; i < temp.length; i++) {
      photos[i] = new PicasaApp.photo(temp[i],this);
    }
    return photos;
};

albumClass.getDatePublished = function () {
    return new Date( this.album.published.Text );
};

albumClass.getDescription = function () {
    return this.album.summary.Text;
};

albumClass.getId = function () {
    this.id = this.album.id[1].Text;
    return this.id;  
};

albumClass.getLastUpdated = function () {
    return new Date(this.album.updated.Text);
};

albumClass.getLocation = function () {
    return this.album.location.Text;
};

albumClass.getNumberOfPhotos = function () {
  return this.album.numphotos.Text;
};

//debug.exec.getStructure = true;

albumClass.getPhotos = function () {
    var temp, xmlOutput, proxy = PicasaApp.falbums;
    this.getId(); 
    if (!debug.exec.force.stop && objectIsOk(proxy.data.albums.list[this.id])) {
        //RoboApp.logger.log('Reading from Server Storage');
        temp = proxy.data.albums.list[this.id] ;
    } else {
        RoboApp.logger.log('Reading from Network');
        xmlOutput = PicasaApp.picasaRequest_('get', '/albumid/' + this.id);
        var tm = JSON.parse(JSON.stringify( xmlOutput ));
        temp = tm.feed.entry
        proxy.data.albums.list[this.id] = temp;
        proxy.put();
    } 
    if  (debug.exec.getStructure) {
        RoboApp.logger.log('done!!');
        return objAsTable(JSON.parse(JSON.stringify(temp[1])));
    }
    var photos = [];
    //for (var i = 0; i < temp.length; i++) {
    var index = 0;
    for (var i in temp ) {
        temp[i].index = index;
        photos[index] = new PicasaApp.photo(temp[i],this);
        index++;
    }
    return photos;
}; 

albumClass.getSize = function () {
  return this.album.bytesUsed.Text ;
};

albumClass.getTitle = function () {
  return this.album.title.Text;
};

albumClass.getVisibility = function () {
  return this.album.rights.Text;
};

albumClass.setDescription = function (text) {
  var url = findUrlToUpdateElement_(this.album);
  var xmlOutput = PicasaApp.picasaRequest_('patch', "<summary type='text'>" + text + "</summary>", url);
};

albumClass.setLocation = function (text) {
  var url = findUrlToUpdateElement_(this.album);
  var xmlOutput = PicasaApp.picasaRequest_('patch', "<gphoto:location>" + text + "</gphoto:location>", url);
};

albumClass.setTitle = function (text) {
  var url = findUrlToUpdateElement_(this.album);
  var xmlOutput = PicasaApp.picasaRequest_('patch', "<title type='text'>" + text + "</title>", url);
};

albumClass.setVisibility = function (text) {
  if (text != 'public' && text != 'unlisted' && text != 'private') throw 'Error: Visibility must be either ' + 'public or unlisted or private';
  var url = findUrlToUpdateElement_(this.album);
  var xmlOutput = PicasaApp.picasaRequest_('patch', "<gphoto:access>" + text + "</gphoto:access>", url);
};

/* 

- - - - - - - Class Photo - - - - - - - 

Members:

- deletePhoto()
- getAlbum()
- getBlob()
- getCaption()
- getDatePublished()
- getHeight()
- getLastUpdated()
- getSize()
- getTitle()
- getUrl()
- getWidth()
- setAlbum(album)
- setCaption(caption)
- setTitle(title)

*/

PicasaApp.photo = function (photo,owner) {
  this.owner = owner;
  this.photo = photo;
};

var photoClass = PicasaApp.photo.prototype;

photoClass.deletePhoto = function () {
    var url = findUrlToUpdateElement_(this.photo);
    var StatusCode = PicasaApp.picasaRequest_('delete', '', url);
    // status code 200 means operation success, 
    if (StatusCode == '200' || StatusCode == '404') {
        var tmp = {}; var count = 0; var proxy = PicasaApp.falbums; proxy.get(); 
        var albm = proxy.data.albums.list[this.owner.id]; 
        var index = this.photo.index;
        for (var idx in albm ) if (idx != index) tmp[count++] = albm[idx]; 
        proxy.data.albums.list[this.owner.id] = tmp; proxy.put();
        RoboApp.logger.log(this.getTitle()+' Berhasil dihapus');
    } else if (StatusCode == '404' ) {
        RoboApp.logger.log('Error 404: '+this.getTitle() +' Not Found' );
    }
  
};

photoClass.getAlbum = function () {
  var id = this.photo.albumid.Text;
  var xmlOutput = PicasaApp.picasaRequest_('get', '/albumid/' + id);
  var album = new PicasaApp.album(xmlOutput.getElement());
  return album;
};

photoClass.getBlob = function () {
    var url = this.photo.content.src;
    var blob = PicasaApp.getBlob( url );
    if (!PicasaApp.success) return null;
    return blob;
};

photoClass.getCaption = function () {
  return this.photo.summary.Text;
};

photoClass.getDatePublished = function () {
  return new Date(this.photo.published.Text);
};

photoClass.getHeight = function () {
  return this.photo.height.Text;
};

photoClass.getLastUpdated = function () {
  return new Date(this.photo.updated.Text);
};

photoClass.getSize = function () {
  return this.photo.size.Text;
};

photoClass.getTitle = function () {
  return this.photo.title.Text;
};

photoClass.getUrl = function () {
  return this.photo.content.src;
};

photoClass.getWidth = function () {
  return this.photo.width.Text;
};

photoClass.setAlbum = function (album) {
  var url = findUrlToUpdateElement_(this.photo);
  var xmlOutput = PicasaApp.picasaRequest_('patch', "<gphoto:albumid>" + album.getId() + "</gphoto:albumid>", url);
};

photoClass.setCaption = function (text) {
  var url = findUrlToUpdateElement_(this.photo);
  var xmlOutput = PicasaApp.picasaRequest_('patch', "<summary type='text'>" + text + "</summary>", url);
};

photoClass.setTitle = function (text) {
  var url = findUrlToUpdateElement_(this.photo);
  try {
    var xmlOutput = PicasaApp.picasaRequest_('patch', "<title type='text'>" + text + "</title>", url);
  }
  catch (e) {
    throw 'Error: Photo title should follow this pattern: myPhoto.jpg';
  }
};

/* - - - - - - - Utilities - - - - - - - */

PicasaApp.picasaRequest_ = function(method, query, url) {
  //RoboApp.logger.log('Auntentication test');
  if (query == undefined) query = '';
  var base = "https://picasaweb.google.com/data/feed/api/user/default";
  var fetchArgs = PicasaApp.getUrlFetchOptions() ;
  //fetchArgs.headers = {};
  fetchArgs.headers['GData-Version'] = '2';
  fetchArgs.method = method;
  if (method == 'get') {
    url = base + query;
  }
  else if (method == 'post') {
    url = base;
    fetchArgs.contentType = 'application/atom+xml';
    fetchArgs.payload = query;
  }
  else if (method == 'delete') {
    fetchArgs.headers['If-Match'] = '*';
    return PicasaApp.getResponseCode(url, fetchArgs);
  }
  else if (method == 'patch') {
    fetchArgs.method = 'post';
    fetchArgs.headers['X-HTTP-Method-Override'] = 'PATCH';
    fetchArgs.headers['If-Match'] = '*';
    fetchArgs.contentType = 'application/xml';
    fetchArgs.payload = "<entry xmlns='http://www.w3.org/2005/Atom' xmlns:media='http://search.yahoo.com/mrss/' ";
    fetchArgs.payload += "xmlns:gphoto='http://schemas.google.com/photos/2007'>" + query + "</entry>";
  }
  else if (method == 'addPhoto') {
    fetchArgs.headers['MIME-version'] = "1.0";
    fetchArgs.method = 'post';
    var boundary = 'END_OF_PART_1234_1234_1234_1234';
    var boundaryFull = "\r\n--" + boundary + "\r\n";
    fetchArgs.contentType = 'multipart/related; boundary="' + boundary + '"';
    var metadataXml = "<entry xmlns='http://www.w3.org/2005/Atom'>";
    metadataXml+= "<title>" + query[0].getName() + "</title>"; 
    if (query[1] != undefined) metadataXml+="<summary>" + query[1] + "</summary>";
    metadataXml+="<category scheme='http://schemas.google.com/g/2005#kind' ";
    metadataXml+="  term='http://schemas.google.com/photos/2007#photo'/>" + "</entry>";
    var payload = toBytes_("Media multipart posting" + boundaryFull);
    payload = payload.concat(toBytes_("Content-Type: application/atom+xml\r\n\r\n"));
    payload = payload.concat(toBytes_(metadataXml));
    payload = payload.concat(toBytes_(boundaryFull));
    payload = payload.concat(toBytes_("Content-Type: " + query[0].getContentType() + "\r\n\r\n"));
    payload = payload.concat(query[0].getBytes());
    payload = payload.concat(toBytes_(boundaryFull));
    fetchArgs.payload = payload;
    url = base + url;
    RoboApp.logger.log("Add Photo");
  }
  var data = PicasaApp.getContentText(url, fetchArgs);
  var ctxt = JSON.stringify(data);
  if ( ctxt.search("Token invalid") > 0 ) {
    var driveService = PicasaApp.oauth.getService(); 
    RoboApp.logger.log("Token is Invalid! Please authorize :" +driveService.getAuthorizationUrl());
    PicasaApp.success = false;
    PicasaApp.oauth.data.token = false;
    PicasaApp.oauth.put();
  }
  if (!PicasaApp.success) return {};
  
  var xmlOutput = {};
  try{
    var xmlOutput = Xml.parse(data, false);
  } catch(e) {
    RoboApp.logger.log('error '+ e );
    RoboApp.logger.log('data '+ data );
  }
  
  return xmlOutput;
}

function findUrlToUpdateElement_(element) {
    var links = element.link;
    var url = '';
    for (var i = 0; i < links.length; i++) {
        if (links[i].rel == 'edit' ) {
            return links[i].href;
        }
    }
    return '';
}

/*
Here's Peter Herrmann implementation of the exponential backoff pattern presented
in the Google Developer Blog [1] and covered in the Google Apps developer docs [2].
It will retry with delays of approximately 1, 2, 4, 8 then 16 seconds for a total of 
about 32 seconds before gives up and rethrows the last error. 
[1] http://googleappsdeveloper.blogspot.com.au/2011/12/documents-list-api-best-practices.html
[2] https://developers.google.com/google-apps/documents-list/#implementing_exponential_backoff
*/
function gasCall(f) {
  for (var n = 0; n < 6; n++) {
    try {
      return f();
    }
    catch (e) {
      if (n == 5) {
        throw e;
      }
      Utilities.sleep((Math.pow(2, n) * 1000) + (Math.round(Math.random() * 1000)));
    }
  }
}

/* 
From slieberman@google.com - Converts a string to bytes. 
http://code.google.com/p/google-apps-script-issues/issues/detail?id=1387
*/
function toBytes_(str) {
  return Utilities.newBlob(str).getBytes();
}

function PicasaAuthCallback(request) {
    RoboApp.logger.log('PicasaAuthCallback is called');
    var driveService = PicasaApp.oauth.getService();
    RoboApp.logger.log('getAuthorizationUrl '+driveService.getAuthorizationUrl());
    var isAuthorized = driveService.handleCallback(request);
    if (isAuthorized) {
        var e = PicasaApp.oauth; var proxy = PicasaApp.falbums; proxy.get();
        if (typeof(e.fileObject) == 'undefined') e.get();
        e.data.token = driveService.getAccessToken();
        proxy.data.token = e.data.token; proxy.data.config.token.invalid = false; 
        e.put(); proxy.put();
    return HtmlService.createHtmlOutput('Success! You can close this tab.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this tab');
  }
}
