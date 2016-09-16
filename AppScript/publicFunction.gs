var decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

var encodeHtmlEntity = function(str) {
  var buf = [];
  for (var i=str.length-1;i>=0;i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }
  return buf.join('');
};

var entity = '&#39640;&#32423;&#31243;&#24207;&#35774;&#35745;';
var str = '??????';

function getDelayedList() {
    return ofile.delayed_get_list();
}
 
function postDelayedList() {
    scheduler.init();
    ofile.delayed_do_post();
    return ofile.delayed_get_list();
}

function doRemoveFromDelayedList(status_id) {
    ofile.get();
    ofile.delayed_stat_remove(status_id);
    ofile.put();
    return {"result":true,"user_id":status_id,"message":"Success, please wait.."}
  
}

function getFeedList() {
    return ofile.feed_get_list();
}


function doReadHistory(readFile,timeCount) {
	scheduler.init();
	var sc_msg = (scheduler.action.selected.run)?'':' (Not Running)';
	if (timeCount==undefined) timeCount=0;
	if (LogString!='') LogString +=  '<br/>';
	var s = LogString+ 'counter: '+ofile.data.counter+' timerTick(' +timeCount+')<br/>'+ofile.data.data;
	return ofile.stdListReturn(s, { schedule : scheduler.action.selected.name + sc_msg })
}

function getHistoryList() {
    return ofile.get_history_list();
}

function doReadNewList(start_index) {
	scheduler.init();
	var sc_msg = (scheduler.action.selected.run)?'':' (Not Running)';
	if (LogString!='') LogString +=  '<br/>';
	var s = LogString+ ofile.get_new_list(start_index,0);
	return ofile.stdListReturn(s, { schedule : scheduler.action.selected.name + sc_msg })
}
function isLikeEnabled() {
   return ofile.data.liker_enabled;
}

function setLikeEnabled(postState,likeState,cmtState) {
	scheduler.init();
	ofile.data.post_enabled = postState;
	ofile.data.liker_enabled = likeState;
	ofile.data.comment_enabled = cmtState;
	ofile.put();
	if (LogString!='') LogString +=  '<br/>';
	var s = LogString+'counter: '+ofile.data.counter+' timerTick(0)<br/>'+ofile.data.data+ofile.get_new_list();
	return ofile.stdListReturn(s)
}

function doClearHistory() {
	ofile.get();
	ofile.data.counter =0; ofile.data.data=""; ofile.data.history = {};
	ofile.put();
	return ofile.stdListReturn('Cleared')
}


function doSomething(counter_tick) {
    scheduler.init();if(counter_tick==undefined) counter_tick = 0;
    if (!scheduler.action.result || !scheduler.action.selected.run) return scheduler.schecule_message();
    wall.like();
    if (ofile.html_liked != '') ofile.html_liked = "<hr/>Liker executed:\n<br/><hr/>"+ofile.html_liked;
    var s = "Executed at "+timer.fetch()+"\n<br/>update count :"+
            wall.update_count+" ( Max Like "+scheduler.MaxLike+" Jempol per Execute )"+ofile.html_str +" \n<br/>x"+ ofile.html_liked;
     ofile.data.data = s;
     if (LogString!='') LogString +=  '<br/>';
     s = LogString+'counter: '+(ofile.data.counter+1)+' timerTick(' +counter_tick+')<br/>'+ofile.data.data;//+ofile.get_new_list();
     ofile.put();
	return ofile.stdListReturn(s)
}

function triggerForFeed(nedd_results) {
    scheduler.init();
    ofile.html_str = ofile.data.data = ofile.html_liked = '';
    ofile.check_registered();
    if (nedd_results) return ofile.feed_get_list();
}

function toggleUserActive(user_id) {
    scheduler.init();
    return ofile.toggleUserActive(user_id);
}


function doPostData(user_id,user_name){
    ofile.get();
    ofile.add_user(user_id,user_name,ofile.is_def_user_exist(user_id));
    ofile.rm_new_list(user_id);
    ofile.put();
    return user_id;
}
function doPostRemoveData(user_id){
    ofile.get();
    ofile.rm_user(user_id);
    var is_permanent = ofile.is_def_user_exist(user_id);
    ofile.put();
    if (is_permanent) return {"result":false,"user_id":user_id,"message":"This is Permanent user!"};
    return {"result":true,"user_id":user_id,"message":"Success Remove"}
}

function RevalidateDefUser() {
   scheduler.init();
   return ofile.revalidate_def_user(true);
}

function getTopPoster() {
   scheduler.init();
   return ofile.get_top_poster(true);
}


function getDataByStatusId(status_id,line_id) {
   scheduler.init();
  return {line_id:line_id,status_id:status_id,result:ofile.getDataByStatusId(status_id)};
}

function reset_total_post() {
   scheduler.init();
   return ofile.reset_total_post(true);
}


function getAppUrl() {
   return cfg.url; 
   return ScriptApp.getService().getUrl();
}

function includeCss(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
       .getContent(); 
}
function includeJS(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
       .getContent(); 
}

function doSundulStatus() {
    scheduler.init(true);
    
    RoboApp.logger.clear();
    RoboApp.logger.log('Posting a picture');
    //UrlFetcher.postComment('10200265382298639','test');
    //RoboApp.logger.log('exit Program ');
    //return;
    //ofile.revalidate_def_user();
  //10200777094251118
    //scheduler.auto_sundul();
    UrlFetcher.postPhoto('test..',
    "https://lh3.googleusercontent.com/-97MVwupyr5I/VaQWEWPQJKI/AAAAAAAAHa0/W67NjcIdXmQVnC5TTTo7zVXOADC8gFG-ACHM/FB_IMG_1436816764369.jpg"
                        );
    //ofile.html_str = ofile.data.data = ofile.html_liked = '';
    //var result = ofile.check_registered();
    //if (LogString!='') LogString +=  '<br/>';
    //var s = LogString+'counter: '+ofile.data.counter+' timerTick(0)<br/>' +ofile.html_str+ofile.data.data+ofile.get_new_list();
    return ofile.stdListReturn('done',{schedule:'Results',stopTimer:true})
}

function RunPicasa() {
    var theAlbums = new googlePhoto().loadAlbums();
    return theAlbums.show_1();
}

function RemoveInAlbum(AlbumToRemove) {
    var theAlbums = new googlePhoto().loadAlbums();
    theAlbums.operation.remove.album = true;
    theAlbums.operation.remove.target = AlbumToRemove;
    return theAlbums.show_1();
}


function RemoveInPicasa(photoName,albumId) {
    var theAlbums = new googlePhoto().loadAlbums();
    theAlbums.operation.open.album = true;
    theAlbums.operation.open.target = albumId;

    theAlbums.operation.remove.foto = true;
    theAlbums.operation.remove.target = photoName;
    theAlbums.operation.remove.target2 = albumId;
    return theAlbums.show_1();
}

function OpenAlbumID(albumId) {
    var theAlbums = new googlePhoto().loadAlbums();
    theAlbums.operation.open.album = true;
    theAlbums.operation.open.target = albumId;
    theAlbums.operation.open.target2 = albumId;
    return theAlbums.show_1();
}


function doGetAuthToken() {
  PicasaApp.oauth.get();
  return PicasaApp.oauth.data.token;
}

var gOAuth = {client_id  :"744476467212-po06vq5hrvt73nilpsaifaejsdht3fja.apps.googleusercontent.com",
              project_id :"project-id-7443741285673408010",
              auth_uri   :"https://accounts.google.com/o/oauth2/auth",
              token_uri  :"https://accounts.google.com/o/oauth2/token",
              auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
              client_secret:"zv8wujkf1WNppTcH2Jd-VXF1",
              
              scope: 'http://picasaweb.google.com/data',
              serviceName:'lh2',
              callback:'PicasaAuthCallback'
             };


function removeindex(toremove,index) {
    var tmp = {};
    for (var id in toremove) if (id != index ) tmp[id] = toremove[id];
    return tmp;
}

function buildAuthorizationUrl(params) {


  var scriptId = eval('Script' + 'App').getScriptId();

  var redirectUri = Utilities.formatString('https://script.google.com/macros/d/%s/usercallback', scriptId);
  var state = eval('Script' + 'App').newStateToken()
      .withMethod(params.callback)
      .withArgument('serviceName', params.serviceName )
      .withTimeout(3600)
      .createToken();

    params.response_type = 'code';
    params.redirect_uri  = redirectUri;
    params.state =  state;
  
    params = removeindex(params,'callback');
    params = removeindex(params,'serviceName');
  
  
  var paramString = Object.keys(params).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
  
  return { state : state,
           authorization: params.auth_uri + (params.auth_uri.indexOf('?') >= 0 ? '&' : '?') + paramString 
        }
   
  
};

function setAuthStateVar() {
  scheduler.init(true);
  var p = gOAuth;
  p = removeindex(removeindex(removeindex(removeindex(p,'auth_provider_x509_cert_url'),'project_id'),'token_uri'),'client_secret');
  var q =  buildAuthorizationUrl(p);
  var v  = "<script type=\"text/javascript\">\n\n"+ 
           "var authorization = {\n"+
           '    fbId:"'+ofile.data.my.info.id+"\",\n"+  
           '    url:"'+q.authorization+"\",\n"+
           '    state: "'+q.state+"\", \n"+
           '    token:"'+PicasaApp.oauth.get().getToken()+"\",\n"+  
           '    fb_access_token:"'+cfg.token+"\"\n"+    
           "};\n</script>";
  return v; 
}

function isObject(o) {
  return typeof(o) != 'undefined'
}

function getfalbums() {
    var theAlbums = new googlePhoto().loadAlbums();
    return theAlbums.showAlbums();
}

function getStructure() {
  
    var e = PicasaApp.falbums;
    e.get();
    var data =  e.data.albums.feed.entry;
    var tmp = {};
    var links = {};
    var pict = {};
    var out = '';
    var count = 0;
    var albums = {};
  
    for (var index in data) { // && 
        var ob = data[index];
    
        if ( isObject(ob.albumType) ) {
            albums[index] = {};
            var albm = albums[index];
            albm.albumType = ob.albumType.Text;
            albm.name = ob.name.Text;
            albm.numphotos = isObject(ob.numphotos)?ob.numphotos.Text:0;
            
            if (isObject(ob.group) && isObject(ob.group.content) 
                && isObject(ob.group.content) & isObject(ob.group.content.url)) albm.pict = ob.group.content.url;
       
            if ( isObject(ob.link) ) {
                albm.link = {};
                var cn = 0;
                for (var seq in ob.link) {
                    var str = ob.link[seq].href;
                    var n = str.indexOf("/albumid/")+9;
                    albm.link[cn] = {};
                    albm.link[cn].pict = str;
                    albm.link[cn].id = ( n <= 9 ? count : str.substring(n,str.length ) );
                    cn++;
                }
            }
       
     }
       
    if ( typeof(ob.albumType) != 'undefined' && ob.albumType.Text == 'Blogger' ) {
      tmp[index] = ob;
      
     if ( isObject(ob.link) ) {
          for (var seq in ob.link) {
            var str = ob.link[seq].href;
            var n = str.indexOf("/albumid/")+9;

            links[count] = {};
            links[count].pict = str;
            links[count].id = ( n <= 9 ? count : str.substring(n,str.length ) );
            count += 1;
          }
     }
     
    }
    
     if (isObject(ob.group) && isObject(ob.group.content) 
         && isObject(ob.group.content) & isObject(ob.group.content.url)) pict[index] = ob.group.content.url;
    
   }
    for (var index in links) { // href="'+links[index].pict+'" target="_blank" 
      out += '<a onClick=\'openTheAlbum("'+links[index].pict+'")\'>click this '+links[index].id+'</a><br/>';
    }
    //for (var index in pict) {
      //out += '<img src="'+pict[index]+'"/>';
    //}
   return objAsTable(data)+'<br>'+out;
}

function openAlbum(url) {
  var data = PicasaApp.getContentText( url );
}

function postToFacebook(url,btId) {
    scheduler.init(true);
    RoboApp.logger.clear();
    RoboApp.logger.log('Posting a picture');
    UrlFetcher.postPhoto('',url);
    RoboApp.logger.log('done');
    return btId;
}
