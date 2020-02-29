"use strict";

const rate = 10;

const $spectype = $('select[name="spectype"]');
const $ltmaginp = $('input[name="ltmaginp"]');
const $orbradinp = $('input[name="orbradinp"]');
const $eccinp = $('input[name="eccinp"]');
const moveOrbit = "moveOrbit";
const hbzArea = "hbzArea";
const $submit = $("input#submit");

const $disp_ltmag = $("#disp_ltmaginp");
const $disp_orbrad = $("#disp_orbradinp");
const $disp_ecc = $("#disp_eccinp");
const $disp_spec = $("#disp_spectype");

function init() {
  $disp_ltmag.val($ltmaginp.val());
  $disp_orbrad.val($orbradinp.val());
  $disp_ecc.val(parseFloat($eccinp.val()) / 10);
  habitableZone();
}

function getRange_point($this) {
  var name = $this.attr("name");
  var v = $('input[name="' + name + '"]').val();
  $("#disp_" + name).val(parseFloat(v) / 10);
  habitableZone();
}

function getRange($this) {
  var name = $this.attr("name");
  var v = $('input[name="' + name + '"]').val();
  $("#disp_" + name).val(v);
  habitableZone();
}

function habitableZone() {
  const star_lmag = $disp_ltmag.val()*10;
  const pln_ecc = $disp_ecc.val();
  const spect_type = $disp_spec.val();

  const smj_rad = $disp_orbrad.val();

  let hbzone_range = CalcHabitableZone(spect_type, star_lmag); //Habitable zone 下限と上限計算

  habitable(hbzone_range[0].toFixed(3), hbzone_range[1].toFixed(3));
  orbit(smj_rad, pln_ecc);
  $("#hzrngdsp").html(
    hbzone_range[0].toFixed(3) + "AU - " + hbzone_range[1].toFixed(3) + "AU"
  ); //範囲の表示
}

function habitable(min, max) {
  const color = "yellow"; //線の色指定
  const color2 = "#1d0956"; //線の色指定
  var cvs = document.getElementById("nzone_disp"); //結果を表示する
  var ctx = cvs.getContext("2d");

  const cv_width = cvs.width;
  const cv_height = cvs.height;
  const cv_x = cv_width / 2;
  const cv_y = cv_height / 2;

  let rad_max = max * rate;
  let rad_min = min * rate;

  let trns_fct = 1;

  let cent_x = cv_x;
  let cent_y = cv_y;

  ctx.clearRect(0, 0, cv_width, cv_height);
  drowZone(ctx, rad_max, trns_fct, cent_x, cent_y, color);
  drowZone(ctx, rad_min, trns_fct, cent_x, cent_y, color2);
  drowCenter(ctx, cent_x, cent_y, color);
  localStorage.removeItem(hbzArea);
  localStorage.setItem(
    hbzArea,
    JSON.stringify({
      freeze: rad_max + 18,
      burn: rad_min - 18,
      habitat: rad_max / 2 + rad_min / 2
    })
  );
}
function orbit(smj_rad, pln_ecc) {
  const color = "red"; //線の色指定
  var cvs = document.getElementById("orbit_disp"); //結果を表示する
  var ctx = cvs.getContext("2d");

  const cv_width = cvs.width;
  const cv_height = cvs.height;
  const cv_x = cv_width;
  const cv_y = cv_height;

  let rad = smj_rad * rate;

  let smn_rad = get_smn_rad(smj_rad, pln_ecc);
  let focus_dis = get_focus_dis(rad, pln_ecc);

  let trns_fct = smn_rad / smj_rad; //y軸を変形する比率

  let cent_x = cv_x / 2 + focus_dis; //中心x座標
  let cent_y = (cv_y * smj_rad) / smn_rad / 2.0;

  ctx.clearRect(0, 0, cv_width, cv_height);
  drowOrbit(ctx, rad, trns_fct, cent_x, cent_y, color);
  localStorage.removeItem(moveOrbit);
  localStorage.setItem(
    moveOrbit,
    JSON.stringify({ smn_rad: smn_rad, smj_rad, smj_rad, focus_dis: focus_dis })
  );
}

function drowZone(ctx, rad, trns_fct, cent_x, cent_y, color) {
  ctx.fillStyle = color; //線の色指定
  //円
  ctx.setTransform(1, 0, 0, trns_fct, 0, 0);
  ctx.beginPath();
  ctx.arc(cent_x, cent_y, rad, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.setTransform(1, 0, 0, 1, 0, 0); //元に戻す
}
function drowOrbit(ctx, rad, trns_fct, cent_x, cent_y, color) {
  ctx.strokeStyle = color; //線の色を指定
  //円
  ctx.setTransform(1, 0, 0, trns_fct, 0, 0);
  ctx.beginPath();
  ctx.arc(cent_x, cent_y, rad, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0); //元に戻す
}
function drowCenter(ctx, cent_x, cent_y, color) {
  ctx.strokeStyle = color; //線の色を指定
  //円
  ctx.beginPath();
  ctx.arc(cent_x, cent_y, 1, 0, Math.PI * 2, false);
  ctx.stroke();
}

function CalcHabitableZone(spect_type, star_lmag) {
  let hbzone_range = new Array(0.0, 0.0); //ハビタブルゾーン 範囲 要素数２の配列を
  var min_eff = 1.0; //下限を計算する係数
  var max_eff = 1.0; //上限を計算する係数

  switch (spect_type) {
    case "F": //F型の場合
      min_eff = 1.9;
      max_eff = 0.46;
      break;

    case "G": //G型の場合
      min_eff = 1.41;
      max_eff = 0.36;
      break;

    case "K": //K型の場合  KとMは係数が同じ
    case "M": //M型の場合
      min_eff = 1.05;
      max_eff = 0.27;
      break;
  }

  //下限と上限を計算 値が同じ時はエラーです
  hbzone_range[0] = Math.sqrt(star_lmag / min_eff);
  hbzone_range[1] = Math.sqrt(star_lmag / max_eff);
  return hbzone_range;
}
function get_smn_rad(smj_rad, pln_ecc) {
  return smj_rad * Math.sqrt(1.0 - pln_ecc * pln_ecc); //短半径
}
function get_focus_dis(smj_rad, pln_ecc) {
  return smj_rad * pln_ecc; //焦点距離
}
