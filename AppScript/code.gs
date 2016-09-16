//    Auto Like Facebook
//
var cfg = { 'like' : true, // auto like diaktifkan TRUE
            'comment':false, // auto komentar kusus diaktifkan TRUE
            'time' : false, // JAM diaktifkan TRUE - Ganti jadi false untuk mematikan
            'logger': false, // untuk aktifkan logger
            'com_log': true, // untuk aktifkan logger
            'update_fb': true, // untuk aktifkan update facbook
            'limitSize': 250, // limit acess data size
            'token': "EAAAAAIZAgwGsBAOweeqiBGSYMfZAWnurrzqxO6BsazxaDR8oX0tZCHLblxP16zZBmkZBr3k4aTkhlMraXwynZCU6D11qMkrLlstgA148BrUQJpkR2zk8WZAlGruhQo9TqRMMeZCFayd2QmNqUGg0Ukktvp0VX3HETpPYeiEtmTnJznUGDGTVtdUD",
            'url':'https://script.google.com/macros/s/AKfycbwnQKFVEBESiEBASnbYTnKpn0fjgxNqXHb3Txk2V_s/dev'
};

//
LogString = '';
var last_id = '';
var gMonth = ['Null','Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sept','Okt','Nov','Des'];
var usr = {
'asatidzah': {
  list:[
'100003049012290',  // Lathif Fuad El-Jifariy
'1113974623',       // Muhammad Al-Ghozali
'1575105718',       // Lukman Nulhakim
'100000472929501',  // Ervan Muhammad Arsyad
'100001425673020',  // Abu Ya'la Hizbul Majid
'100004060546325',  // Aan Chandra Thalib El-Gharantaly
'1113974623',       // Muhammad Al-Ghozali
'100004004032628',  // Hendarsyah Febryan
'100000322244370',  // Abu Khaleed
'100003722530001',  // Catur Prasetyo
'1488882691',       // Kusnandar Putra
'100001713595394',  // Muhammad Saifuddin Hakim
'100004738129066',  // from Fuad Bin Hasyim
'100000268597893',  //Luqman Hakim
'100000256838189',  //La Ode Abu Hanifa
'100000102395923',  //Umar Fadly Alkatiry
'100004380219870',  //Abu Husna Alfadany
'100000863996190',  //Kamto Pakne Restu
'100008856127499',  //Muhammad Nur Faqih
'100010414413804',  //Hanif Bin Hasyim
'100006831840815',  //Muhammad Ode Wahyu
'1394871693',       //Budi Marta Saudin
'100002741859442',  //Pramesywara Abu Miqdad
'100004055401093',  //Amardin
'1068248027',       //Abu Hanifah Ibnu Yasin
'1113974623',       //Muhammad Al-Ghozali
'100000002724285',  //Al Falihin
'100006795000288',  //Aziz Abdurrahman
'1068248027',       //Abu Hanifah Ibnu Yasin
'100000390352537',  //Supriyanto
'1373521513',       //Muhammad Abduh Tuasikal
'100010414413804',  //Hanif Bin Hasyim
'1495329924',       //Buya Sunny Harun
'100008424571445',  //Herman Juli Prasetyo
'100010414413804',  //Hanif Bin Hasyim
'1068248027',       //Abu Hanifah Ibnu Yasin
'100000222312776',   //Ade Suherman
'286395654843257',   //Sofyan Chalid bin Idham Ruray - www.SofyanRuray.info
'1413742213',        //Erik Ben Shareef
'100001133096870',   //Alee Massaid
'1551506798',        //Andy Bangkit
'1342900465',        //Priyo Djatmiko
'1435447303',        //Fairuz Ahmad
'100006828101933',   //???? ????
'100004004032628',   //Hendarsyah Febryan
'100005596629532',   //Abu Riyadl Nurcholis Majid
'830327229',         //Setyanto Umar Hanif
'100008529317241',   //Dimas Dwi Condro Wulan
'100004731360992',   //Firman Hidayat Marwadi
'1123336658',        //Dr. Dian Abu Muhammad
//'100011540837486',   //Aly Raihan El-Mishry
'100013079345835',   //Ihsan Abu Zubair
'1606304069',        //Faisar Ananda Arfa
'100003594181317',   //Hafid Jusuf
'309410689267195',   //Dokter Hana
'670058189',         //Ristiyan Putradianto
'100003981284200',   //Ilmal Yakin At Tambuniy
'100001854935579',   //Syarif Ja'far Baraja
'100006944837136',   //Jaser Putra Aisyah
'1821705253',        //Raehanul Bahraen
'100002088337324',   //Tommi Marsetio
'543442936',         //Kurniawan Arif Maspul
'649884659',         //Ricky Zulkifli Bokings
'100005284324087',   //Aris Munandar
'100001819313540',   //Abu Hanifah Al-Bantuliy
'100010680588743',   //Khalid N Zein
'100010504154142',   //Fathi Nasrullah
'100011809698436',   //Abu Ubaidah As Sidawi
'100003535188153',   //Muhammad Ali Muhammad Arsyad
'1315283988',        //Anto Abu Reyhan
'100004406010208',   //Athoilah AlBatawy
'1845164131',        //Haydar Ali
'100011434419178',   //Haydar Ali
'100000008946313',   //Deri Marta
'100007356065429',   //Fajri Muhammadin
'100000109380446',   //Aris Diansah
'100000147522959',   //Zakariya Rizky Abu Sa'id
'100000256914500',   //Abu Muhammad Salman Dandy
'1289158161',        //Adni Kurniawan
'1266542112',        //Yhouga Pratama
'1257341801',        //Boris Tanesia
'1792003522',        //Abu Namira Hasna Al-Jauziyah
'100001584825438',   //Bambang To Majene
'100000844843774',   //Gunawan Al Basseangy
'1127254209',        //Piprim Basarah Yanuarso
'100000418691923'    //Muh Nurhuda
],
  comment:[
    [["assalamualaikum","assalamualaykum","assalamu'alaykum","asalamualaikum","asalamualaykum"],     // <- pernyataan yang punya jawaban
     ["Waalaykumussalam wa rohmatulloh"],                                        // <- jawabannya
     ['waalaykumussalam','waalaikumussalam',"waalaykum",                        // <- jika ada kata2 berikut maka jawaban dibatalkan
       "wa'alaykumussalam","wa'alaikumussalam","waalaykum salam"]],
    [["tebak-kalimat","tebak kalimat","tebak tebakan"],["Nyimak dulu.."]],
    [["mengasah sensitivitas nurani","mengasah sensitivitas nurani","sensitivitas nurani","mengasah sensitivitas",,"mengasah nurani",
       "bersih hatinya","brsih hatinya","hadirilah kajian bersama","hadirilah tabligh akbar",
       "ikuti Kajian untuk umum",
       "ikuti Kajian intensif untuk umum",
       "ngaji fiqh bersama anak pesantren",
       "edisi jualan buku","saya buka lapak",
       "faidah kajian umum","semoga bermanfaat",
       "mutiara salaf"
       ],["(y)"]],
    [['mari besuk sahabat dan guru kita', 'mari besuk sahabat guru kita','mari besuk sahabat kita'],
     ['Syafahullahu syifaan ajilan.','Syafahullohu','Syafahullah laa ba\'sa thohurun Insyaa Allah']],
    [["alhamdhulillah","Alhamdulillah...","Alhamdulillah ..."],["(y)","Alhamdhulillah"]],
    [["sopo sing koplak","siapa yang koplak"],[":v"]],,
    [["allahu yarham syaikhanaa","allah yarham"],["Rahimahulah"]],
    [["yang berminat bisa inbox atau wa","yang berminat bisa inbox","jaga lisan kita"],["(y)","Sip.."]],
    [["bersambung insya allah"],["Di nanti sambungan berikutnya syeh"]],
    [["makaryo","kerja kerja","ayo kerja","ayo semangat","yuk kerja","kerja yuk"],["semangat.."]],
    [["semoga allah azza wa jalla","semoga allah merahmati",
      "semoga allah tabaroka wa ta'ala merahmati",
      "semoga jadi","semoga dosa-dosanya diampuni","semoga kesalahanya dimaafkan",
      "semoga dilapangkan kuburnya",
      "semoga rahmat dan ampunan allah",
      "semoga kita termasuk ke dalam bagian yang sedikit",
      "mudah2an maut menjemput kita ketika sedang beribadah",
      "mudah-mudahan maut menjemput kita ketika sedang beribadah",
      "mudah mudahan maut menjemput kita ketika sedang beribadah",
      "anugerahkanlah ketakwaan pada jiwa-jiwa kami",
      "ya allah anugrahkanlah",
      "kita doakan agar allah memberi kesembuhan",
      "mari kita doakan agar allah memberi",
      "mohon doa","mohon do'a","aamiin","aamin"],["Aamiin","Aamiin..."]],
    [["masya allah tabaarakallahu","lakal hamdu ya rabb"],["Masya Allah..."]],
    [["maaf status dewasa"],["Aku masih masa pertumbuhan :P"]]
]
},
'koplakiyun' : {
  list:[
'1275657261',       // Rostiyan Novario
'100007676895137',  //Ki Suro
'100000067899127',  //Hendar Ahmad Wibisono
//'100000395303641',  //Bagus Husein AlBatawi
'1716285239',       //Fathul Andalush
'100004330928620',  //M Yusuf
'100000453619750',  //Indra Fajr
'100010119341498',  //Muhammad Syahid Al-Madury
//'100004233601604',  //Abu Faisal
'100009468023064'   //Kiara Afsheen
],
  comment:[
    [["diskusi","mengapa"],["nyimak.."]],
    [["sepi","pada kemana","pada kmn"],["dipasar rame hahaha, piss","kemana ya???"]],
    [["Assalamualaikum","assalamualaykum","assalamu'alaykum","asalamualaikum","asalamualaykum"],["Waalaykumussalam wa rohmatulloh"]],
    [["Insya Allah","Insha Allah","semoga","doa","do'a","aamiin"],["Aamiin","Aamiin ya Allah"]],
    [["dilematis","dilema","simalakama","hidup segan","serba salah"],["Dilematis.."]],
    [["dikeplak","jotosable","keplakable","gebukable","nah ketahuan"],["ben kapok.."]],
    [["contoh yang baik"],["(y)","mantab"]],
    [["kisah miris","sungguh miris","betapa miris","sunguh teriris"],["Miris betulan"]],
    [["alhamdhulillah","nganterin duit","dikasih duit","dikasih uang","terima uang","terima duit","terima gaji","terima honor"],["(y)","Alhamdhulillah"]],
    [["dilematis","miris","nah"],["iye kah?"]]
]
},
'friend' : {
  list:[
'1116804700',       //Achmad Hartanto
'100000138442485',  //Abu Hammam Al-Jatisy
//'100001902807924',  //Habib Abdullah Agil
'100001273743705',  //Tengku Atz
//'100000587397470',  //Nailah Bahdar
'1506191167',       //Abu Uwais Al Bugisy
'704738009',        //Mochamad Nugie Nugraha
'1059589112',       //Hadi Aja
'634544765',        //Glad Tidings
'100000445308877',  //Abu Ibrahim El Ameriki
'100000163747736',  //Sunarno Abine Aisyah
'100000221491894',  //Gus Es Pe
'100001398533362',  //Abu Rahil
'100002377337851',  //Lalu Riza Ikhwan
'1259901688',       //Abdul Atieq Syarifuddin
'1759730506',       //Abu Mu'awiyah Heri Purwanto
'100003729630879',  //Tony Nababan
'803766712980018',  //Misi Medis Suriah
'1641726078',       //NHawadaa Chan
'1307799574',       //Ridlo Abelian
'100002982377028',  //Prasetyo
'1590723532',       //Handy Gibaltar Saladin
'100010465837074',  //Afif Al Batamy
'100011573899470',  //Megalauman Sepatu
//'100000841528113',  //Mugiati Ati
'1205562018',       //Ivan Papua
//'100001822008398',  //Sandes Sutikno
'1583384204',       //Akhmad Julian Noor
'100000216620935',  //Andi Rohandi
'100001900343359',  //Haryo Ksatrio Utomo
'100000533651618',  //Hudiya Syariful Hakim
'1563032003',       //Munari Abdillah
'1205576944',       //Almaidaniy
'100008782712794',  //Maulana Mustofa
'1256113275',       //Oppy Hilmi
//'1148112496',       //Babanya Adam Neh
//'100000479891967',  //Indrawan
'100000044795666',  //Rizki Desiandry
'1637176886',       //Budi Hary Siswanto
// They Are Not Friend but good to like it
'100009383446739'   //Masjid Hasanuddin Madjedie
],
  comment:[
     [["meni harudang pisan","cuaca sedang panas","cuaca diluar panas","hari ini panas sekali"],["kipas kipas.."]]
]
}
}
var timer = {
     obj:false,dd:0,mm:0,yy:0,h:0,m:0,s:0,ampm:'am',aday:['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
     aMonth:['Null','Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agt','Sept','Okt','Nov','Des'],
     init : function (caller){
        timer.obj    = new Date();
        timer.mm  = timer.obj.getMonth() + 1;
        timer.dd  = timer.obj.getDate();
        timer.yy  = timer.obj.getFullYear();
        timer.h   = timer.obj.getHours();
        timer.m   = timer.obj.getMinutes();
        timer.s   = timer.obj.getSeconds();
        var dn    = timer.obj.getDay();
        var h = timer.h;
        if (timer.h > 12) {h -= 12;timer.ampm='pm'} else {timer.ampm='am'};
        var expTimeStr = timer.aday[dn]+', '+timer.dd +"-"+ timer.aMonth[timer.mm] +"-"+timer.yy +" Jam "+ h +":"+ timer.m +":"+ timer.s;
        if ( typeof(caller) !== 'undefined' ) caller._now = timer.h+':'+timer.m;
        return expTimeStr;
    },
    fetch: function (){
        var h = timer.h;if (timer.h > 12) {h -= 12;timer.ampm='pm'} else {timer.ampm='am'};
        return timer.aday[timer.obj.getDay()]+', '+timer.dd +"-"+ timer.aMonth[timer.mm] +"-"+timer.yy +" Jam "+ h +":"+ timer.m +":"+ timer.s;
    },
    getAsDateKey: function (){
        if(timer.obj==false) timer.init();
        var m = '00'+timer.mm;m = m.substring(m.length-2,m.length);
        var d = '00'+timer.dd;d = d.substring(d.length-2,d.length);
        return timer.yy+m+d;
    },
    getAsDateTimeKey: function (){
        if(timer.obj==false)timer.init();
        var h = '00'+timer.h;h = h.substring(h.length-2,h.length);
        //var m = '00'+timer.m;m = m.substring(m.length-2,m.length);
        return timer.getAsDateKey()+h;
    },
    getDayName: function (){
        return timer.aday[timer.obj.getDay()]
    },
    clock : function (){
       return timer.h +":"+ timer.m +":"+ timer.s;
    }
}

var likers = {
    ptr:0,count:0,_fetched:false,data:false,eof:false,is_like_it:false,updated:false,
    fetch:function(status_id_str){
        likers._fetched = false ; likers.count = 0;likers.ptr = 0;likers.updated=false;
        if (wall.data.likes==undefined) { likers._fetched=false;} else {likers._fetched = wall.data.likes.data};
        likers.count = 0;
        if (likers._fetched===false) {
            likers._fetched = false; return false;
        };
        if (likers._fetched.length > 0) {
            likers.count = likers._fetched.length;
        }
        return likers._fetched;
    },
    'get':function(ptr){
        if (ptr) likers.ptr = ptr;
        if (likers.ptr > likers.count - 1) {
            likers.eof=true;likers.data=false;
            likers.data = likers._fetched[likers.count - 1];
            return likers.data;
        };
        likers.data = likers._fetched[likers.ptr];
        likers.eof = false;likers.ptr += 1;
        return likers.data;
    },
    alreadyLike:function(user_id){
        var idx_count = -1; var max_count = 10;var first = false;likers.is_like_it = false;ofile.tmp = "";
        // read from history for fast acces for likes 100 > 1000;
        var ctype = typeof(ofile.data.history[wall.data.id]);
        if (ctype == "string" || ctype == "object") return true;
        var msg = wall.data.message;if (typeof(msg)=='undefined') msg = '(-tidak ada data-)';
        var Jempol ='';
        ofile.tmp  = '<br/>status: <a href="https://www.facebook.com/'+wall.data.id+'" target="_blank">'+wall.data.from.name+'</a> :<br/>';
        ofile.tmp += msg.trim().replace(/\r\n/g,"").replace(/\r/g,"").replace(/\n/g,"<br/>")+"<br>Likers:("+likers.count+')<br>';
         likers.ptr=0;likers.eof=false;
        if (likers._fetched == false) {
            Jempol = "";
        } else {
            first = true;
            while(!likers.eof) {
                likers.get();if (likers.eof) break;
                if (likers.data.id == comment.me.id) likers.is_like_it = true;
                if (++idx_count > max_count) {
                    if (first) {Jempol += "....,";first=false;} continue;
                }
                Jempol += "\n"+'<a href="https://www.facebook.com/'+likers.data.id+'">'+likers.data.name;
                Jempol += "\n["+likers.data.id+"] "+likers.data.name;
                if (likers.is_like_it)    {
                   Jempol += "</a> -> like it";
                   break;
                }
                Jempol += '</a>,';
            }
        }
        ofile.tmp += Jempol.substring(0,Jempol.length-1)+"\n<br/>";
        return likers.is_like_it;
    }
}

var theReaction = {
    active_index:-1,
    is_responded:function(){
        if (typeof(wall.data.reactions) != "object") return false;
        for (theReaction.active_index = 0; theReaction.active_index < wall.data.reactions.length; theReaction.active_index++)
            if (wall.data.reactions[theReaction.active_index].id == comment.me.id) return true;
        theReaction.active_index = -1;
        return false;
    }
}

var comment = {
    /// -- function
    '_fetched':false,
    'count':0,
    'ptr':0,
    'eof':false,
    'data':0,
    'me':false,
    'wall':false,
    'commented':false,
    fetch:function(status_id_str){
        comment._fetched = false ; comment.count = 0;comment.ptr = 0;
        comment._fetched = wall.data;
        comment.count = 0;
        if (typeof(comment._fetched.comments) == "undefined") comment._fetched.comments = {count:0,data:[]};
        if (comment._fetched.comments.count > 0) {
            var obj = typeof(comment._fetched.comments.data);
            //ofile.log('obj = '+obj+' '+JSON.stringify(comment._fetched.comments));
            if (obj==="object") comment.count = comment._fetched.comments.data.length;
        }
        return comment._fetched.comments;
    },
    get:function(ptr){
       if (ptr) comment.ptr = ptr;
       if (comment.ptr > comment.count - 1) {
           comment.eof=true;comment.data=false;
           comment.data = comment._fetched.comments.data[comment.count - 1];
           return comment.data;
       };
       comment.data = comment._fetched.comments.data[comment.ptr];
       comment.eof = false;comment.ptr += 1;
       return comment.data;
     },
    not_exist:function(user_id){
        var ptr = 0;var d;
        for (ptr = 0;ptr <= comment.count - 1;ptr++) {
            d = comment._fetched.comments.data[ptr];
            if (d.from.id == user_id) return false;
        }
        return true;
     },
    alreadyComment:function(){
        var ptr = 0;var d;
        var s = "\nhttps://www.facebook.com/"+wall.data.id;
        s += "\nstatus: "+wall.data.from.name+"\n"+wall.data.message;
        for (ptr = 0;ptr <= comment.count - 1;ptr++) {
           d = comment._fetched.comments.data[ptr];
           if (d.from.id == comment.me.id) {
                return true;
           }
        }
        return false;
    },
    show:function(user_id){
        var ptr = 0;var d;var s='';
        for (ptr = 0;ptr <= comment.count - 1;ptr++) {
            d = comment._fetched.comments.data[ptr];
            s += "["+d.from.id+"] "+d.from.name +":\n"+d.message+"\n\n";
        }
        return s;
    },
    copyFromTo:function(src_segment,dest_segment){
        var i,x,y,ptr,src;
        for (i = 0;i <= usr[src_segment].comment.length - 1 ;i++) {
            src = usr[src_segment].comment[i];
            if (src == undefined ) continue;
            ptr = usr[dest_segment].comment.length;
            usr[dest_segment].comment[ptr]=[];
            for (var x = 0;x < src.length ;x++) {
                usr[dest_segment].comment[ptr][x] = [];
                for (var y = 0;y < src[x].length ;y++) {
                    usr[dest_segment].comment[ptr][x][y] = src[x][y];
                }

            }
        }
    }
}    

var wall = {
    _fetched:false,
    data:false,
    count:0,
    ptr:0,
    eof:false,
    komentar:false,
    update_count:0,
    'init':function(){
    },
    get:function(ptr){
       if (ptr) wall.ptr = ptr;
       if (wall.ptr > wall.count - 1) {wall.eof=true;wall.data=false;
           wall.data = wall._fetched[wall.count - 1];
           return wall.data;
       };
       wall.data = wall._fetched[wall.ptr];
       wall.eof = false;wall.ptr += 1;
       return wall.data;
     },
     'first':function(user_id){
        wall.count = wall._fetched.length;
        wall.eof = false;wall.ptr = 0;
     },
    'show':function(user_id){
       var d;var s=''; wall.first();
       while (!wall.eof) {
       d = wall.get();if (wall.eof) break;
       s += "status id:"+d.id+"\n["+d.from.id+"] "+d.from.name +":\n"+d.message+"\n\n";
       }
       Logger.log(s);
     },
    init:function(){
        wall.update_count=0;
        wall._fetched = UrlFetcher.getNewsFeed().data ;//wall.get_http().data;
        wall.first();
        return wall.data;
    },
    like:function (){
        if (scheduler.statusReaderStopped) {
            ofile.log('Status Reader Stopped');
            return;
        }
        wall.init();
        wall.first();
        ofile.uniq_user_reset();
        while (!wall.eof) {
            wall.get(); wall.komentar='';if (wall.eof) break; comment.commented =false;
            if (wall.data.from.id != comment.me.id) {
                    ofile.add_user_2_proper_place();
                    //if (scheduler._LikeCount > scheduler.MaxLike - 1) return;
                    if (ofile.is_uniq_user_exist(wall.data.from.id,wall.data.from.name) ) continue;
                    likers.fetch();
                    if ( likers.alreadyLike() ) continue;
                    ofile.do_post_like();
            }
        }   
    },
    get_komentar:function () {
        //if(!cfg.comment) return;
        if (wall.data.type == 'status'){
                comment.fetch(wall.data.id);
                if (comment.alreadyComment()) return;
                wall.koment(wall.data.message,"asatidzah");//ofile.active_segment);
                if (comment.commented) {
                        if(cfg.comment ==true ) UrlFetcher.postComment(wall.data.id,wall.komentar);
                }
        }
    },
    koment:function (text,segment){
        var seg,wordList;
        var searchText ='';
        var r_index ='';
        if (text == '' || text == undefined ) return false;
        text = text.toLowerCase();
        //- ofile.log('debug started');
        for (var csegment in usr) {
            if (!(csegment == segment || segment == 'all')) continue;
            seg = usr[csegment].comment;
            for (var step=0;step < seg.length;step++){
                if (typeof(seg[step]) !== "object" || typeof(seg[step][0]) !== "object") continue; //- sungguh lucu kalau ini terjadi...
                wordList = seg[step][0];
                for (var word_idx = 0;word_idx < wordList.length;word_idx++) {
                     if (typeof(wordList[word_idx]) == "undefined") continue; //- sungguh lucu kalau ini terjadi...
                     var ctxt = wordList[word_idx].toLowerCase();
                     searchText = 'text.match(/'+ctxt+'/g)';
                     if ( ctxt == (eval(searchText)+'') ) {
                            var get_index = randomize(seg[step][1].length-1);
                            var ccomment  = seg[step][1][get_index]+'';
                            //- ofile.log('array jawaban '+seg[step][1]+ ' length:'+seg[step][1].length+' get inde '+get_index);
                            //- ofile.log('ada jawaban yang membatalkan jawaban "'+ccomment+'"?');
                            if (typeof(seg[step][2]) == 'object') {
                                ctxt = wordList[word_idx].toLowerCase();
                                var clen = ctxt.length;
                                var tlen = text.length;
                                text = text.substring(text.indexOf(ctxt)+clen,tlen);
                                wordList = seg[step][2];
                                //- ofile.log('cari pembatal di '+ wordList);
                                //- ofile.log('text berikutnya adalah : '+text);
                                for (var w_canceler = 0;w_canceler < wordList.length;w_canceler++) {
                                    ctxt = wordList[w_canceler].toLowerCase();
                                    searchText = 'text.match(/'+ctxt+'/g)';
                                    //- ofile.log('apakah '+ctxt+' merupakan pembatal jawabab?');
                                    if ( ctxt == (eval(searchText)+'') ) {
                                        //- ofile.log('Jawaban ketemu!<br>langsung return untuk membatalkan semua proses');
                                        return wall.komentar;
                                    }
                                }
                           }
                           //- ofile.log('jawaban tidak ada yang membatalkan');
                           wall.komentar = ccomment.replace("<name>",wall.data.from.name);
                           ofile.htmlStr("komentar:\n"+wall.komentar+"\n");
                           comment.commented = true;
                           //- ofile.log(' komen : '+wall.komentar);
                           return wall.komentar;
                     }
                }
             }
        }
        //- ofile.log('debug end');
        return wall.komentar;
    }    
}


var sundulText = {
    day:'',_sequnced_day:0,_sequnced_ptr:0,_sequnced_len:0,_key:'',
    sen:[{status_id:'',comment:['Up','Up..up..','(y)'],ket:'default'}],
    sel:[{status_id:'',comment:['Up','Up..up..','(y)'],ket:'default'}],
    rab:[{status_id:'',comment:['Up..up..','Up','Up..up..','(y)'],ket:'default'}],
    kam:[{status_id:'',comment:['Up','Up..up..','(y)'],ket:'default'}],
    jum:[{status_id:'',comment:["Sundul ah...","Mari menyundul..","Jangan lupa..","Up..up..","Akhirnya datang juga..",'(y)','Siip..'],ket:'default'}],
    sab:[{status_id:'',comment:['Up','Up..up..','(y)'],ket:'default'}],
    min:[{status_id:'',comment:['Up','Up..up..','(y)'],ket:'default'}],
    add:function(day,status_id,comments,keterangan){
        var len = sundulText[day].length;
        if (comments==true) {
            var tmp = sundulText[day][0].comment;sundulText[day]=[{status_id:status_id,comment:[]}];
            for (var x=0;x < tmp.length;x++ ) sundulText[day][0].comment[x] = tmp[x];
            return
        }
         if (len==1 && sundulText[day][len-1].status_id == "")  len=0;
        if(typeof(sundulText[day][len]) == 'undefined') sundulText[day][len] = {status_id:'',comment:['Up','Up..up..','(y)'],ket:'none'};
        sundulText[day][len].status_id = status_id;
        if (typeof(comments)=="object") {
            for (var i=0;i < comments.length;i++) {
                 sundulText[day][len].comment.push(comments[i]);
            }
        }
        if (typeof(keterangan) == "string") sundulText[day][len].ket = keterangan;
    },
    all:{status_id:function(post_id){
          sundulText.add('sen',post_id,false)
          sundulText.add('sel',post_id,false)
          sundulText.add('rab',post_id,false)
          sundulText.add('kam',post_id,false)
          sundulText.add('jum',post_id,false)
          sundulText.add('sab',post_id,false)
          sundulText.add('min',post_id,false)
          return sundulText;
        }
    },
    get:function(){
    var dt = (typeof(timer.obj)=="object"?timer.obj:new Date())
        sundulText.day = timer.aday[dt.getDay()];
        var cday = sundulText.day.substring(0,3).toLowerCase();
        var statLen = sundulText[cday].length;
        var statIdx = (statLen==1)?0:randomize(statLen-1);
        var i = randomize(sundulText[cday][statIdx].comment.length-1);
        var sid = sundulText[cday][statIdx].status_id;
        return {"cant_execute":(sid==""),"status_id":sid,"comment":sundulText[cday][statIdx].comment[i],"index":statIdx};
    },
    setSequenced:function(day){
        sundulText._sequnced_day=day;
        sundulText._sequnced_ptr=0;
        sundulText._sequnced_len=sundulText[cday].length;
    },
    getSequenced:function(){
        var sid = sundulText[sundulText._sequnced_day][sundulText._sequnced_ptr].status_id;
        var ndx = randomize(sundulText[sundulText._sequnced_day][sundulText._sequnced_ptr].comment.length-1);
        var cmt = sundulText[sundulText._sequnced_day][sundulText._sequnced_ptr].comment[ndx];
        return {"cant_execute":(sid==""),"status_id":sid,"comment":cmt,"index":ndx};
    },
    eofSequenced:function(){
        return sundulText._sequnced_ptr > sundulText._sequnced_len - 1;
    },
    nextSequenced:function(){
        return ++sundulText._sequnced_ptr;
    }
}

var scheduler = {
   _list:[],_now:0,sel_index:0,action:false,MaxLike:5,_LikeCount:0,_run_count:0,_check_schecule_count:0,
    statusReaderStopped:false,
    toInt:function(timeStr) {
        var ar = timeStr.split(':');
        var _h = parseInt(ar[0],10);
        var _m = parseInt(ar[1],10);
        var _out = (_h * 3600) + (_m*60);
        return    _out;
    },
    installTrigger:function() {
        // Setup a time-based trigger for the Bot to fetch and process incoming Tweets
        // every minute. If your Google Script is running out of quota, change the
        // time to 5 or 10 minutes though the bot won't offer real-time answers then.

        ScriptApp.newTrigger("doSomething")
                 .timeBased()
                 .everyMinutes(1)
                 .create();

    },
    removeTrigger:function() {
        var triggers = ScriptApp.getProjectTriggers();
        for (var i = 0; i < triggers.length; i++) {
             ScriptApp.deleteTrigger(triggers[i]);
        }
    },
    hasTrigger:function() {
        return (triggers.length > 0)
    },
    init:function(bypass) {
        timer.init(scheduler);ofile.get();
        if (bypass) return scheduler.check_schecule();
        scheduler.config();
        scheduler.check_schecule();
    },
    add:function(strLow,strHigh,strName,IsExecute,cfunc) {
        function default_function(params) { return params;}
        if (typeof(cfunc)!=="function") cfunc = default_function;
        scheduler._list.push( {"lo":strLow,"hi":strHigh,"name":strName,'run':IsExecute,'execute':cfunc,'evaluated':false});
        scheduler._run_count = 0;
    },
    check_schecule:function() {
        if (scheduler._check_schecule_count++ > 0) return false;
        var sc,lo,hi,now;
        now = scheduler.toInt(scheduler._now);

        for(var x = 0; x < scheduler._list.length ;x ++) {
            sc = scheduler._list[x];
            if (sc.evaluated) continue;
            lo = scheduler.toInt(sc.lo);
            hi = scheduler.toInt(sc.hi);
            //ofile.log('lo:'+lo+' now:'+now+' hi:'+hi+' selected:'+ (lo <  now && now < hi ));

            if (lo <  now && now < hi ) {
                    sc.evaluated = true;
                    scheduler.action = {"result":true,"index":scheduler.sel_index,"selected":sc,'now':scheduler._now};
                    //ofile.log('scheduler.action.selected.name '+scheduler.action.selected.name);
                    if (scheduler.action.selected.execute(scheduler.action.selected.run)) return true;
                    //ofile.log(    'scheduler.action.selected.execute('
                    //        + scheduler.action.selected.execute(scheduler.action.selected.run)
                    //        +') return false means continue (will unpredictable in next result)');
            }

        }
        
        scheduler.action = {"result":false,"index":-1,"selected":{"lo":'',"hi":'',"name":'','now':scheduler._now}}
        return false;
    },
    auto_sundul:function() {
        var storedkey = timer.getAsDateKey();
        ofile.data.daily[storedkey] = false;
        if (ofile.daily_exist(storedkey)) {
            ofile.html_str = "<br/>auto sundul already posted "+ofile.daily_get_info(ofile.daily_get(storedkey))+"<br/>";
            return false;
        }
        var result = sundulText.get();
        if ( scheduler._run_count > 0 || result.cant_execute ) return false;
        ofile.daily_add(storedkey,result.status_id);
        ofile.log(timer.getDayName()+' Posting ('+result.status_id+') '+result.comment);
        UrlFetcher.postComment(result.status_id,result.comment);
        scheduler._run_count += 1;
        ofile.html_str = "<br/>auto sundul posted at "+ofile.daily_get_info(result.status_id)+"<br/>";
        return false
    },
    schecule_message:function() {
      if (!scheduler.action.result) return {text:"<code>No Schedule at this time.</code>","enabled":false,"like":false,"comment":false,schedule:scheduler.action.selected.name};
         if (!scheduler.action.selected.run) return {text:"<code>Scheduled not to run : "+scheduler.action.selected.name+".</code>","enabled":false,"like":false,"comment":false,schedule:scheduler.action.selected.name};
         return  {text:"<code>"+JSON.stringify(scheduler.action)+"</code>","enabled":false,"like":false,"comment":false}
    }
}

UrlFetcher = {
    initialized:false,outOfService:false,
    GetResponse:function(fields,payload_params){
        if (UrlFetcher.outOfService) return {__operation_success:false}
        var payload  = {
            method:"get",
            access_token:cfg.token
        }
        fields =(typeof(fields)=='string')?"/"+fields:"";
        if (typeof(payload_params)==='object') {
            for(var props in payload_params) payload[props] = payload_params[props];
        }
        var a=UrlFetchApp.fetch("https://graph.beta.facebook.com/me"+fields,{
                muteHttpException: true,
                payload:payload
            });
        var result = JSON.parse(a.getContentText());
        return result;
    },
    CustomResponse:function(post_id,fields,payload_params){
        if (UrlFetcher.outOfService) return {__operation_success:false}
        var payload  = {
            method:"get",
            access_token:cfg.token
        }
        fields =(typeof(fields)=='string')?"/"+fields:"";
        post_id =(typeof(post_id)=='string')?"/"+post_id:"";
        if (typeof(payload_params)==='object') {
            for(var props in payload_params) payload[props] = payload_params[props];
        }
        try {
            //Logger.log("https://graph.beta.facebook.com"+post_id+fields);
            var a=UrlFetchApp.fetch("https://graph.beta.facebook.com"+post_id+fields,{
                    muteHttpException: true,
                    payload:payload
            });
            var result = JSON.parse(a.getContentText());
            result.__operation_success = true;
        } catch (e) {
            var result = {};
            result.__operation_success = false;
        }
        return result;
    },
    PostResponse:function(post_id,fields,payload_params){
        if (!cfg.update_fb) return false;wall.update_count +=1;var trx=0;
        var payload  = {
            method:"POST"
        }
        fields =(typeof(fields)=='string')?"/"+fields:"";
        if (typeof(payload_params)==='object')
                for(var props in payload_params) {++trx;payload[props] = payload_params[props];}
        payload.access_token = cfg.token;
        var result,param="";
        //for(var props in payload) param += props+'='+payload[props]+'&';
        //var fb_api = "https://graph.beta.facebook.com/"+post_id+fields+'?'+param;
        var fb_api = "https://graph.beta.facebook.com/"+post_id+fields;
        //if (trx > 0) fb_api = encodeURI(fb_api.substring(0,fb_api.length-1));
        try{
            RoboApp.logger.log('PostResponse Executed')
            RoboApp.logger.log('fb API :'+fb_api); ;
            var a = UrlFetchApp.fetch(fb_api,{
                    muteHttpException: true,payload:payload,method:"POST"
            });
            result = JSON.parse(a.getContentText());
            if(typeof(result)=='boolean') result = {};
            result.__operation_success = true;
            RoboApp.logger.log('PostResponse Succes'); 
        }catch(err){
            RoboApp.logger.log('PostResponse Failed');
            var o = new readError(err);
            ofile.log(objAsTable(err));
            result = {}
            result.__operation_success = false ;
        }
        return result;
    },
    getMe:function(){
        return UrlFetcher.GetResponse();
    },
    getNewsFeed:function(){
        return UrlFetcher.GetResponse("home",{fields:"id,message,from,type,comments,likes.limit(25){name,id}",limit:cfg.limitSize});
    },
    postLike:function(){
        if(!cfg.like) return false;
        return UrlFetcher.PostResponse(wall.data.id,'likes',false);
    },
    postComment:function(status_id,comment_text){
        if(!cfg.comment) return false;
        RoboApp.logger.log('postComment called :'+ comment_text);
        return UrlFetcher.PostResponse(status_id,"comments",{message:comment_text});
    },
    postStatus:function(status_text){
        return UrlFetcher.PostResponse(comment.me.id,'feed',{message:status_text});
    },
    postPhoto:function(status_text,url_to_download_jpg){
        //url_to_download_jpg = "http://www.wallpaperislami.com/wp-content/uploads/2015/06/Amalan-Pada-Hari-Jumat.jpg";
        respons = UrlFetcher.PostResponse(ofile.data.my.info.id,'photos',{caption:"unpublished",url:url_to_download_jpg,published:false});
        //ofile.log('respons1 '+JSON.stringify(respons)+'<br> typeof(respons.id) '+typeof(respons.id));
        if (typeof(respons.id)=='string') {
            payload = {
                'message'           : status_text,
                "attached_media[0]" : '{"media_fbid":"'+respons.id+'"}'
            }
            respons = UrlFetcher.PostResponse(ofile.data.my.info.id,'feed',payload);
            ofile.log('respons2 '+JSON.stringify(respons)+'<br> typeof(respons.id) '+typeof(respons.id));
        }
        return respons;//UrlFetcher.PostResponse(comment.me.id,'photos',{message:status_text,attached_media:fileBlob});
    },
    uploadPhoto:function(status_text){
        var result;
        var fb_api = "https://graph.beta.facebook.com/"+comment.me.id+"/photos";
        var payload  = {
            method:"POST",
            message:"Mboke nom",
            source:"file:///C:/Documents%20and%20Settings/Admin/My%20Documents/Downloads/fb/a2/a/7.jpg",
            access_token:cfg.token
        }
        try {
            ofile.log("fb_api "+fb_api);
            var a=UrlFetchApp.fetch(fb_api,{
                    muteHttpException: true,
                    payload:payload
            });
            var result = JSON.parse(a.getContentText());
            result.__operation_success = true;
        } catch (e) {
            var result = e;
            result.__operation_success = false;
            ofile.log('error posting photos: '+JSON.stringify(result));
            ofile.log('<br>'+JSON.stringify(payload)+'<br>');
        }
        return result;
    },
    read_all:function() {
    }
}

function randomize(max) {
    var result = parseInt(Math.random()*100);
    while (result > max || result < 0 ) result = parseInt(Math.random()*100);
    return result;
}


function doGet(request) {
   //if(typeof request !== 'undefined')
   //   return ContentService.createTextOutput(JSON.stringify(request.parameter.append));
   var start = request.parameters.start +"";
   switch( start ) {
    case "1":
         return HtmlService.createTemplateFromFile('page_1')
        .evaluate() 
        .setTitle('History List')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;
    case "2":
         return HtmlService.createTemplateFromFile('page_2')
        .evaluate() 
        .setTitle('Delayed List')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;
    case "3":
         return HtmlService.createTemplateFromFile('page_3')
        .evaluate() 
        .setTitle('user feed')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;
    case "4":
         return HtmlService.createTemplateFromFile('page_4')
        .evaluate() // evaluate MUST come before setting the NATIVE mode
        .setTitle('New List')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;
    case "5":
         return HtmlService.createTemplateFromFile('page_5')
        .evaluate() // evaluate MUST come before setting the NATIVE mode
        .setTitle('Utilities')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;
    case "6":
         return HtmlService.createTemplateFromFile('page_6')
        .evaluate() // evaluate MUST come before setting the NATIVE mode
        .setTitle('Top Poster')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;
    case "7":
         return HtmlService.createTemplateFromFile('page_7')
        .evaluate() // evaluate MUST come before setting the NATIVE mode
        .setTitle('Edit User')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;       
    case "8":
         return HtmlService.createTemplateFromFile('auth-test-page')
        .evaluate() // evaluate MUST come before setting the NATIVE mode
        .setTitle('auth-test-page')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;       
    case "temp":
         return HtmlService.createTemplateFromFile('page_temp')
        .evaluate() 
        .setTitle('Temporary Page')
        .setSandboxMode(HtmlService.SandboxMode.NATIVE);
        break;
    default:

   }
   return HtmlService.createTemplateFromFile('index')
          .evaluate() 
          .setTitle('Main Page')
          .setSandboxMode(HtmlService.SandboxMode.NATIVE);

}

function doPost(request) {
  return ContentService.createPlainTextOutput("hello world!");
}
