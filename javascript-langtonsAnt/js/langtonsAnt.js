/**
 * グローバル変数
 */
	//スクリーンの幅
	var SCREEN_SIZE=500;
	//一辺のセルの数
	var CELL_NUM=200;
	// セルの幅
	var CELL_SIZE = SCREEN_SIZE / CELL_NUM;
	//フレーム数
	var FPS = 200;
	//canvas要素
	var canvas;
	//描画コンテキスト
	var drowerCpntext;
	// アリの方向用配列
	var dirs = [
	{'row': -1, 'col': 0},
	{'row': 0, 'col': 1},
	{'row': 1, 'col': 0},
	{'row': 0, 'col': -1},
	];

/**
 * 初期設定
 */
window.onload=function(){
		//セルを描画するフィールド数
		var field= new Array(CELL_NUM);

		//フィールドのセルのcanvas描画設定
		// canvas要素を取得
		canvas = document.getElementById("langton's ant");
		// キャンバスのサイズを設定
		canvas.width = canvas.height = SCREEN_SIZE;
		// Canvas引き伸ばし率の取得
		var scaleRate = Math.min(window.innerWidth/SCREEN_SIZE, window.innerHeight/SCREEN_SIZE);
		// キャンバスを引き伸ばし
		canvas.style.width = canvas.style.height = SCREEN_SIZE*scaleRate+'px';
		// コンテキスト
		context = canvas.getContext('2d');

		//セルをすべて初期化
		for(var i=0;i<CELL_NUM;i++){
			field[i]= new Array(CELL_NUM);
			for (var j = 0; j < CELL_NUM; j++) {
				field[i][j] = 0;
			}
		}
		//蟻のスタート設定
		var ant={'dir': 0, 'row': CELL_NUM/2-1, 'col': CELL_NUM/2-1};

	//シミュレーション開始
	antWolks(field,ant);
}

/**
 * 蟻の移動シミュレーション
 */
function antWolks(field, ant) {

	// 蟻の現在地が白の場合
	if (field[ant.row][ant.col]) {
		// 方向を左へ
		ant.dir--;
		// 色を黒に
		context.fillStyle = 'rgb(0, 0, 0)';

		// 蟻の現在地が黒の場合
	} else {
		// 方向を左へ
		ant.dir++;
		// 色を黒に
		context.fillStyle = 'rgb(0, 255, 255)';
	}
	// アリのいるマスを反転
	field[ant.row][ant.col] = 1 - field[ant.row][ant.col];
	// アリの居るマスの色を描画
	context.fillRect(ant.col * CELL_SIZE, ant.row * CELL_SIZE, CELL_SIZE,
			CELL_SIZE);
	// アリの向きを修正(5=>1, -1=> 3)
	ant.dir = (ant.dir + 4) % 4;
	// アリを移動
	ant.row += dirs[ant.dir].row;
	// アリを移動
	ant.col += dirs[ant.dir].col;
	// アリの色
	context.fillStyle = 'rgb(0, 0, 255)';
	// アリを描画
	context.fillRect(ant.col * CELL_SIZE, ant.row * CELL_SIZE, CELL_SIZE,
			CELL_SIZE);
	// 壁判定
	if (ant.row < 0 || ant.row >= CELL_NUM || ant.col < 0
			|| ant.col >= CELL_NUM) {
		// ゲームオーバ処理
		alert("アリはそそくさと逃げていきました。");
	} else {
		// 再帰処理でループ
		setTimeout(antWolks, 1000 / FPS, field, ant);
	}
}
