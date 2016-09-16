BetterLog.useSpreadsheet('1amrN4gmlptCTxc4fyl06myr4TAC3GK4sVUhjWnfC6sw','Sheet1');

var RoboApp = {
    success:false,
    padZero : function (n,len) {
            var s = n.toString();
            if (s.length < len) {
                s = ('0000000000' + s).slice(-len);
            } 
            return s;
    }
};

RoboApp.logger = BetterLog.getActive();

RoboApp.getContentText = function(url,param) {
    var result = {};
    try{
        RoboApp.success = true;
        result = UrlFetchApp.fetch(url, param ).getContentText();
    }catch(e){
        RoboApp.success = false;
        RoboApp.logger.log(JSON.stringify(e));
    }
    return result;
}

RoboApp.getResponseCode = function(url,param) {
    var result = {};
    try{
        RoboApp.success = true;
        result = UrlFetchApp.fetch(url, param ).getResponseCode();
    }catch(e){
        RoboApp.success = false;
        RoboApp.logger.log(JSON.stringify(e));
    }
    return result;
}



// Namespaces
var gphoto = 'http://schemas.google.com/photos/2007';

/****
*
*/
RoboApp.engine = function (owner) {
    this.owner = owner;
    this.logger = BetterLog.getActive();
    this.users = new RoboApp.userCollection(this);
    this.file = new RoboApp.file(this);
    this.data = new RoboApp.data(this);
    this.photo= new RoboApp.photo(this);
};

var engineClass = RoboApp.engine.prototype;

engineClass.run = function() {
  RoboApp.logger.log('Opening Albums');
  var albums = getAlbums();
}

engineClass.runs = function() {
    this.initialize();
    this.ReadData();
    this.runSchedule();
    this.WriteData();
}

/****
*
*/
RoboApp.file = function (owner) {
  this.owner = owner;
};

var fileClass = RoboApp.file.prototype;

/****
*
*/
RoboApp.data = function (owner) {
  this.owner = owner;
};

var dataClass = RoboApp.data.prototype;


/****
*
*/
RoboApp.photo = function (owner) {
  this.owner = owner;
};

var photoClass = RoboApp.photo.prototype;

/************************************************************************
*  User Collection List Class
*************************************************************************/
RoboApp.userCollection = function (owner) {
  this.owner = owner;
  this.write = new userCollectionWriter(this);
  this.read = new userCollectionReader(this);
  this.transfer = new userCollectionTransfer(this);
  this.userList = {};
  this.count = 0;
  return this;
}; 

var userCollectionClass = RoboApp.userCollection.prototype;

userCollectionClass.updateCount = function() {
    this.count = 0;
    for (var status_id  in dataList) {
        this.count += 1;
    }
}

userCollectionClass.exist = function(user_id) {
    if (typeof(this.userList[user_id]) == 'object' && this.userList[user_id].id == user_id ) return true;
    return false;
}

userCollectionClass.remove = function(user_id) {
    this.count = 0;
    temp = {};
    for (var uid in this.userList) if (uid !== user_id) temp[uid] = this.userList[uid];
    for (var uid in temp) {
        this.userList[uid] = temp[uid]; this.count += 1;
    }
    
}


/************************************************************************
*  User Collection readder Class
*************************************************************************/
userCollectionReader = function (owner) {
  this.owner = owner;
  this.sheet_= false;  
  return this;
};

var __read = userCollectionReader.prototype;

__read.fromStatusList = function(dataList) {
    //var log = BetterLog.getActive();
    var o;
    this.owner.userList = {}; 
    for (var status_id  in dataList) {
        //log.log('reading status_id '+status_id);      
        o = new RoboApp.user(this.owner).read(dataList[status_id]);
        this.owner.userList[o.id] = o;
        this.owner.count += 1;
    }
}

__read.fromUserList = function(dataList) {
    this.owner.userList = {};
    for (var user_id  in dataList) {
        this.owner.userList[user_id] = new RoboApp.user(this.owner).read(dataList[user_id]);
        this.owner.count += 1;
    }
}


/************************************************************************
*  User Collection writer Class
*************************************************************************/
userCollectionWriter = function (owner) {
  this.owner = owner;
  return this;
};

var __write = userCollectionWriter.prototype;

__write.statusList = function(option) {
    var result = ''; var count = 0;
    var s = this.owner.count.toString();    
    var padLen = s.length < 2?2:s.length;
    
    if (typeof(option) == 'undefined') option = 0;
    
    for (var uid  in this.owner.userList) {
        result += this.owner.userList[uid].write.statusAndProfile(option,++count,padLen)+'<br/>';
    }
    return result;
}

__write.userList  = function(option) {
    var result = '';var count = 0;var s = this.owner.count.toString();var padLen = s.length < 2?2:s.length;
    if (typeof(option) == 'undefined') option = 0;    
    for (var uid  in this.owner.userList) {
        result += this.owner.userList[uid].write.profile(option,++count,padLen)+'<br/>';
    }
    return result;
}

/************************************************************************
*  User Collection readder Class
*************************************************************************/
userCollectionTransfer = function (owner) {
  this.owner = owner;
  return this;
};

var __transfer = userCollectionTransfer.prototype;

__transfer.toFileObject = function(obj) {
    var o;
    for (var uid  in this.owner.userList) {
    o = this.owner.userList[uid];
    obj[uid] = { id        : o.id,
                 name      : o.name,
                 permanent : o.permanent,
                 segment   : o.segment,
                 count     : o.count,
                 total_post: o.total_post,
                 disabled  : o.disabled
                }
    }
}



__transfer.toSpreadSheet = function() {
    RoboApp.logger.log('Executing toSpreadSheet, typeof(sheet) '+typeof(this.sheet_));

    var o,h;
    callfunc_(function(e) {
        e.sheet_.clear().appendRow(['User ID','User Name','Permanent','Segment','Post','Disabled']);
    },false,this);
  
    for (var uid  in this.owner.userList) {
        o = this.owner.userList[uid];
        //h = '=HYPERLINK("https://www.facebook.com/profile.php?id='+o.id+',"'+o.name+'")';
        callfunc_(function(e) {
            e.sheet_.appendRow([o.id,o.name,o.permanent,o.segment,o.count,o.total_post,o.disabled]);
        },false,this);
    }
}

//Sets the log sheet, creating one if it doesn't exist
__transfer.setSpreadSheet = function (optKey, optSheetName) {
  var sheetName = optSheetName || "Log";
  var ss = (optKey) ? SpreadsheetApp.openById(optKey) : SpreadsheetApp.getActiveSpreadsheet();
  var sheets = callfunc_(function() {return ss.getSheets();});
  for (var i = 0; i < sheets.length; i++) {
    if (sheets[i].getName() === sheetName) {
      this.sheet_ = sheets[i];
      RoboApp.logger.log('Sheet Existed');
      callfunc_(function(e) {e.sheet_.setColumnWidth(1, 150);},false,this);
      return this;
    }
  }
  this.sheet_ = ss.insertSheet(sheetName, i);
  this.sheet_.deleteColumns(2,this.sheet_.getMaxColumns()-1);
  //this.owner.sheet.getRange(1,1).setValue(SHEET_LOG_HEADER);
  //this.owner.sheet.setFrozenRows(1);
  //this.owner.sheet.setColumnWidth(1, SHEET_LOG_CELL_WIDTH);
  return this;
}

/****
* user Class
*/
RoboApp.user = function (owner) {
  this.owner = owner;
  this.write = new userWriter(this);
  this.status_id = '';
  this.name = '';
  this.id = '';
  this.permanent = true;
  this.segment = 'asatidzah';
  this.count = 0;
  this.total_post = 0;
  this.disabled = false;
  this.message = '';
  return this;
};

var userClass = RoboApp.user.prototype;

userClass.read = function(data) {
    if (typeof(data[0])=='string') {
        this.id     = typeof(data[0])=='string'?data[o]:'';
        this.name   = typeof(data[1])=='string'?data[1]:'';
        this.message = typeof(data[2])=='string'?data[2]:'';              
    } else if (typeof(data.from)=='object') {
        this.status_id = typeof(data.id)!='undefined'?data.id:'';
        this.id     = typeof(data.from.id)!='undefined'?data.from.id:'';
        this.name   = typeof(data.from.name)!='undefined'?data.from.name:'';
    } else if (typeof(data.from)=='undefined' && typeof(data.id)=='string' && typeof(data.name)=='string') {
        this.id     = data.id;
        this.name   = data.name;
    }
    this.segment    = typeof(data.segment)!='undefined'?data.segment:'asatidzah';
    this.total_post = typeof(data.total_post)!='undefined'?data.total_post:'';
    this.permanent  = typeof(data.permanent)!='undefined'?data.permanent:true;
    this.disabled   = typeof(data.disabled)!='undefined'?data.disabled:false;
    this.message    = typeof(data.message)!='undefined'?data.message:'';
    return this;
} 

userClass.transfer = function(target) {
    target[this.status_id] = {id      : this.status_id,
                              from    : {from:{id:this.id,name:this.name}},
                              message : '',
                              type    : 'status',
                              segment :'asatidzah',
                              is_new  : false};
    return this;
}

userWriter = function(owner) {
  this.owner = owner;
}

userWriter.prototype.status = function(option,count,padLen) {
        var result = '';
        switch (option) {
            case 1:
                result += '<a href="//www.facebook.com/profile.php?id='+this.owner.id+'"  target="_blank" style="cursor:pointer">'+RoboApp.padZero(count,padLen)+'</a> ';
                break;
            case 2:
                break;
            default:
                break;
        }
        return result + '<a href="//www.facebook.com/'+this.owner.status_id+'"  target="_blank" style="cursor:pointer">'+this.owner.name+'</a>';
    };

userWriter.prototype.profile = function(option,count,padLen) {
        var result = '';
        switch (option) {
            case 1:
                result += '<a href="//www.facebook.com/profile.php?id='+this.owner.id+'"  target="_blank" style="cursor:pointer">'+RoboApp.padZero(count,padLen)+'</a> ';
                break;
            case 2:
                break;
            default:
                break;
        }
        return result + '<a href="//www.facebook.com/profile.php?id='+this.owner.id+'"  target="_blank" style="cursor:pointer">'+this.owner.name+'</a>';
    };
userWriter.prototype.statusAndProfile = function(option,count,padLen) {
        var result = '';
        switch (option) {
            case 1:
                result += RoboApp.padZero(count,padLen);
                break;
            case 2:
                result += this.owner.id;
                break;
            default:
                result += this.owner.id;
                break;
        }
        return  '<a href="//www.facebook.com/profile.php?id='+this.owner.id+'"  target="_blank" style="cursor:pointer">'+result+'</a> ' +
                '<a href="//www.facebook.com/'+this.owner.status_id+'"  target="_blank" style="cursor:pointer">'+this.owner.name+'</a>';
    };

userReader = function(owner) {
  this.owner = owner;
}

userReader.prototype.fromStatus = function() {
}

userReader.prototype.fromList = function() {
}
    
function callfunc_(func, optLoggerFunction,owner) {
  for (var n=0; n<6; n++) {
    try {
      return func(owner);
    } catch(e) {
      if (optLoggerFunction) {optLoggerFunction("call_ " + n + ": " + e)}
      if (n == 5) {
        throw e;
      } 
      Utilities.sleep((Math.pow(2,n)*1000) + (Math.round(Math.random() * 1000)));
    }    
  }
} 
