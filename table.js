$(document).ready(function(){
  $.getJSON($("meta[name=bmstable]").attr("content"), function(header){
    $.getJSON(header.data_url, function(information){
      makeBMSTable(information,header.symbol);
    });
  });
});

function makeBMSTable(info, mark) {
  var x = "";
  var ev = "";
  var count = 0;
  var obj = $("#table_int");
  // 表のクリア
  obj.html("");
  $("<tr height='20' style='color:white;background-color:#0f2350'><td align='center'>LV</td><td align='center'>譜面</td><td align='center'>タイトル（LR2IR）</td><td align='center'>作者（本体）</td><td align='center'>差分</td><td align='center'>コメント</td></tr>").appendTo(obj);
  var obj_sep = null;
  for (var i = 0; i < info.length; i++) {
    // 難度ごとの区切り
    if (x != info[i].level) {
      // 前の区切りに譜面数、平均密度を追加
     	if (obj_sep != null) {
        obj_sep.html("<td colspan='7' align='center' style='color:white;background-color:#1c305c'>" + "<b>" + info[i-1].level + " (" + count + "譜面)</b></td>");
      }
      obj_sep = $("<tr class='tr_separate' id='" + mark + info[i].level + "'></tr>");
      obj_sep.appendTo(obj);
      count = 0;
      x = info[i].level;
    }
    // 本文
    var str = $("<tr></tr>");
    // レベル表記
    $("<td width='5%'>" + info[i].level + "</td>").appendTo(str);
    // score viewer
    $("<td width='3%' align='center'><a href='http://www.ribbit.xyz/bms/score/view?md5=" + info[i].md5 + "' target='_blank'> ■ </a></td>").appendTo(str);
    // タイトル
    $("<td width='22%'>" + "<a href='http://www.dream-pro.info/~lavalse/LR2IR/search.cgi?mode=ranking&bmsmd5=" + info[i].md5 + "' target='_blank'>" + info[i].title + "</a></td>").appendTo(str);
    // アーティスト
    var astr = "";
    if(info[i].url != (null || "")) {
      if(info[i].artist != null) {
        astr = "<a href='" + info[i].url + "'>" + info[i].artist + "</a>";
      } else {
        astr = "<a href='" + info[i].url + "'>" + info[i].url + "</a>";
      }
    } else {
      if(info[i].artist != null) {
        astr = info[i].artist;
      }
    }
    $("<td width='22%'>" + astr + "</td>").appendTo(str);
    // 差分
    if(info[i].comment == "同梱譜面") {
      $("<td class='sc' max-width='20%'>同梱譜面</td>").appendTo(str);
    } else {
      if(info[i].url_diff != null) {
        $("<td class='sc' max-width='20%'><a href='" + info[i].url_diff + "'>" + info[i].url_diff + "</a></td>").	appendTo(str);
      }
      else {
        $("<td></td>").appendTo(str);
      }
    }
    // コメント
    if(info[i].comment != "同梱譜面") {
      $("<td width='10%'>" + info[i].comment + "</td>").appendTo(str);
    } else {
      $("<td width='10%'></td>").appendTo(str);
    }
    str.appendTo(obj);
    count++;
  }
  // 最後の区切り処理
  if (obj_sep != null) {
    obj_sep.html("<td colspan='7' align='center' style='color:white;background-color:#1c305c'>" + "<b>" + info[i-1].level + " (" + count + "譜面)</b></td>");
  }
}
