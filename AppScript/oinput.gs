var oinput = {
    searc_user:function(usr_name,option) {
        var cspan;
        var api = 'https://graph.beta.facebook.com/search?q='+encodeURIComponent(usr_name)+'&type=user&access_token='+cfg.token;
        //ofile.log('api '+api);
        try {
          //throw {me:"ooke dooke",message:"cant recover"}
            var a = UrlFetchApp.fetch(api); 
            var fdata = JSON.parse(a.getContentText());
            for (var idx = 0;idx < fdata.data.length;idx++) {
                // ofile.log(idx+' '+typeof(fdata.data[idx]));
                var o = fdata.data[idx];
                if (option=="tepat" && usr_name != o.name) continue;
                    cspan = ' <span id="S'+o.id+'">'
                        + o.id+' '+oinput.makeLink(o.id,o.name) 
                        + ' <a id="'+o.id
                        +'" onClick="doPost(\''+o.id+'\',\''+o.name.replace("\'","\\'")+'\')" style="cursor:pointer">Register</a>'
                        + '</span>';
          
                ofile.log( cspan  );
            }
            if (fdata.data.length == 0 ) {
                ofile.log(usr_name+' adalah pengguna private');
            }
        } catch(err){
            ofile.log(readError(err));
        }
        ofile.log('from new list');
        for (var uid in ofile.data.new_list) {
                var o = ofile.data.new_list[uid];
                if (usr_name != o.name) continue;
                    cspan = ' <span id="S'+o.id+'">'
                        + o.id+' '+oinput.makeLink(o.id,o.name) 
                        + ' <a id="'+o.id
                        +'" onClick="doPost(\''+o.id+'\',\''+o.name.replace("\'","\\'")+'\')" style="cursor:pointer">Register</a>'
                        + '</span>';
          
                ofile.log( cspan  );
        }
        return ofile.stdListReturn(LogString);
    },
    makeLink:function(user_id,user_name) {
        return '<a href="//www.facebook.com/profile.php?id='+user_id+'"  target="_blank">'+user_name+'</a>'
    }
}

function readError(err) {
    var result  = '';
    if (typeof(err) == 'string' || typeof(err) == 'number') return err;
    for (var info in err) {
      result += '<tr><td style="height:20px;padding:0px 5px 0px 25px;background-color: #f5f5f5;">'+info+'</td><td style="padding:0px 5px 0px 5px;background-color: #fafafa;">'+err[info]+'</td></tr>';
    }
    return '<br><table>'+result+'</table>';
}

function newObjTest(err) {
    this.count = 0;
    this.TimerStart = function(){ 
    }
    this.TimerStop = function(){ 
    }
    return this;
}

function getAsUser(data) {
    function getAsNewUser(data) {
        if (typeof(data[0])=='string') {
            this.from = {id     :typeof(data[0])=='string'?data[0]:'',
                         name   :typeof(data[1])=='string'?data[1]:'',};
           this.message = typeof(data[2])=='string'?data[2]:'';              
        } else if (typeof(data.from)=='object') {
            this.from = {id     :typeof(data.from.id)!='undefined'?data.from.id:'',
                         name   :typeof(data.from.name)!='undefined'?data.from.name:'' };
        } else if (typeof(data.from)=='undefined' && typeof(data.id)=='string' && typeof(data.name)=='string') {
            this.from = {id:data.id,name:data.name};
        }
      this.message = typeof(data.message)!='undefined'?data.message:'';
      this.res = typeof(data.from)+' '+ typeof(data.id)+' '+ typeof(data.name);
    }
    return (new getAsNewUser(data))
}

function isClickAble(theText) {
    var pos1 = theText.indexOf("http:");
    var pos2 = theText.indexOf("https:");
    var start = pos1==-1?pos2:pos1;
    theText += " ";
    if (start > -1) {
        var tmp = theText.substring(start,theText.length);
        var end = tmp.indexOf(" ");
        var result = tmp.substring(0,end);
        result = '[a href="'+result+'" target="_blank"]'+result+'[/a]';
        pos = theText.indexOf(tmp);
        result = theText.substring(0,start) + result + theText.substring(pos+tmp.length,theText.length-1);
        return result;
    } 
    return theText;
}

function objAsTable(theObj,nlevel) {
    function doReadIt(theObj,nlevel) {
        var result  = '';
        var ctype = typeof(theObj);
        if ( ctype == 'string' || ctype == 'number') return {result:theObj,index:'text'}
        if ( ctype == 'boolean' ) return {result:(theObj?'true':'false'),index:'text'} 
        if (typeof(nlevel) != 'number') nlevel = 0;
        var astyle=[];var count = 0;
        var baseleft = 'margin:0;height:20px;padding:0px 5px 0px 25px;background-color: #f5f5f5;';
        var baseright = 'margin:0;height:20px;padding:0px 5px 0px 0px;background-color: #fcfcfc;';
        var baseText = 'margin:0;height:20px;padding:0px 5px 0px 25px;background-color: #fcfcfc;';
        for (var info in theObj) {
            astyle[count]={
              left:'style="'+baseleft+'"',
              right:'style="'+baseright+'"',
              text:'style="'+baseText+'"'
            }; count++;
        }
        if (count > 0 && nlevel > 0) {
            astyle[0].left = 'style="border-top: 0px;border-bottom: 1px solid #dce6f0;'+baseleft+'"';
            astyle[0].right = 'style="border-top: 0px;border-bottom: 1px solid #dce6f0;'+baseright+'"';
            astyle[astyle.length-1].left = 'style="border-top: 0px;border-bottom: 0px;'+baseleft+'"';
            astyle[astyle.length-1].right = 'style="border-top: 0px;border-bottom: 0px;'+baseright+'"';
            astyle[astyle.length-1].text = 'style="border-top: 0px;border-bottom: 0px;'+baseText+'"';
        }
        count = 0;
        for (var info in theObj) {
            var nest = doReadIt(theObj[info],(nlevel+1)); 
            result  += '<tr><td '+astyle[count].left+'>'+info+'</td><td '
                    +  astyle[count][nest.index]+'>'
                    +  nest.result +'</td></tr>';
                 count++;
        }
        return {result:'<table style="margin:0;">'+result+'</table>',index:'right'};
    }
    return doReadIt(theObj,nlevel).result;
}

function fixItAsUserData(data) {
    var result = {};
        if (typeof(data[0])=='string') {
            result.from = { id     :typeof(data[0])=='string'?data[0]:'',
                            name   :typeof(data[1])=='string'?data[1]:'',};
            result.message = typeof(data[2])=='string'?data[2]:'';
            result.type = typeof(data[3])=='string'?data[3]:'';
            result.status_type = typeof(data[4])=='string'?data[4]:'';
        } else if (typeof(data.from)=='object') {
            result.id   = typeof(data.id)!='undefined'?data.id:'',
            result.from = {id     :typeof(data.from.id)!='undefined'?data.from.id:'',
                           name   :typeof(data.from.name)!='undefined'?data.from.name:'' };
            result.message = typeof(data.message)!='undefined'?data.message:'';                        
            result.type = typeof(data.type)=='string'?data.type:'';
            result.status_type = typeof(data.status_type)=='string'?data.status_type:'';  
        } else if (typeof(data.from)=='undefined' && typeof(data.id)=='string' && typeof(data.name)=='string') {
            result.from = {id:data.id,name:data.name};
            result.message = typeof(data.message)!='undefined'?data.message:'';
            result.type = typeof(data.type)=='string'?data.type:'';  
            result.status_type = typeof(data.status_type)=='string'?data.status_type:'';  
        } else {
            result = {id:'',from:{id:'',name:''},message:'',type:''}
        }
    return result;
}

function isLikedByMe(object) {
    if ( typeof(object.likes)=='object') {
        var onext = object.likes;
        if ( typeof(onext.data) =='object' && onext.count > 0 ) {
            var anext = onext.data;
            for (var index in anext) {
              if (anext[index].id == ofile.data.my.info.id) return true;
            }
        }
    }
    return false;
}

function getInput() {
    return oinput;
}

function searchUserName(user_name,option){
    scheduler.init(); 
    return oinput.searc_user(user_name,option);
}
