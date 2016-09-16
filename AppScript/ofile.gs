var ofile = {
    fname:'AutoLike-logs.txt',files:false,obj:false,content:false,data:false,active_segment:'',initialized:false,
    Row:15,Col:3,html_str:'',html_liked:'',tmp:'',
    delayed_mode:false,
    delayed_post_activated:true,
    blobToString:function() {

    },
    checked:function() {
        var count = 0;
        ofile.files=DriveApp.getFilesByName(ofile.fname);
        while (ofile.files.hasNext()) {
            count += 1;
            file = ofile.files.next();
            if (count === 1) {
                ofile.obj =  file;
            } else {
                file.setTrashed(true);
            }
        }
        if (count == 0) {
            DriveApp.createFile(ofile.fname, '{"counter":0,"data":"","log":"","post_enabled":false,"liker_enabled":true,"comment_enabled":false}','text/plain');
            return false;
        }
        return true;
    },
    cutString:function(cString) {
       cString = cString +'';var max = 30;var len = cString.length;
       return (len > max)?cString.substring(0,max)+'..':cString;
    },
    log:function(strLog) {
       LogString += strLog + '<br/>';
    },
    htmlStr:function(logStr) {
        ofile.html_str += logStr.replace(/\n/g,"\n<br>");
    },
    makeUserLink:function(user_id,user_name) {
        return '<a href="//www.facebook.com/profile.php?id='+user_id+'"  target="_blank">'+user_name+'</a>'
    },
    makeStatusLink:function(post_id,user_name) {
        return '<a href="//www.facebook.com/'+post_id+'"  target="_blank">'+user_name+'</a>'
    },
//--default is hardcoded in the program --//
    is_def_user_exist:function(user_id) {
        var ar,result=false;
        function def_user_found(segment){
          ofile.active_segment=segment;ar=usr[segment].list;
          for(var i = 0;i < ar.length;i++) if (ar[i] == user_id) {result=true;return true}
          return false;
        }
        ofile.active_segment="friend";
        if (!def_user_found('asatidzah')) if (!def_user_found('koplakiyun')) def_user_found('friend');
        return result;
    },
    get_def_user:function() {
        return ofile;
    },
    fixItToDefUserFormat:function(params) {
        var odefault = {
                        id        : '',
                        name      : '',
                        permanent : true,
                        segment   :'asatidzah',
                        count     : 0,
                        total_post:0,
                        disabled  :false
                       }
        for (var index in odefault ) {
            var ctype = typeof(params[index]);
            if ( ctype == 'string' || ctype == 'number' || ctype == 'boolean' ) odefault[index] = params[index];
        }
        return odefault;
    },
    def_user_disabled:function(user_id) {
        if ( typeof(ofile.data.user_list[user_id])== "object"  ) {
             if (typeof(ofile.data.user_list[user_id].disabled) == "undefined") ofile.data.user_list[user_id].disabled = false;
             return ofile.data.user_list[user_id].disabled;
        }
        return false;
    },    
    revalidate_def_user:function(foreceValidate) {

        //- ofile.log('revalidate_def_user started');
        if (typeof(foreceValidate)=='undefined') foreceValidate = false;

        for (var index in usr.asatidzah.list) {
            var user_id = usr.asatidzah.list[index];
            //- ofile.log('validating '+user_id);
            if (!ofile.is_user_exist(user_id) || foreceValidate) {

                var o,result = UrlFetcher.CustomResponse(user_id,'',{fields:"id,name"});
                if (result.__operation_success) {
                    //- ofile.log( user_id+'<br>'+objAsTable(result) );
                    //- ofile.log(
                    //-   'memperbaharui data '+ofile.makeUserLink(result.id,result.name)
                    //-);
                    ofile.data.user_list[user_id] = ofile.fixItToDefUserFormat({
                        id      :result.id,
                        name    : result.name
                    });
                }
            } else {
                ofile.data.user_list[user_id].permanent = true;
                ofile.data.user_list[user_id].segment   ='asatidzah'
                //- ofile.log(
                //-       'found '+user_id+'<br> '+ objAsTable( ofile.data.user_list[user_id])
                //-    );
            }
        }
        for (var user_id in ofile.data.user_list) {
            ofile.data.user_list[user_id] = ofile.fixItToDefUserFormat(ofile.data.user_list[user_id]);
        }
        ofile.put();
        return ofile.stdListReturn(LogString, {message:"Success, please wait.."});
    },
    add_user:function(user_id,user_name,is_permanent) {
        if (ofile.is_user_exist(user_id)) return;
        ofile.data.user_list[user_id] = ofile.fixItToDefUserFormat({
                                id          : user_id,
                                name        : user_name,
                                permanent   : is_permanent,
                                segment     : ofile.active_segment
                            });
        return;
    },
    rm_user:function(user_id) {
        var tmp = {};
        for (var uid  in ofile.data.user_list) if(user_id != uid) tmp[uid] = ofile.data.user_list[uid];
        ofile.data.user_list = {};
        for (var uid  in tmp) ofile.data.user_list[uid] = tmp[uid];
        return ofile;
    },
    is_user_exist:function(user_id) {
        var ctype = typeof(ofile.data.user_list[user_id]);
        return (ctype == 'object');
    },
    count_to_total_post:function(user_id) {
        if ( !ofile.is_user_exist(user_id) ) {
             ofile.data.today.named += "count_to_total_post not found for user "+ofile.makeStatusLink(user_id,'click me!');
             return;
        }
        //if ( typeof(ofile.data.user_list[user_id].total_post) == 'undefined' ) ofile.data.user_list[user_id].total_post = 0;
        ofile.data.today.named += "incrementing "+ofile.makeStatusLink(user_id,'click me!')+' ';
        ofile.data.user_list[user_id].total_post += ofile.get_count_info(user_id);
    },
    reset_total_post:function() {
        for (var user_id in ofile.data.user_list)  {
            ofile.data.user_list[user_id].total_post = 0;
            ofile.data.user_list[user_id].disabled = false;
        }    
        ofile.put();
        return ofile.stdListReturn(LogString, {message:"Success, please wait.."});
    },
    set_user_disabled:function(user_id,new_status) {
        if (ofile.is_user_exist(user_id)) {
            ofile.data.user_list[user_id].disabled = new_status;
        }
    },
    toggleUserActive:function(user_id) {
        if (ofile.is_user_exist(user_id)) {
            ofile.data.user_list[user_id].disabled = !ofile.data.user_list[user_id].disabled;
            ofile.put();
            return ofile.stdListReturn(LogString, {user_id:user_id,message:"wait.."});
        }
        return ofile.stdListReturn(LogString, {user_id:user_id,message:"failed.."});
    }, 
    get_user_html:function() {
    },
//--dailyPost --//
    daily_exist:function(strdate) {
        var ctype = typeof(ofile.data.daily[strdate]);
        if (ctype == 'string' || ctype == 'object') return true;return false;
    },
    daily_add:function(strdate,content) {
        ofile.data.daily[strdate] = content
        return;
    },
    daily_get:function(strdate_key) {
        return ofile.data.daily[strdate_key];
    },
    daily_get_info:function(post_id) {
        var data = UrlFetcher.CustomResponse(post_id,false,{fields:"from,id",limit:cfg.limitSize});
        if (typeof(data.from) !== "object") return "";
        var res = 'status :<a href="https://www.facebook.com/'+data.id+'" target="_blank">'+data.from.name+'</a> (<a href="//www.facebook.com/profile.php?id='+data.from.id+'"  target="_blank">view profile</a>)';
        return res;
    },
//--New User List --//
    ad_new_list:function() {
        if (ofile.is_user_exist(wall.data.from.id)) return;
        if (ofile.is_new_exist(wall.data.from.id)) return;
        ofile.data.new_list[wall.data.from.id] = {"status_id":wall.data.id,"id":wall.data.from.id,"name":wall.data.from.name,"html":''};
        return;
    },
    is_new_exist:function(user_id) {
        if (typeof(ofile.data.new_list[user_id]) == 'object') {
            if (typeof(ofile.data.new_list[user_id].id) == 'undefined') return false;
            return (ofile.data.new_list[user_id].id == user_id);
        }
        return false;
    },
//--stdListReturn
    stdListReturn:function(textlist, params) {
      var result = {  text        : '<code style="padding:0px 0px;">' + textlist + "</code>",
                        enabled     : ofile.data.post_enabled,
                        like        : ofile.data.liker_enabled,
                        comment     : ofile.data.comment_enabled,
                        schedule    : scheduler.action.selected.name,
                        stopTimer   : false,
                        autolike    : ofile.delayed_post_activated
                };

        if (typeof(params)== 'object') {
            for (var varname in params) {
                result[varname] = params[varname];
            }
        }
        return result;
    },
    dbgListReturn:function(textlist, params) {
        if (LogString!='') LogString +=  '<br/>';
        var result = {  text        : LogString + "<code>" + textlist + "</code>",
                        enabled     : ofile.data.post_enabled,
                        like        : ofile.data.liker_enabled,
                        comment     : ofile.data.comment_enabled,
                        schedule    : scheduler.action.selected.name,
                        stopTimer   : false,
                        autolike    : ofile.delayed_post_activated
                };

        if (typeof(params)== 'object') {
            for (var varname in params) {
                result[varname] = params[varname];
            }
        }
        return result;
    },
    get_new_list:function (limit_lo,limit_hi) {
        scheduler.init(true);
        var res = '';
        var ListLength = 0; var count = 0; sw = 0;
        var MaxLength = ofile.Row;
        var MaxListLength = ofile.Col * ofile.Row;
        var start_index = 0;
        var tmp = {};
        var usr_link,o,cnum,acol=[];var max_row = 0;var lastSwitch = -1;var limit_last;
        for (var user_id  in ofile.data.new_list) ++ListLength;

        MaxLength = 100;
        var digit = (MaxLength+'').length;

        if (typeof(limit_lo)=="undefined") limit_lo = 0;
        limit_hi = limit_lo + (MaxLength*3);

        if (limit_hi > ListLength) {
            limit_hi = ListLength;
            limit_lo = ListLength - (MaxLength*3);
        }

        limit_last = ListLength - (MaxLength*3);
        start_index = -1;

        for (var user_id  in ofile.data.new_list) {
            start_index += 1;
            if ( limit_lo <= start_index && start_index <= limit_hi) {
            if (lastSwitch != sw ) { acol[sw]=[];lastSwitch = sw;}
                cnum =  '00'+(count+1); cnum = cnum.substring(cnum.length-digit,cnum.length);
                uobj  = ofile.data.new_list[user_id];

                cname = uobj.name;
                if (uobj.name.length > 35 ) uobj.name = uobj.name.substring(0,35)+'...';

                cspan = '<span id="S'+user_id+'"><a id="'+user_id
                        +'" onClick="doPost(\''+user_id+'\',\''+uobj.name.replace("\'","\\'")+'\')" style="cursor:pointer">'+cnum+'</a>';
                chtml = '<a href="https://www.facebook.com/'+uobj.status_id+'" target="_blank">'+uobj.name+'</a>';
                usr_link = cspan +' '+  chtml +"\n<br/></span>"

                acol[sw][count]= usr_link;
                count += 1;
                if (count > MaxLength - 1 ){
                    max_row = count>max_row?count:max_row;
                    count = 0; sw += 1;
                }
            }
        }

        for (var r= 0;r < max_row;r++) {
            res += "<tr>";
            for (var c= 0;c < ofile.Col;c++) {
                (typeof(acol[c])==="undefined"?acol[c]=[]:true);
                (typeof(acol[c][r])==="undefined"?acol[c][r]="":true);
                res += '<td style="width:26em;padding: 2px 5px 2px 5px;">'+acol[c][r]+"</td>";
            }
            res += "</tr>";
        }

        limit_lo = limit_lo - (MaxLength*3);
        if (limit_lo < 0) limit_lo = 0;
        if (res=='') res = "<tr><td>No data posted</td></tr>";
        res = 'The New List ( total '+ListLength+ ') ('+start_index+') '
        + '<a id="p_firspage" target="_top" class="btn_page" onClick="get_nextpage(0,\'Ke Awal\')">Awal</a> '
        + '<a id="p_prevpage" target="_top" class="btn_page" onClick="get_nextpage('+limit_lo+',\'Ke sebelum\')">'+limit_lo+'</a> '
        + '<a id="p_nextpage" target="_top" class="btn_page" onClick="get_nextpage('+limit_hi+',\'Ke selanjutnya\')">'+limit_hi+'</a>'
        + '<a id="p_lastpage" target="_top" class="btn_page" onClick="get_nextpage('+limit_last+',\'Ke Akhir\')">Akhir</a>'
        + '<br/><table>'+res+'</table>';
        return '<code>'+res+'</code>';
    },
    rm_new_list:function(user_id) {
        var tmp = {};
        for (var uid  in ofile.data.new_list) if(user_id != uid) tmp[uid] = ofile.data.new_list[uid];
        ofile.data.new_list = {};
        for (var uid  in tmp) ofile.data.new_list[uid] = tmp[uid];
        return ofile;
    },
//- Unique List (Permit Only user One per execution) --//
    is_uniq_user_exist:function(user_id) {
        var ctype = typeof(ofile.data.uniq_liked_list[user_id]);
        if (ctype == 'string' || ctype == 'object') return true;
        return false;
    },
    uniq_user_add:function() {
        ofile.data.uniq_liked_list[wall.data.from.id] = wall.data.from.name;
        return false;
    },
    uniq_slot_used:function(user_id,user_data) {
        var ctype = typeof(ofile.data.uniq_liked_list[user_id]);
        if (ctype == 'string' || ctype == 'object') return true;
        ofile.data.uniq_liked_list[user_id] = user_data;
        return false;
    },
    uniq_user_reset:function() {
        ofile.data.uniq_liked_list = {};scheduler._LikeCount=0;
        return ofile;
    },
//- delayed status post List --//
    delayed_stat_exist:function(status_id) {
        if (ofile.is_history_exist(status_id)) return true;
        if (typeof(ofile.data.delayed[status_id]) == 'object') return true;
        return false;
    },
    delayed_user_exist:function(user_id,user_name) {
        if (ofile.uniq_slot_used(user_id,user_name)) return true;
        for (var status_id in ofile.data.delayed)
            if (ofile.data.delayed[status_id].from.id == user_id) return true;
        return false;
    },
    get_count_info:function(user_id) {
        var count = 0;
        for (var status_id in ofile.data.delayed)
            if (ofile.data.delayed[status_id].from.id == user_id) count += 1;
        return count;  
    },    
    delayed_stat_add:function( no_display ) { //ofile.active_segment = "asatidzah";

        // - return true causing do_post_like() stops to continue;
        if ( !ofile.is_user_exist(wall.data.from.id) || ofile.def_user_disabled(wall.data.from.id)) return true;

        var strout ='';
        var usr_link = '<a href="https://www.facebook.com/'+wall.data.id+'" target="_blank">'+wall.data.from.name+'</a>';

        if (ofile.data.today.last_id == wall.data.from.id) ofile.delayed_mode = true;
        if ( !ofile.delayed_mode ) return false;

        if (!ofile.delayed_stat_exist(wall.data.id)) {

            if (ofile.get_count_info(wall.data.id) > 2 ) { 
                ofile.log('lebin dari <span style="color:red">2 post</span> ->'+ofile.makeStatusLink(passing_data.from.id,passing_data.from.name));
                strout = usr_link +"  -> tidak disimpan";
            } else {
                try{
                    ofile.data.delayed[wall.data.id] = {
                        id     :wall.data.id,
                        from   :{id:wall.data.from.id,name:wall.data.from.name+''},
                        type   :wall.data.type,
                        segment:ofile.active_segment
                    }
                    strout = usr_link +'  -> <span style="color:red">masuk</span> dalam antrian';
                } catch(err) {
                    ofile.log(objAsTable(err));
                    throw 'delayed_stat_add error';
                }
           }

           ofile.html_liked += strout+'<br/>';
           ofile.data.reg_user.is_new = true;

        } else {
           strout += usr_link +"  dalam antrian";
           ofile.html_liked += strout+'<br/>'
           ofile.data.reg_user.is_new = false;
        }

        //ofile.log(ofile.data.reg_user.counter+' '+strout);
        return true;
    },
    getDataByStatusId:function(status_id) { // ,full_picture,images
        var result = UrlFetcher.CustomResponse(status_id,'',{ fields:"id,message,from,type,images"});
        //if (!result.__operation_success) return result;
        return result;
    },    
    read_from_feed:function(user_id,max_limit) {
        var result = UrlFetcher.CustomResponse(user_id,'feed',{fields:"id,message,from,type,status_type,comments",limit:max_limit});
        if (!result.__operation_success) return result;
        return ofile.store_feed(result.data[0]);
    },
    store_feed:function(passing_data) {
        wall.data = passing_data; ofile.data.today.last_id = wall.data.from.id;
        ofile.is_def_user_exist(wall.data.from.id);
        ofile.delayed_stat_add( true );
        ofile.data.feed[wall.data.id] = {id      : wall.data.id,
                                         from    : wall.data.from,
                                         message : wall.data.message,
                                         type    : wall.data.type,
                                         segment :'asatidzah',
                                         is_new  : ofile.data.reg_user.is_new};
        return;
    },
    check_registered:function() {

        if (UrlFetcher.outOfService) {
            ofile.log('UrlFetch Out of Service!');
            return;
        }
        if (scheduler.statusReaderStopped) {
            ofile.log('Status Reader Stopped');
            return;
        }
        var MAX_LENGTH = 100;
        
        var MaxLen      = 0 ;
        var nLoop = 0;
        var max_retrieve = 0; var count = 0; ofile.delayed_mode = true; ofile.data.feed = {};var flist={};
        for (var user_id in ofile.data.user_list ) ++max_retrieve; (max_retrieve > 0 ? --max_retrieve:true);
    
        function read_by_loop(theList) {
            count = 0;var batch_str = '';
            for (var user_id in theList ) {
                batch_str += user_id+',';
                count += 1;
            }
            if (count == 0 || nLoop > 5) return {}; nLoop++;
            batch_str = '?method=get&ids='+batch_str.substring(0,batch_str.length-1)
                        + '&fields=feed.limit(2)&access_token='+cfg.token;
            var api = 'https://graph.beta.facebook.com'+batch_str;
      
            //-- show api url
            // ofile.log(api);
            var a = UrlFetchApp.fetch(api);
            var fdata = JSON.parse(a.getContentText());
      
            // ofile.log(objAsTable(fdata));
            
            var o,cant_access={}; ofile.data.reg_user.counter = 0;theList={};count=0;
        
            //-- ofile.log('Loop '+nLoop);
            for (var user_id in fdata) {
                o = fdata[user_id];
                if (typeof(o) == 'undefined' || typeof(o.feed) == 'undefined'|| typeof(o.feed.data) == 'undefined') {
                    cant_access[user_id] = user_id;
                    count++;
                    continue;
                }
                ofile.data.reg_user.counter++;
                try {
                    //if (ofile.uniq_slot_used(  o.feed.data[0].from.id,o.feed.data[0].from.name  )) continue;
                    //-- skip if already liked
                    ofile.store_feed(o.feed.data[0]);
                    if (isLikedByMe(o.feed.data[0])) continue;
                    ofile.store_feed(o.feed.data[0]);
                }catch(err){
                    ofile.log( objAsTable(err) );
                    ofile.log( objAsTable(o.feed.data[0]) );
                    return;
                }
            }
            if (cant_access != {} ) read_by_loop( cant_access );
            return cant_access;
        }

        if (ofile.data.reg_user.check_reg_start > max_retrieve) ofile.data.reg_user.check_reg_start = 0;
        ofile.data.reg_user.check_reg_end = ofile.data.reg_user.check_reg_start + MAX_LENGTH + 1;
        if (ofile.data.reg_user.check_reg_end > max_retrieve) ofile.data.reg_user.check_reg_end = max_retrieve;
        //-- show started log
        // ofile.log('started '+ofile.data.reg_user.check_reg_start+', max_retrieve: '+max_retrieve);
      
        //-- show starting sequence
        // ofile.log('start : '+ofile.data.reg_user.check_reg_start+' end : '+ofile.data.reg_user.check_reg_end);
        ofile.data.reg_user.counter = 0;
        for (var user_id in ofile.data.user_list ) {
            if ( ofile.data.reg_user.counter > ofile.data.reg_user.check_reg_start && ofile.data.reg_user.counter <= ofile.data.reg_user.check_reg_end ) {
               flist[user_id] = user_id
            }
            ofile.data.reg_user.counter  +=1;
        }
        flist = read_by_loop(flist);
        ofile.data.reg_user.check_reg_start = ofile.data.reg_user.check_reg_end + MAX_LENGTH; ofile.data.reg_user.counter=0;
        if (ofile.data.reg_user.check_reg_start > max_retrieve) ofile.data.reg_user.check_reg_start = 0;
        ofile.put();
    },
    feed_get_list:function () {
        scheduler.init(false);
        var res = '';var nfloat=0;
        var MaxLength,HistLength = 0; var count = 0; var sw = 0;
        var start_index = 0;
        var tmp = {};
        var usr_link,o,cnum,acol=[];var max_row = 0;

        for (var status_id  in ofile.data.feed) HistLength++;

        nfloat = HistLength / ofile.Col;
        MaxLength  = parseInt( nfloat ,10 );
        if ( nfloat > MaxLength ) MaxLength += 1;
        var seq = ofile.data.reg_user.check_reg_start-1;
        var nlen =  (seq+'').length;

        for (var status_id  in ofile.data.feed) {
                o = ofile.data.feed[status_id];
                if (typeof(o.from)=="undefined") continue;
                cnum =  '00'+(++seq);
                usr_link = cnum.substring(cnum.length-nlen,cnum.length)
                            + ' <a href="https://www.facebook.com/'+status_id+'" target="_blank">'
                            + ofile.cutString(o.from.name)
                            + '</a>';
                usr_link = usr_link.replace('asatidzah:','').replace('koplakiyun:','').replace('friend:','');
                usr_link += (o.is_new?'-><span style="color:red">new</span>':'')
                tmp[status_id] = ofile.data.feed[status_id];
                if (acol[sw] === undefined) acol[sw]=[];
                acol[sw][count]= usr_link;
                count += 1;
                if (count > MaxLength - 1 ){
                    max_row = count>max_row?count:max_row;
                    count = 0; sw += 1;
                }
        }

        for (var r= 0;r < max_row;r++) {
            res += "<tr>";
            for (var c= 0;c< ofile.Col;c++) {
                ((typeof(acol[c])==="undefined")?acol[c]=[]:true);
                (typeof(acol[c][r])==="undefined"?acol[c][r]="":true);
                res += '<td style="width:26em;padding: 2px 5px 2px 5px;">'+acol[c][r]+"</td>";
            }
            res += "</tr>";
        }

        if (res=='') res = "<tr><td>No data posted</td></tr>";
        res = LogString+'Status Collected <strong>'+HistLength+'</strong> status<br/><table>'+res+'</table>';
        return ofile.stdListReturn(res)
    },
    delayed_stat_reset:function() {
        ofile.data.delayed = {};
        return ofile;
    },
    delayed_stat_remove:function(status_id) {
        var tmp = {};
        for (var pid  in ofile.data.delayed) if(status_id != pid) tmp[pid] = ofile.data.delayed[pid];
        ofile.data.delayed = {};
        for (var pid  in tmp) ofile.data.delayed[pid] = tmp[pid];
        return ofile;
    },
    delayed_get_length:function() {
      ofile.data.today.delayed_count = 0;
      for (status_id in ofile.data.delayed) { ofile.data.today.delayed_count += 1;}
    },
    delayed_do_post:function() {
            var MAX_STEP = 10;
            //- ofile.log('delayed post started');
            if (!ofile.delayed_post_activated) {
                ofile.log('delayed post not activated');
                return;
            }
            ofile.delayed_get_length();
            if (ofile.data.today.delayed_count < ofile.data.today.delayed_max ) {
              ofile.log('delayed canceled '+ofile.data.today.delayed_count+' < '+ofile.data.today.delayed_max);
            return;}
            var step = 0; var selected_id;ofile.data.today.named = '';
            ofile.uniq_user_reset();

            for (status_id in ofile.data.delayed) {
                    step += 1;
                    if (step > MAX_STEP || ofile.data.today.delayed_max > ofile.data.today.delayed_count ) {
                       ofile.log('delayed breaked ['+ofile.data.today.delayed_max+' > ['+(ofile.data.today.delayed_count-step)+']');
                     break;
                    }
                    //if (step > 2) break;
                    selected_id = status_id;
                    wall.komentar ='';
                    wall.data = ofile.data.delayed[status_id];//UrlFetcher.CustomResponse(selected_id,false,{fields:"id,message,from,type,status_type,comments"});
                    //- ofile.log(objAsTable(suredata)); return;
                    //- if (!wall.data.__operation_success || typeof(wall.data.error)=="object") break;
                    if (typeof(wall.data.from) == 'undefined') break;
                    if (ofile.uniq_slot_used(wall.data.from.id,wall.data.from.name)) {--step;continue;}
                    ofile.active_segment = ofile.data.delayed[status_id].segment;
                    ofile.like_executed('asatidzah');//ofile.active_segment);
                    ofile.data.today.named += 'posted for '+ ofile.daily_get_info(selected_id)+' ('+ofile.active_segment+') '+wall.komentar+'<br/>';
                    if ( --ofile.data.today.delayed_count < ofile.data.today.delayed_max ) break;
            }
            if (step > 0) {
                  ofile.data.today.named += '<br/>';
                  ofile.delayed_stat_remove(status_id);
                  //ofile.put();
            }
            ofile.put();
            //- ofile.log('delayed ended');
            return
    },
    delayed_get_list:function () {
        scheduler.init();
        var res = '';var nfloat=0;
        var HistLength = 0; var count = 0; var sw = 0;
        var MaxLength = ofile.Row;
        var start_index = 0;
        var tmp = {};
        var usr_link,o,cnum,acol=[];var max_row = 0;
        ofile.delayed_get_length();
        HistLength = ofile.data.today.delayed_count;
        nfloat = HistLength / ofile.Col;
        MaxLength  = parseInt( nfloat ,10 );
        if ( nfloat > MaxLength ) MaxLength += 1;

        for (var status_id  in ofile.data.delayed) {
                o = ofile.data.delayed[status_id];
                if (typeof(o.from)=="undefined") continue;
                cnum =  '00'+(count+1);
                cnum = cnum.substring(cnum.length-2,cnum.length)
                cnum = '<span id="ST'+status_id+'" onClick="RemoveFromList(\''+status_id+'\')" style="cursor:pointer;text-decoration:none">'+cnum;
                usr_link = cnum + ' ' + o.segment  +': <a href="https://www.facebook.com/' +status_id +'" target="_blank">'
                                + ofile.cutString(o.from.name) +'</a> ('+ofile.get_count_info(o.from.id)+')</span>';
                usr_link = usr_link.replace('asatidzah:','').replace('koplakiyun:','').replace('friend:','');
                tmp[status_id] = ofile.data.delayed[status_id];
                if (acol[sw] === undefined) acol[sw]=[];
                acol[sw][count]= usr_link;
                count += 1;
                if (count > MaxLength - 1 ){
                    max_row = count>max_row?count:max_row;
                    count = 0; sw += 1;
                }
        }

        for (var r= 0;r < max_row;r++) {
            res += "<tr>";
            for (var c= 0;c < 3;c++) {
                (typeof(acol[c])==="undefined"?acol[c]=[]:true);
                (typeof(acol[c][r])==="undefined"?acol[c][r]="":true);
                res += '<td style="width:26em;padding: 2px 5px 2px 5px;">'+acol[c][r]+"</td>";
            }
            res += "</tr>";
        }

        if (res=='') res = "<tr><td>No data posted</td></tr>";
        res = LogString+ofile.data.today.named+'Status Collected ( total '+HistLength+' status) limit ('
                    + ofile.data.today.delayed_max+') <table>'+res+'</table>';
        return ofile.stdListReturn(res)
    },

    //--Add User to proper place storage --//
    add_user_2_proper_place:function() {
        //ofile.log('new status from '+ofile.makeStatusLink(wall.data.id,wall.data.from.name));
        if( (ofile.is_def_user_exist(wall.data.from.id))){
            ofile.add_user(wall.data.from.id,wall.data.from.name,true);
        } else {
            ofile.ad_new_list();
        }
    },
//--do post like--//
    do_post_like:function () {
        if ( !ofile.is_user_exist(wall.data.from.id) || ofile.delayed_stat_add() ) return;
        ofile.like_executed(ofile.active_segment);
        ofile.data.today.last_id = wall.data.from.id;
        ofile.delayed_mode = true;
    },
    like_executed:function(segment) {
        if (!ofile.is_history_exist(wall.data.id)) {
            var usr_link = segment +': <a href="https://www.facebook.com/'+wall.data.id+'" target="_blank">'
                    + ofile.cutString(wall.data.from.name) +'</a>';
            ofile.html_liked += usr_link +"  done\n<br/>";
            likers.updated=true;
            ofile.html_str += ofile.tmp;  //wall.post("likes","");
            if(cfg.like && cfg.update_fb) {
                if (!ofile.data.user_list[wall.data.from.id].disabled) {
                    ofile.count_to_total_post(wall.data.from.id); 
                    UrlFetcher.postLike();
                    ofile.ad_history(wall.data.id,usr_link);
                }
                ofile.uniq_user_add();
                ofile.delayed_stat_remove(wall.data.id);
            }
            wall.get_komentar(wall.data.from.id,ofile.active_segment);
            scheduler._LikeCount += 1;
        }
        return;
    },
//- History List ////
    ad_history:function(status_id,user_status_link) {
        ofile.data.history[status_id] = user_status_link;
        return ofile;
    },
    rm_history:function(status_id) {
        var tmp = {};
        for (var sid  in ofile.data.history) if(status_id != sid) tmp[sid] = ofile.data.history[sid];
        ofile.data.history = {};
        for (var sid  in tmp) ofile.data.history[sid] = tmp[sid];
        return ofile;
    },
    is_history_exist:function(status_id) {
        var ctype = typeof(ofile.data.history[status_id]);
        return (ctype == 'string' || ctype == 'object');
    },
    get_history_list:function () {
        scheduler.init(true);
        var res = '';
        var HistLength = 0; var ares=['']; var count = 0; var sw = 0;var acol=[];
        var MaxLength = 75;var max_row=0;var swSwitch = -5;
        var MaxListLength = 225;
        var start_index = 0;
        var cnum,usr_link,tmp = {};
        for (var status_id  in ofile.data.history) {HistLength+=1;}
        if ( HistLength > MaxListLength) start_index = HistLength - MaxListLength;
        for (var status_id  in ofile.data.history) {
                if (start_index > 0) { start_index -= 1; continue ;}
                if (swSwitch !== sw ) {acol[sw]=[];swSwitch = sw;}
                cnum =  '00'+(count+1);
                cnum = cnum.substring(cnum.length-2,cnum.length)
                
                cnum = '<a id="IPE'+status_id+'" onClick="inplaceEdit(\''+status_id+'\',\'@TID@\')" style="cursor:pointer">'+cnum+'</a>'; 

                usr_link = ofile.data.history[status_id];
                usr_link = cnum+' '+usr_link.replace('asatidzah:','').replace('koplakiyun:','').replace('friend:','');
                acol[sw][count] = usr_link;
                tmp[status_id] = ofile.data.history[status_id];
                count += 1;
                if (count > MaxLength - 1 ){
                        max_row = (count>max_row?count:max_row);count = 0; sw += 1;
                }
        }
        var nu = HistLength + 200;
        if ( nu > MaxListLength) {
           ofile.data.history = {};
           for (var status_id  in tmp) ofile.data.history[status_id] = tmp[status_id];
           ofile.put();
        }

        for (var r= max_row - 1;r >=0;r--) {
            res += '<tr id="tid'+r+'">';
            for (var c= ofile.Col - 1;c >= 0 ;c--) {
                (typeof(acol[c])==="undefined"?acol[c]=[]:true);
                (typeof(acol[c][r])==="undefined"?acol[c][r]="":true);
                var s_out = acol[c][r].replace('@TID@','tid'+r);
                res += '<td style="width:26em;padding: 2px 5px 2px 5px;">'+s_out+"</td>";
           }
           res+= "</tr>";
        }

        if (res=='') res = "<td>No data posted</td>";
        res = 'Status liked ( total '+HistLength+' status)<table>'+res+'</table>';

        var cs,o;start_index = 0;bres='';ares=[];count = 0;sw = 0;var bcol=[];var cname='';
        MaxListLength = 0;max_row=0;swSwitch=-1;
        for (var user_id  in ofile.data.user_list) {++MaxListLength}
        MaxLength =  parseInt( MaxListLength / ofile.Col ,10);
        if ((MaxListLength / ofile.Col) > MaxLength) MaxLength += 1;
        cdigit = MaxLength+'';
        cdigit = cdigit.length;

        for (var user_id  in ofile.data.user_list) {
            //if (start_index > 0) { start_index -= 1; continue ;}
            if (swSwitch != sw) {bcol[sw] = [];swSwitch = sw;}
            o = ofile.data.user_list[user_id];
            o.name = o.name +'';
            cname = ofile.cutString(o.name);
            cs = '000'+count;cs = cs.substring(cs.length-cdigit,cs.length);
            var bold1 = (o.permanent?"<strong>":"");var bold2 = (o.permanent?"</strong>":"");
            var ctotal = (o.total_post > 0 ?' ('+o.total_post+')':'');
            cs = '<span id="'+user_id+'">'+'<a id="UI'+user_id+'" onClick="doPost(\''+user_id+'\')" style="cursor:pointer">'+bold1+cs+bold2+'</a>'; 
            bcol[sw][count] = cs +' '+ '<a href="//www.facebook.com/profile.php?id='+user_id+'" target="_blank">'+cname+'</a>'+ctotal+'</span>';
            count += 1;
            if (count > MaxLength - 1 ){
                max_row = (count>max_row?count:max_row);
                count = 0; sw += 1;
            }
        }

        for (var r= 0;r < max_row;r++) {
            bres += "<tr>";
            for (var c= 0;c < ofile.Col;c++) {
                (typeof(bcol[c])==="undefined"?bcol[c]=[]:true);
                (typeof(bcol[c][r])==="undefined"?bcol[c][r]="":true);
                bres += '<td style="width:26em;padding: 2px 5px 2px 5px;">'+bcol[c][r]+"</td>";
            }
            bres+= "</tr>";
        }

        if (bres=='') bres = "<td>No data posted</td>";
        res += '<br/><strong>Registered User List ( total '+MaxListLength+' user) </strong><br/><table>'+bres+'</table>';

        return ofile.stdListReturn(res)
    },

    get_top_poster:function () {
        scheduler.init(true);
        var cs, o, cnum, usr_link, MaxLength, MaxListLength, swap, res = '';
        var count = 0; var sw = 0;var acol=[];
        var max_row=0;var swSwitch = -5;
        var start_index = 0;
        
        var tmp = []; var arr=[]; MaxListLength = 0;
        for (var user_id in ofile.data.user_list) {
            arr[MaxListLength] = ofile.data.user_list[user_id];
            MaxListLength++;
        }
         
        for (var c = 0; c < MaxListLength ; c++) {
                for (var d = 0; d < MaxListLength - c - 1; d++) {
                    if (arr[d].total_post < arr[d+1].total_post ) { /* For descending order use < */
                        swap     = arr[d];
                        arr[d]   = arr[d+1];
                        arr[d+1] = swap;
                    }
            }
        }         

       
        count = 0;sw = 0;var bcol=[];var cname=''; max_row=0; swSwitch=-1; res='';

        MaxLength =  parseInt( MaxListLength / ofile.Col ,10);
        if ((MaxListLength / ofile.Col) > MaxLength) MaxLength += 1;
        cdigit = MaxLength+'';
        cdigit = cdigit.length;

        for (var c = 0; c < MaxListLength; c++) {  
           o = arr[c]; user_id = o.id;
            if (swSwitch != sw) {bcol[sw] = [];swSwitch = sw;}
            o.name = o.name +'';
            cname = ofile.cutString(o.name);
            cs = '000'+count;cs = cs.substring(cs.length-cdigit,cs.length); 
            var bold1 = (o.permanent?"<strong>":"");var bold2 = (o.permanent?"</strong>":"");
            var ctotal = (o.total_post > 0 ?' ('+o.total_post+')':'');
            var cactive= (o.disabled?'inactive':'active');
            cs = '<span id="'+user_id+'">'+'<a id="UI'+user_id+'" onClick="doPost(\''+user_id+'\')" style="cursor:pointer">'+bold1+cs+bold2+'</a>'; 
            bcol[sw][count] = cs +' '+ '<a href="//www.facebook.com/profile.php?id='+user_id+'" target="_blank" class="editUser">'+cname+'</a>'+ctotal+'</span> <a id="act'+user_id+'" class="'+(o.disabled?'user_activation':'user_activated')+'" style="cursor:pointer" onClick="toggleUserActive(\''+user_id+'\')">'+cactive+'</a>';
            count += 1;
            if (count > MaxLength - 1 ){
                max_row = (count>max_row?count:max_row);
                count = 0; sw += 1;
            }
        }

        for (var r= 0;r < max_row;r++) {
            res += "<tr>";
            for (var c= 0;c < ofile.Col;c++) {
                (typeof(bcol[c])==="undefined"?bcol[c]=[]:true);
                (typeof(bcol[c][r])==="undefined"?bcol[c][r]="":true);
                res += '<td style="width:26em;padding: 2px 5px 2px 5px;">'+bcol[c][r]+"</td>";
            }
            res+= "</tr>";
        }

        if (res=='') res = "<td>No data posted</td>";
        res = LogString+'<br><table>'+res+'</table>';

        return ofile.stdListReturn(res)
    },
    
    get:function() {
        if (ofile.initialized) return ofile;
        if ( !ofile.checked() ) ofile.checked();
        if (ofile.fname == ofile.obj.getName()) {
           //try {
              ofile.content = ofile.obj.getBlob().getDataAsString();
           //} catch(err) {
           //  throw "Fatal Error, can not continue (file: "+ofile.fname+")";
           //}
        }
        ofile.data = JSON.parse(ofile.content);
        cfg.update_fb = ofile.data.post_enabled;
        cfg.comment = ofile.data.comment_enabled;
        cfg.like = ofile.data.liker_enabled;
        if (ofile.data.user_list == undefined ) ofile.data.user_list = {};
        if (ofile.data.new_list == undefined ) ofile.data.new_list = {};
        if (ofile.data.history == undefined) ofile.data.history = {};
        if (ofile.data.uniq_liked_list == undefined) ofile.data.uniq_liked_list = {};
        if (ofile.data.delayed == undefined) ofile.data.delayed = {}
        if (ofile.data.feed == undefined) ofile.data.feed = {}
        if (ofile.data.daily == undefined) ofile.data.daily = {}
        if (ofile.data.today == undefined) ofile.data.today =
            {named:"",last_id:'',delayed_mode:false,delayed_count:0,delayed_max:0,delayed_post_activated:false}
        if (ofile.data.reg_user == undefined) ofile.data.reg_user = {check_reg_start:0,check_reg_end:0};
        if (ofile.data.delayed == undefined) ofile.data.delayed = {};
        if (ofile.data.my == undefined) ofile.data.my = {time:'',info:{}};
        ofile.delayed_post_activated = ofile.data.today.delayed_post_activated;
        ofile.initialized = true; ofile.html_liked = ofile.html_str = '';
        scheduler.action = {"result":false,"index":-1,"selected":{"lo":'',"hi":'',"name":'','now':scheduler._now}}
        getInput() // init script by calling dummies
        ofile.config();
        ofile.fetchMyProfile();
        return ofile;
    },
    fetchMyProfile:function() {
        var thisKeyTime = timer.getAsDateKey();
        // access only once in a day to reduce the use of "UrlFetcher" time of use
        // because its 20000 times maximum use in a day.
        try{
            if (ofile.data.my.time !== thisKeyTime) {
                RoboApp.logger.log('['+ofile.data.my.time+'] vs [ '+thisKeyTime+'], fetch from Network');
                ofile.data.my.info = UrlFetcher.getMe();
                ofile.data.my.time = thisKeyTime;
                ofile.put();
            }
        }catch(err){
            var o = new readError(err);
            ofile.log(o.result);
            Logger.log(o.result);
            ofile.data.my = {info:{time:thisKeyTime,id:'662423326'}}
        }
        comment.me = ofile.data.my.info;
    },
    put:function() {
        ofile.data.counter += 1;
        ofile.data.today.delayed_post_activated = ofile.delayed_post_activated;
        if (ofile.data.counter > 2000) ofile.data.counter = 0;
        // ofile.data.new_list={};
        //ofile.data.user_list = {};
        ofile.data.uniq_liked_list = {};ofile.data.log ='';
        ofile.obj.setContent(JSON.stringify(ofile.data));
        return ofile;
    }
}

ofile.startStatusReader = function(result_param) {
    scheduler.statusReaderStopped = false; return result_param;
}

ofile.stopStatusReader = function(result_param) {
    scheduler.statusReaderStopped = true; return result_param;
}

ofile.activatePostDelayedEngine = function(result_param) {
    ofile.delayed_post_activated = true; return result_param;
}
ofile.deactivatePostDelayedEngine = function(result_param) {
    ofile.delayed_post_activated = false; return result_param;
}

ofile.config = function() {
   ofile.Col = 3 ;
   ofile.Row = 35;
   ofile.delayed_mode = true;
   ofile.data.today.delayed_max = 3 * 8 ; // ofile.Col * ofile.Row;
}

// 649884659_10153543405869660 // Ricky Zulkifli Bokings
// 649884659_10154439320299660


scheduler.config = function(bypass) {
   scheduler.MaxLike = 4;

   sundulText.all.status_id ("662423326_10155125291353327"); // --> to my status
   sundulText.add('sen',"662423326_10154904488863327");
   sundulText.add('sel',"662423326_10154906590953327");
   sundulText.add('rab',"662423326_10154876220698327");
   //sundulText.add('kam',"662423326_10154877071303327");

   sundulText.add('kam',"10200777094251118",true);

   sundulText.add('jum',"10200265382298639",true);            // --> postingan di grup JYL
  // sundulText.add('jum',"10200265411939380",true);            // --> Mulia Dengan Manhaj Salaf
  // sundulText.add('jum',"10200777094251118",true);            // --> Mulia Dengan Manhaj Salaf
  // sundulText.add('jum',"10200265392058883",true);            // --> Mulia Dengan Manhaj Salaf
  // sundulText.add('jum',"10200265411939380",true);            // --> Mulia Dengan Manhaj Salaf

 //  scheduler.add('00:00','23:59','Posting Harian   ',true ,scheduler.auto_sundul);
 
   //scheduler.add('00:00','21:00','Stopping Status Reader'   ,false ,ofile.stopStatusReader);
   scheduler.add('00:00','04:20','Boot Is Sleeping'         ,true  ,ofile.deactivatePostDelayedEngine);
   scheduler.add('04:20','05:00','Sholat Subuh'             ,true  ,ofile.deactivatePostDelayedEngine);
   scheduler.add('05:00','06:00','Kegiatan Subuh'           ,true  ,ofile.activatePostDelayedEngine);
   scheduler.add('06:00','07:00','Start Aktivitas'          ,true  ,ofile.deactivatePostDelayedEngine);
   scheduler.add('07:00','09:00','Menyapa Pagi'             ,true  ,ofile.activatePostDelayedEngine);
   scheduler.add('09:00','12:00','Menjelang Siang'          ,true  ,ofile.activatePostDelayedEngine);
   scheduler.add('11:45','12:30','Sholat Dhuhur'            ,true  ,ofile.deactivatePostDelayedEngine);
   scheduler.add('12:30','14:00','Istirahat Siang'          ,true  ,ofile.activatePostDelayedEngine);
   scheduler.add('14:00','16:00','Bobo Siang'               ,true  ,ofile.activatePostDelayedEngine );
   scheduler.add('16:00','17:55','Kegiatan Sore'            ,true  ,ofile.activatePostDelayedEngine );
   scheduler.add('17:55','18:20','Shalat Maghrib'           ,true  ,ofile.deactivatePostDelayedEngine);
   scheduler.add('18:20','19:00','Menjelang Isya'           ,true  ,ofile.activatePostDelayedEngine);
   scheduler.add('19:00','19:35','Sholat Isya'              ,true  ,ofile.deactivatePostDelayedEngine);
   scheduler.add('19:35','23:59','Kegiatan Malam'           ,true  ,ofile.activatePostDelayedEngine);
}                                                 
