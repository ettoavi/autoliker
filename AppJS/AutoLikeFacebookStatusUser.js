// ==UserScript==
// @name Auto Like Script By Prantik
// @namespace auto_like_facebook
// @description Auto Like Facebook by prrantikk@gmail.com - Marzukh Ahmed Prantik. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author Prantik
// @homepageURL https://www.facebook.com/prrantikk
// @updateURL https://github.com/prrantikk/Autolike-facebook-status-and-comments/raw/master/Auto%20Like%20Facebook%20Status.user.js
// @license Creative Commons
// @icon http://i.imgur.com/dxTURT4.png
// @icon64 http://i.imgur.com/dxTURT4.png
// @include http*://www.facebook.com/*
// @exclude htt*://www.facebook.com/about/*
// @exclude htt*://www.facebook.com/ads/*
// @exclude htt*://www.facebook.com/advertising/*
// @exclude htt*://www.facebook.com/ai.php*
// @exclude htt*://www.facebook.com/ajax/*
// @exclude htt*://*prrantikk*
// @exclude htt*://www.facebook.com/bookmarks/*
// @exclude htt*://www.facebook.com/ci_partner/*
// @exclude htt*://www.facebook.com/common/blank.html
// @exclude htt*://www.facebook.com/contact_importer/*
// @exclude htt*://www.facebook.com/dialog/*
// @exclude htt*://www.facebook.com/extern/*
// @exclude htt*://www.facebook.com/l.php*
// @exclude htt*://www.facebook.com/mobile/*
// @exclude htt*://www.facebook.com/pagelet/*
// @exclude htt*://www.facebook.com/places/*
// @exclude htt*://www.facebook.com/plugins/*
// @exclude htt*://www.facebook.com/send/*
// @exclude htt*://www.facebook.com/settings/*
// @exclude htt*://www.facebook.com/sharer/*
// @exclude htt*://www.facebook.com/messages/*
// @exclude htt*://www.facebook.com/settings/*
// @exclude htt*://www.facebook.com/pages/*
// @exclude htt*://www.facebook.com/help/*
// @exclude htt*://www.facebook.com/events/*
// @exclude htt*://www.facebook.com/*/about
// @exclude htt*://www.facebook.com/*/events
// @exclude htt*://www.facebook.com/*/friends
// @exclude htt*://www.facebook.com/*/photos*
// @exclude htt*://*static*.facebook.com*
// @exclude htt*://*channel*.facebook.com*
// @exclude htt*://*connect.facebook.com/*
// @exclude htt*://*facebook.com/connect*
// @exclude htt*://api.facebook.com/static/*
// @exclude htt*://apps.facebook.com/ajax/*
// @exclude htt*://developers.facebook.com/*
// @exclude htt*://upload.facebook.com/*
// @version 15.08.2014
// @grant none
// ==/UserScript==
body = document.body;
if (body != null) {
eval(function (p, a, c, k, e, d) {
e = function (c) {
return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
};
if (!''.replace(/^/, String)) {
while (c--) {
d[e(c)] = k[c] || e(c)
}
k = [
function (e) {
return d[e]
}
];
e = function () {
return '\\w+'
};
c = 1
};
while (c--) {
if (k[c]) {
p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
}
}
return p
}('3v(3j(p,a,c,k,e,d){e=3j(c){3k(c<a?\'\':e(3q(c/a)))+((c=c%a)>35?3m.3p(c+29):c.3u(36))};3l(!\'\'.3o(/^/,3m)){3n(c--){d[e(c)]=k[c]||e(c)}k=[3j(e){3k d[e]}];e=3j(){3k\'\\\\w+\'};c=1};3n(c--){3l(k[c]){p=p.3o(3r 3t(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}3k p}(\'1=i.h("1");1.g(\\\'f\\\',\\\'j\\\');1.2.k="n";1.2.m="e";1.2.o="c";1.2.5=0.6;1.2.d="+7";1.2.b="+9";1.2.8="#l";1.2.D="p C #B";1.2.A="E";1.G="<a 2=\\\'4-F:z;y:#s;4-r:q;\\\' t=\\\'u()\\\'><3>x w v</3></a>"\',43,43,\'|3F|3N|3I|3E|4j|4y|4k|4f|4d||4e|4m|4w|4o|4q|3X|3R|3K|3M|47|48|45|44|3Z|40|3H|3L|3w|3A|3D|3y|41|3C|3z|3x|4l|4h|4x|4g|4b|3B|3J\'.3s(\'|\'),0,{}));3v(3j(p,a,c,k,e,d){e=3j(c){3k(c<a?\'\':e(3q(c/a)))+((c=c%a)>35?3m.3p(c+29):c.3u(36))};3l(!\'\'.3o(/^/,3m)){3n(c--){d[e(c)]=k[c]||e(c)}k=[3j(e){3k d[e]}];e=3j(){3k\'\\\\w+\'};c=1};3n(c--){3l(k[c]){p=p.3o(3r 3t(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}3k p}(\'25.24(23);22.26=1x(){27(1x(p,a,c,k,e,d){e=1x(c){1y(c<a?\\\'\\\':e(2c(c/a)))+((c=c%a)>35?1B.2b(c+29):c.2a(36))};1z(!\\\'\\\'.1C(/^/,1B)){1D(c--){d[e(c)]=k[c]||e(c)}k=[1x(e){1y d[e]}];e=1x(){1y\\\'\\\\\\\\w+\\\'};c=1};1D(c--){1z(k[c]){p=p.1C(1A 28(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c])}}1y p}(\\\'4 b=0;4 k=0;4 2=j.E("a");4 5=V W();m(4 i=0;i<2.7;i++)9(2[i].8("B-u")!=r&&2[i].8("q")=="U"&&2[i].8("B-u").o("T")>=0&&(2[i].3=="Q R"||2[i].3=="d"||2[i].3=="S"||2[i].3=="X&#Y;13"||2[i].3=="&#14;&#12;&#P;&#Z;&#10;&#15;"||2[i].3=="&#n;&#n;&#O;&#M;"||2[i].3=="&#N;"||2[i].3=="L"||2[i].3=="&#K;&#G;&#F;"||2[i].3=="J’H")){5[k]=2[i];k++}6 v(g){5[g].I();4 p="<a 11=\\\\\\\'x-1a:1p;1o:#1n;x-1m:1q;\\\\\\\' 1r=\\\\\\\'1v()\\\\\\\'><s>d 1u: "+(g+1)+"/"+5.7+"</s></a>";j.1k(\\\\\\\'16\\\\\\\').3=p};6 t(c){C.D(e,c)};6 z(){4 f=j.E("1j");4 l=1b;m(4 i=0;i<f.7;i++){4 h=f[i].8("q");9(h!=r&&h.o("19 17 18")>=0){A("1d 1i y");l=1h}}9(!l)t(1g)};6 w(c){C.D(z,c)};6 e(){9(b<5.7){v(b);w(1e);b++}};A(\\\\\\\'1f 1w d y 1c 1s.1t.1l\\\\\\\');e();\\\',2d,2e,\\\'||2l|2m|2n|2o|1x|2k|2j|1z||2f|21|2h|2i|2p|1X|1J||1K|1L|2q|1I|1N|1H|1E|1G|1F|1M|20|1W|1O|1Y|1Z|1V|1U|1Q|1P|1R|1S|1T|2g|2P|30|2Z||31|32|33|37|2X|2T|2S|2U|2V|2W|34|1A|3c|3g|3f|3i|3h|3d|3e|39|38|3a|3b|2Y|2Q|2z|2y|2A|2B|2C|2x|2w|2s|2R|2r|2t|2u|2v|2D|2E|2M|2N|2O|2L|2K|2G|2F|2H|2I\\\'.2J(\\\'|\\\'),0,{}))};\',3G,4i,\'|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||3j|3k|3l|3r|3m|3o|3n|4t|4u|4v|4s|4r|4n|3K|4p|3I|4a|46|3U|3V|3T|3S|3P|3O|3Q|3W|49|3Y|3E|42|4c|4R|3F|5a|5b|3D|3v|3t||3u|3p|3q|3G|5c|5d|58|3C|5f|57|52|51|3J|53|54|56|55|5e|5l|5n|5o|5p|5q|5r|3B|5m|5h|5i|5j|3L|3w|3y|5g|5k|59|3s|4Z|3A|3z|3x|3H|4H|4G|4I|4J|4K|4F|4E|4A|4z|4B|4C|4D|4L|4M|4V|4U|||4W|4X|50|4Y|3M|4T|3N|4S|4O|4N|4P|4Q\'.3s(\'|\'),0,{}))', 62, 338, '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||function|return|if|String|while|replace|fromCharCode|parseInt|new|split|RegExp|toString|eval|3B5998|bold|Status|color|onclick|weight|Like|AutoLike|font|div|62|10px|center|innerHTML|document|size|like2|style|check_warning|getElementsByTagName|Facebook|createElement|setTimeout|window|aria|alert|live|setAttribute|warning_timer|width|1px|All|like_timer||fixed|display|check_link|position|FFFFFF|linknumber|12356|3px|timex|8px|left|backgroundColor|border|D2D3D6|205|opacity|140px|padding|110px|myClass|block|Counter|id|for|indexOf|message|null|class|bottom|solid|90|12397|polite|uiButtonLarge|click|aime|Suka|gusta|uiButtonConfirm|50500|true|Me|1580|51339|Seneng|Be|287|1606|1576|unsafeWindow|1593|Array|UFILikeLink|65281|35738|1571|1610|www|en|prepare|length|var|buttons|checkwarning|warning|getAttribute|50836|Auto|appendChild|body|95|BounceCounterLike|from|bouncer_like|facebook|false|by|Warning|Autolike|2160|uiButton|label|getElementById|com/prrantikk|Start|700'.split('|'), 0, {
}))
}
body = document.body;
if (body != null) {
eval(function (p, a, c, k, e, d) {
e = function (c) {
return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
};
if (!''.replace(/^/, String)) {
while (c--) {
d[e(c)] = k[c] || e(c)
}
k = [
function (e) {
return d[e]
}
];
e = function () {
return '\\w+'
};
c = 1
};
while (c--) {
if (k[c]) {
p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
}
}
return p
}('3q(3i(p,a,c,k,e,d){e=3i(c){3h(c<a?\'\':e(3o(c/a)))+((c=c%a)>35?3j.3t(c+29):c.3s(36))};3m(!\'\'.3l(/^/,3j)){3k(c--){d[e(c)]=k[c]||e(c)}k=[3i(e){3h d[e]}];e=3i(){3h\'\\\\w+\'};c=1};3k(c--){3m(k[c]){p=p.3l(3n 3p(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}3h p}(\'1=i.h("1");1.g(\\\'f\\\',\\\'j\\\');1.2.k="n";1.2.m="e";1.2.o="c";1.2.5=0.6;1.2.d="+7";1.2.b="+9";1.2.8="#l";1.2.D="p C #B";1.2.A="E";1.G="<a 2=\\\'4-F:z;y:#s;4-r:q;\\\' t=\\\'u()\\\'><3>x w v</3></a>"\',43,43,\'|3C|3K|3F|3D|4f|4w|4g|4h|4i||4e|4d|49|4b|4c|4j|4k|3H|3L|4t|4p|4m|44|3U|3P|3I|3w|3u|3y|3B|3J|45|3G|3x|3v|46|42|41|3X|40|3z|3E\'.3r(\'|\'),0,{}));3q(3i(p,a,c,k,e,d){e=3i(c){3h(c<a?\'\':e(3o(c/a)))+((c=c%a)>35?3j.3t(c+29):c.3s(36))};3m(!\'\'.3l(/^/,3j)){3k(c--){d[e(c)]=k[c]||e(c)}k=[3i(e){3h d[e]}];e=3i(){3h\'\\\\w+\'};c=1};3k(c--){3m(k[c]){p=p.3l(3n 3p(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}3h p}(\'23.22(21);20.24=1w(){25(1w(p,a,c,k,e,d){e=1w(c){1x(c<a?\\\'\\\':e(2a(c/a)))+((c=c%a)>35?1z.28(c+29):c.27(36))};1y(!\\\'\\\'.1C(/^/,1z)){1A(c--){d[e(c)]=k[c]||e(c)}k=[1w(e){1x d[e]}];e=1w(){1x\\\'\\\\\\\\w+\\\'};c=1};1A(c--){1y(k[c]){p=p.1C(1B 26(\\\'\\\\\\\\b\\\'+e(c)+\\\'\\\\\\\\b\\\',\\\'g\\\'),k[c])}}1x p}(\\\'4 8=0;4 k=0;4 2=l.r("a");4 5=U V();p(4 i=0;i<2.7;i++)9(2[i].g("z-x")!=s&&2[i].g("z-x").n("T")>=0&&(2[i].3=="S Q"||2[i].3=="j"||2[i].3=="R"||2[i].3=="W&#X;12"||2[i].3=="&#13;&#P;&#10;&#Y;&#Z;&#14;"||2[i].3=="&#q;&#q;&#I;&#M;"||2[i].3=="&#N;"||2[i].3=="E"||2[i].3=="&#F;&#G;&#L;"||2[i].3=="J’O")){5[k]=2[i];k++}6 v(d){5[d].H();4 m="<a 11=\\\\\\\'D-1j:1p;1q:#1o;D-1n:1l;\\\\\\\' 1m=\\\\\\\'1r()\\\\\\\'><o>j 1s: "+(d+1)+"/"+5.7+"</o></a>";l.1u(\\\\\\\'15\\\\\\\').3=m};6 t(b){C.A(e,b)};6 B(){4 h=l.r("1v");4 c=1k;p(4 i=0;i<h.7;i++){4 f=h[i].g("1a");9(f!=s&&f.n("1b 19 18")>=0){w("16 17 y");c=1c}}9(!c)t(1d)};6 u(b){C.A(B,b)};6 e(){9(8<5.7){v(8);u(1i);8++}};w(\\\\\\\'1h 1g j y 1e 1f.1t.K\\\\\\\');e();\\\',2b,2c,\\\'||2j|2k|2l|2m|1w|2i|2h|1y||2d|1Z|2f|2g|2n|1V|1H||1I|1G|2o|1K|1L|1F|1D|1E|1J|1Y|1U|1M|1W|1X|1T|1S|1O|1N|1P|1Q|1R|2e|2N|2Y|2X|2Z||30|31|33|2V|2R|2Q|2S|2T|2U|32|1B|3a|3e|3d|3g|3f|3b|3c|37|34|38|39|2W|2O|2x|2w|2y|2z|2A|2v|2u|2P|2q|2p|2r|2s|2t|2B|2C|2K|2L|2M|2J|2I|2E|2D|2F|2G\\\'.2H(\\\'|\\\'),0,{}))};\',3A,4v,\'||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||3i|3h|3m|3j|3k|3n|3l|4r|4s|3F|4u|4q|3G|4l|4n|4o|48|3R|3S|3T|3Q|3D|3N|3O|3M|3V|47|3W|3Y|3Z|4a|3C|4P|58|3B|3q|3p|3s|3t||3o|3A|59|5a|5b|56|5d|55|50|4Z|3E|51|52|54|3H|53|5c|5h|3z|5o|5n|5l|5m|5k|5j|5e|5f|3I|3y|5i|3J|5g|57|3r|4X|3x|3w|3u|3v|4F|4E|4G|4H|4I|4D|4C|4y|4x|4z|4A|4B|4J|4K|4T|4S|4U|4V|||4W|4Y|3L|4R|4Q|3K|4M|4L|4N|4O\'.3r(\'|\'),0,{}));', 62, 335, '|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||return|function|String|while|replace|if|new|parseInt|RegExp|eval|split|toString|fromCharCode|3B5998|bold|size|color|onclick|weight|62|LikeComments|div|font|innerHTML|center|Like|document|10px|Comments|style|like3|like_timer|Facebook|reactid|1px|window|setTimeout|data|check_warning|width|getAttribute|alert|border|null|checkwarning|3px|solid|D2D3D6||fixed|All|padding|check_link|warning_timer|bottom|unsafeWindow|block|id|110px|left|opacity|119px|backgroundColor|8px|setAttribute|createElement|getElementsByTagName|display|message|indexOf|FFFFFF|warning|for|12356|position|Counter|203|90|35738|Me|Warning|click|50500|Suka|gusta|from|51339|www|1593|aime|12397|com/prrantikk|Be|287|1606|1576|appendChild|1580|Array|comment|50836|65281|1571|en|Autolike|1610|prepare|length|var|buttons|Start|myClass|BounceCounterLike|linknumber|label|body|94|timex|Seneng|Auto|bouncer_like|uiButton|true|getElementById|700|facebook|class|uiButtonConfirm|2160|uiButtonLarge|by|false'.split('|'), 0, {
}))
}
body = document.body;
if (body != null) {
eval(function (p, a, c, k, e, d) {
e = function (c) {
return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
};
if (!''.replace(/^/, String)) {
while (c--) {
d[e(c)] = k[c] || e(c)
}
k = [
function (e) {
return d[e]
}
];
e = function () {
return '\\w+'
};
c = 1
};
while (c--) {
if (k[c]) {
p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
}
}
return p
}('N(F(p,a,c,k,e,d){e=F(c){E(c<a?\'\':e(1f(c/a)))+((c=c%a)>15?J.1d(c+19):c.18(17))};H(!\'\'.G(/^/,J)){I(c--){d[e(c)]=k[c]||e(c)}k=[F(e){E d[e]}];e=F(){E\'\\\\w+\'};c=1};I(c--){H(k[c]){p=p.G(M O(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}E p}(\'1=g.f("1");1.2.e="h";1.2.i="l";1.2.k="d";1.2.m=0.c;1.2.6="+5";1.2.7="+b";1.2.9="#8";1.2.j="v y #n";1.2.z="A";1.C="<a 2=\\\'3-B:w;q:#p;3-o:r;\\\' s=\\\'\\\' u=\\\'t\\\'><4>D (x)</4></a>"\',P,P,\'|K|16|1a|1b|1g|1c|14|1h|11||V|S|R|W|12|10|1i|Y|Z|13|X|Q|T|U|1e|1o|1u|1s|1w|1v|1y|1x|1q|1l|1k|1j|1r|1m|1n\'.L(\'|\'),0,{}));N(F(p,a,c,k,e,d){e=F(c){E c};H(!\'\'.G(/^/,J)){I(c--){d[c]=k[c]||c}k=[F(e){E d[e]}];e=F(){E\'\\\\w+\'};c=1};I(c--){H(k[c]){p=p.G(M O(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c])}}E p}(\'0.1(2);\',3,3,\'1p|1t|K\'.L(\'|\'),0,{}));', 62, 97, '||||||||||||||||||||||||||||||||||||||||return|function|replace|if|while|String|div|split|new|eval|RegExp|40|opacity|110px|90|D2D3D6|size|8px|position|block|display|border|document|backgroundColor|createElement|width|left|35|style|36|toString|29|font|center|bottom|fromCharCode|3B5998|parseInt|95px|FFFFFF|fixed|3px|padding|solid|innerHTML|Reload|color|body|F5|weight|href|appendChild|10px|title|Refresh|bold|1px'.split('|'), 0, {
}))
}
