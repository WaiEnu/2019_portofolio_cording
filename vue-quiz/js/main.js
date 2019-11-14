//問題と解答
qa = new Array();
qa[0] = ["周りを見渡す", "yes", "no", 1];
qa[1] = ["何かに気づく", "近づく", "逃げる", 2];
qa[2] = ["食べ物を探す", "匂いのする方", "音のする方", 1];
qa[3] = ["魚が来たぞ。でっかいな。", "近づく", "近づかない", 2];
qa[4] = ["ここになんか入口があるぞ", "入る", "入らない", 2];
qa[5] = ["暖かくなってきた", "移動", "寝る", 1];
qa[6] = ["水の流れが強くなってきた。流されるままに行こうか？", "yes", "no", 2];
qa[7] = ["逃げてばかりなので必殺技を考えよう。取り合えず角をはやす。", "yes", "no", 2];
qa[8] = ["水の上には何があるんだろう...。行ってみる？", "yes", "no", 2];
qa[9] = ["寒くなってきた…冬眠する？", "yes", "no", 2];

//ゲームオーバー
go = new Array();
go[0] = ["敵に食われた。"];
go[1] = ["敵に食われた。"];
go[2] = ["食べ物がみつからない。"];
go[3] = ["魚に食われた。"];
go[4] = ["食虫植物の捕虫器だった。食われた"];
go[5] = ["ここ、温泉だった。熱くて生きられない。"];
go[6] = ["川岸に打ち上げられた。"];
go[7] = ["角をはやすのに二十四時間...。そのうちに食われた。"];
go[8] = ["水中でしか生きられないの忘れてた。"];
go[9] = ["水が凍った。"];
go[10] = ["そして、新天地へ...。"];

//初期設定
q_sel = 2; //選択肢の数
$(function() {
  setReady();
});

//初期設定
function setReady() {
  count = 0; //問題番号
  ansers = new Array(); //解答記録

  //最初の問題
  quiz(count);
}

//問題表示
function quiz(count) {
  var s, n;
  //問題
  $("#text_q").html(count + 1 + "問目：" + qa[count][0]);
  //選択肢
  s = "";
  for (n = 1; n <= q_sel; n++) {
    s +=
      "【<a href='javascript:anser(" +
      n +
      ")'>" +
      n +
      "：" +
      qa[count][n] +
      "</a>】";
  }
  $("#text_s").html(s);
}

//解答表示
function anser(num) {
  var s;
  s = count + 1 + "問目：";
  //答え合わせ
  if (count < qa.length) {
    if (num == qa[count][q_sel + 1]) {
      quiz(count + 1);
    } else {
      ending(count);
    }
    count++;
  }
  //ending(count)
}
function ending(count) {
  var msg = go[count] + "<p><a href='javascript:setReady()'>戻る</a><p>";
  $("#text_s").html(msg);
}
