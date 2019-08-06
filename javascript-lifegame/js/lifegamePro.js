/**
 * グローバル変数
 */
	//スクリーンの幅
	var SCREEN_SIZE=500;
	//一辺のセルの数
	var CELL_NUM=200;
	// セルの幅
	var CELL_SIZE = SCREEN_SIZE / CELL_NUM;
	//フレーム数=世代/秒
	var FPS=10;
	//canvas要素
	var canvas;
	//描画コンテキスト
	var drowerCpntext;

/**
 * 初期設定
 */
window.onload=function(){
	//セルを描画するフィールド数
	var field= new Array(SCREEN_SIZE*SCREEN_SIZE);
	//フィールドのセルの一時情報
	var generation= new Array(CELL_NUM*CELL_NUM);


	//フィールドのセルのcanvas描画設定
	// canvas要素を取得
	canvas = document.getElementById('lifegame');
	// キャンバスのサイズを設定
	canvas.width = canvas.height = SCREEN_SIZE;
	// Canvas引き伸ばし率の取得
	var scaleRate = Math.min(window.innerWidth/SCREEN_SIZE, window.innerHeight/SCREEN_SIZE);
	// キャンバスを引き伸ばし
	canvas.style.width = canvas.style.height = SCREEN_SIZE*scaleRate+'px';
	// コンテキスト
	context = canvas.getContext('2d');
	// 色
	context.fillStyle = 'rgb(211, 85, 149)';

	//セルの生死情報
	for(var i=0;i<field.length;i++){
		//セルにランダムに生死を振り分ける
		field[i] = Math.floor(Math.random()*2);
	}
	// ライフゲーム・世代ループ開始
	update(field, generation);
}

/**
 * セルの世代更新
 */
function update(field, generation){
	//生存セル
	var livingCell=0;

	//生死処理
	//フィールド情報をセルの一次情報にコピー・格納
	generation=field.slice();

	//フィールド情報をセルの一次情報にコピー・格納
	for (var i = 0; i < generation.length; i++) {
		livingCell = 0;

		// 周囲のセルの探索
		// x軸方向
		for (var x = -1; x < 2; x++) {
			// y軸方向
			for (var y = -1; y < 2; y++) {
				// 自身は含めない
				if (x == 0 && y == 0) {
					continue;
				}
				// チェックするセル
				var checked = i + x * CELL_NUM + y;
				// 上下の壁判定
				if (checked >= 0 && checked < generation.length) {
					// 左右の壁判定
					if (i < checked && checked % CELL_NUM != 0 || i > checked
							&& checked % CELL_NUM != CELL_NUM - 1) {
						if (generation[checked]) {
							// 「生」だったらカウント
							livingCell++;
						}
					}
				}
			}
		}

		// 自身が「生存」且つ「生存セルが2～3個隣接」の場合、「生存」
		if (generation[i] && (livingCell == 2 || livingCell == 3)) {
			field[i] = 1;

		// 自身が「死滅」且つ「生存セルが2～3個隣接」の場合、「生存」
		} else if (!generation[i] && livingCell == 3) {
			field[i] = 1;

		//それ以外、「死滅」
		} else {
			field[i] = 0;

		}
	}

	//canvasの再描画
	drowPix(field);

	//フレーム数による再帰設定
	setTimeout(update, 1000/FPS, field, generation);
}

/**
 * セル描画
 */
function drowPix(field){
	//スクリーンをクリア
	context.clearRect(0, 0, SCREEN_SIZE, SCREEN_SIZE);

	//セルの情報を取得、1ならセルを塗りつぶす
	for(var i=0;i<field.length;i++){
		//x座標
		var x = (i%CELL_NUM) * CELL_SIZE;
		//y座標
		var y = Math.floor(i/CELL_NUM);

		if(field[i]){
			context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
		}

	}

}