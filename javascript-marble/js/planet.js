const epsilon = 1.0e-14;
var times = 0;
var degree = 0; //中心点からの角度
var drawRadius = 10; //動かしたい円の半径
var ex = []; // ellipse
var ey = [];
var time = 0;
var time2 = 0;

onload = function() {
  planet();
};

function planet() {
  const arr_moveOrbit = JSON.parse(localStorage.getItem(moveOrbit));
  smj_rad = arr_moveOrbit.smj_rad;
  smn_rad = arr_moveOrbit.smn_rad;
  focus_dis = arr_moveOrbit.focus_dis;

  var canvas = document.getElementById("planet_disp");
  ctx = canvas.getContext("2d");
  cv_width = canvas.width;
  cv_height = canvas.height;
  cx = canvas.width / 2;
  cy = canvas.height / 2;
  cent_x = cx + focus_dis; //中心x座標
  cent_y = cy;

  ctx.clearRect(0, 0, cv_width, cv_height);
  drawHZ();
  drawPlanet();

  time = (time + 2) % 360;
  setTimeout(planet, 1000 / 30);
}
function drawPlanet() {
  ctx.fillStyle = "red";
  // 楕円軌道アニメ
  var rad = KeplersEquation(radians(time), 0.5);
  var x = Math.cos(rad) * smj_rad;
  var y = Math.sin(rad) * smn_rad;

  var planetImg0 = new Image();
  planetImg0.src = "./img/kitten.gif";
  ctx.beginPath();
  ctx.arc(cent_x + x * 10, cent_y - y * 10, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
function drawHZ() {
  const arr_hbzArea = JSON.parse(localStorage.getItem(hbzArea));
  var imageSrcs = [
    { key: "freeze", src: "./img/freezing.gif" },
    { key: "burn", src: "./img/burning.gif" },
    { key: "habitat", src: "./img/kitten.gif" }
  ];
  var planetImg = [];
  for (var i in imageSrcs) {
    planetImg[i] = new Image();
    planetImg[i].src = imageSrcs[i].src;
  }
  for (var i in planetImg) {
    var hz_rad = arr_hbzArea[imageSrcs[i].key];
    var rad = radians(time);
    var x = Math.cos(rad) * hz_rad;
    var y = Math.sin(rad) * hz_rad;
    ctx.arc(cx + x * 10, cy + y * 10, 10, 0, 2 * Math.PI);
    ctx.drawImage(planetImg[i], cx + x - 16, cy + y - 16, 32, 32);
  }
}
function KeplersEquation(M, e) {
  var E;
  var E0 = M; // 初項
  for (var i = 0; i < 10; i++) {
    E = M + e * Math.sin(E0);
    if (E0 - epsilon < E && E < E0 + epsilon) break;
    E0 = E;
  }
  return E;
}
function radians(degrees) {
  return (degrees * Math.PI) / 180;
}
