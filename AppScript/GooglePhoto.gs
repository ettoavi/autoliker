function googlePhoto() {
    RoboApp.logger.clear();
    this.albums = {};
    this.album = {};
    this.photos = {};
    this.title_photo ='';
    this.id_photo ='';
    this.id_album ='';
    this.ophoto = {};
    this.html = '';
    this.operation = {
        remove:{album:false,foto:false,target:false,target2:false},
        open:{album:false,foto:false,target:false,target2:false},
    };
    return this;
}

var gp = googlePhoto.prototype;
gp.loadAlbums = function() {
    //RoboApp.logger.log('googlePhoto.prototype.loadAlbums'); 
    this.albums = PicasaApp.getAlbums();
    if (!PicasaApp.success) RoboApp.logger.log('Failed, "urlfetch" to many execute for today'); 
    return this;
}

gp.setActive = function(index) {
    this.album = this.albums[index];
    return this.album;
}

gp.ShowResetStorageBtn = function() {
    return '<div style="margin: 2px; padding: 4px;height:34px;width:100%;border: 1px solid black;clear:both;"><button id="BTResetA" onClick=\'resetProxyStorage()\'>Reset proxy Storage</button></div>';

}


gp.header = function( num_photo ) {
    this.id_album = this.album.getId();
    return '<div id ="DV'+this.id_album +'" style="float: left; width: 100%;'+
                'margin: 2px; padding: 2px; border: 1px solid black;clear:both;">'+
                '<div style="margin: 5px; padding: 5px;height:27px;width: 95%;border: 1px solid black;clear:both;">Album ID '+this.id_album+
                  ' Album Title: '+ this.album.album.title.Text + ' &nbsp; ' +
                  ' Contains '+ num_photo + ' photos ' +
                    
                '<button id="BA'+this.id_album+'" onClick="removeAlbum(\''+this.id_album+ '\')">Hapus Album Ini</button> </div>';
}
gp.footer = function(oAlbum) {
    return '</div>';
}

gp.getPhotos = function() {
  this.photos = this.album.getPhotos();
  return this.photos;
}

gp.setPhoto = function(index) {
    this.ophoto = this.photos[index];
    this.title_photo = this.ophoto.getTitle();
    this.id_photo = PicasaApp.Title_2_ID(this.title_photo);
    return this.id_photo;
}

gp.bodyphoto = function() {
    var albumType = isObject(this.album.album.albumType)?this.album.album.albumType.Text:'';
    var blogger = albumType == 'Blogger'?true:false;
  var btRemove = blogger?'<button style="width:105px">&nbsp;</button>':'<button style="width:105px" id="BT'+this.id_photo+'" onClick="removeImage(\''+this.id_photo+'\',\''+this.id_album + '\')">Hapus</button>'; 
    return '<div id ="DV'+this.id_photo
           +'" style="float: left; width: 230px;height: 350px;'+
           'margin: 5px; padding: 5px; border: 1px solid black;">'+
           '<div style="margin: 0px; padding: 0px;height:37px;width: 95%;border: 0px solid black;clear:both;">'+  
           this.title_photo +' Size '+this.ophoto.getSize() +
           '</div><img src="'+this.ophoto.getUrl()+'" id="IM'+this.id_photo+'" height="220px" width="350px" />'+btRemove+
           ' <button style="width:106px" id="FB'+this.id_photo+'" onClick="postToFacebook(\''+this.ophoto.getUrl() +'\',\''+ this.id_photo+'\')">Ke Facebook</button>'+
           '<button style="width:218px" id="BTF'+this.id_photo+'" onClick="transferThisPhoto(\'' + this.id_photo +'\',\''+ this.id_album + '\')">Transfer Foto Ini</button><br/>'+  
           '</div>';
}
       
gp.show_1 = function() {
    scheduler.init(true);
    RoboApp.logger.log('Open Albums');
    this.loadAlbums();
    RoboApp.logger.log('finish Albums');
    var title,result = '';
    var count = 0;var countImage=0; var emptyAlbum = {};
    var num_photo = 0; for (var i in this.albums) num_photo += 1;
    result += this.ShowResetStorageBtn();
    for (var i in this.albums) {
        this.setActive(i)
        var albumId = this.album.getId();
        if (this.operation.open.album && albumId != this.operation.open.target) {
            continue;
        }
        if (this.operation.remove.album && albumId == this.operation.remove.target) {
            RoboApp.logger.log(i+' Removing Albums '+AlbumToRemove);
            emptyAlbum[AlbumToRemove] = this.album;
            continue;
        }
        countImage = 0;
        //result += objAsTable(this.album)+'<br>';
        RoboApp.logger.log('preparing album '+this.album.id);
        if  (debug.exec.getStructure) {
          result = this.getPhotos();
          return ofile.stdListReturn(result);
        }
        this.getPhotos();
        
      
        num_photo = 0; for (var j in this.photos) num_photo += 1;
        result += this.header(num_photo);
        for (var j in this.photos) {
            this.setPhoto(j);
            if (this.operation.remove.foto && this.id_photo == this.operation.remove.target && this.operation.remove.target2 == albumId) {
                RoboApp.logger.log('Removing '+this.operation.remove.target+'...');
                try{
                    this.ophoto.deletePhoto();
                }catch(e){
                    RoboApp.logger.log('penghapusan '+this.operation.remove.target+' gagal '+e);
                }
            } else {
                countImage++;
                result += this.bodyphoto();
            }
        }
        if (countImage == 0) emptyAlbum[albumId] = this.album;
        result += this.footer();
        if (count++ > 3) break;
     }
     for (var albumId in emptyAlbum) emptyAlbum[albumId].deleteAlbum();
    RoboApp.logger.log('done!');
    return ofile.stdListReturn(result);
} 

gp.showAlbumsHeader = function( num_photo ) {
    return '<div style="float: left; width: 100%;'+
                'margin: 2px; padding: 2px; border: 1px solid black;clear:both;">';
}
gp.showAlbumsBody= function() {
    var p = PicasaApp.falbums;
    var abm = this.album.album.group;
    var pict = abm.content.url;  
    var albumID = this.album.album.id[1].Text;
    var albumType = isObject(this.album.album.albumType)?'<br/>'+this.album.album.albumType.Text:'';
    var Targeted = (p.data.config.album.targetTransfer == albumID?'Sbg Target':'Set Target Transfer');
    var style = 'opacity: 1; background-image: url(\''+pict+'\');width:300px;height:225px;';
  
    return '<div id ="DV'+albumID
           +'" style="float: left; width: 230px;height: 330px;'+
           'margin: 5px; padding: 5px; border: 1px solid black;">'+
           '<div style="margin: 0px; padding: 0px;height:37px;width: 95%;border: 0px solid black;clear:both;">'+  
             abm.title.Text+albumType+' Used:'+this.album.getSize() + ' x '+ p.data.config.album.targetTransfer +
             '</div>'+
             '<img src="'+pict+'" id="IM'+albumID+'" height="220px" width="350px" onClick=\'openTheAlbum("'+albumID+'")\' style="cursor:pointer;text-decoration:none"/>'+
           '<button style="width:218px" id="RM'+albumID+'" onClick="removeImage(\''+pict +'\',\''+albumID + '\')">Hapus Album</button><br/>'+
           '<button style="width:218px" id="TF'+albumID+'" onClick="setAsTargetTransfer(\''+ albumID +'\')">'+Targeted+'</button>'
           +'</div>';
}
gp.showAlbumsFooter= function() {
    return '</div>';
}

gp.showAlbums = function() {
    scheduler.init(true);
    RoboApp.logger.log('Load Albums');
    this.loadAlbums();
    RoboApp.logger.log('Albums Loaded');
    var title,result = '';
    var count = 0;var countImage=0; var emptyAlbum = {};
    //var num_photo = 0; for (var i in this.albums) num_photo += 1;
    result += this.ShowResetStorageBtn(); 
    result += this.showAlbumsHeader();
    for (var i in this.albums) {
        this.setActive(i)
        var albumId = this.album.getId();
        if (this.operation.remove.album && albumId == this.operation.remove.target) {
            RoboApp.logger.log(i+' Removing Albums '+AlbumToRemove);
            emptyAlbum[AlbumToRemove] = this.album;
            continue;
        }
        //RoboApp.logger.log('preparing album '+this.album.id);
        result += this.showAlbumsBody();
        countImage = 0;
        //result += this.header(num_photo);
    }
    result += this.footer();
    RoboApp.logger.log('showAlbums done!');
    return ofile.stdListReturn(result);

}
