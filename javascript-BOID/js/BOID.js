/**
 * グローバル変数
 */
//BOIDの大きさ
const BOID_SIZE = 5;
//BOIDの数
const BOID_NUM = 30;
//最大速度
const MAX_SPEED = 7;
//フレーム数
const FPS = 30;

/**
 * BOIDモデル用クラス
 */
class Boids{
	/**
	*コンストラクタ
	*/
	constructor() {
		//フィールドのセルのcanvas描画設定
		// canvas要素を取得
		this.body = document.querySelector('body');
		this.canvas = document.getElementById("boid");
		// コンテキスト
		this.context = this.canvas.getContext('2d');
		// BOID
		this.boids = [];
	}
	/**
	*BOIDの初期化
	*/
	init(){
		//イベントハンドラ
		this.bindEvents();
		//画面サイズの取得
		this.updateView();
		//BOIDの追加
		this.appendBoids(BOID_NUM);
		//シミュレーション開始
		setInterval( this.simulate.bind(this), 1000/FPS );
	}
	/**
	*BOIDの追加
	*/
	appendBoids(length, x, y) {
		let index = 0;
		this.appendTimer = setInterval(() => {
			if( length > 0 && index >= length ) {
				clearInterval( this.appendTimer );
				return;
			}
			this.boids.push({
				x: x || Math.random() * this.view.width,
				y: y || Math.random() * this.view.height,
				vx: 0,
				vy: 0,
				color: this.getRandomColor()
			});
			++index;
		}, 10);
	}
	/**
	* シミュレーション
	*/
	simulate(boids){
		// BOIDを描画する
		this.drowBoid(boids);
		// BOIDを動かす
		this.moveBoid(boids);
	}
	/**
	* BOIDを動かす
	*/
	moveBoid(boids){
		for( let i = 0, len = this.boids.length; i < len; i++ ) {
			let boid = this.boids[i];
			let speed = Math.sqrt( Math.pow( boid.vx, 2 ) + Math.pow( boid.vy, 2 ) );

			//結合
			this.cohesion(i);
			//分離
			this.separation(i);
			//整列
			this.alignment(i);

			//速度判定、最大速度になったら減速
			if( speed >= MAX_SPEED ) {
				let r = MAX_SPEED / speed;
				boid.vx *= r;
				boid.vy *= r;
			}

			//左右の壁判定
			let isOutsideX = boid.x < 0 && boid.vx < 0 || boid.x > this.view.width && boid.vx > 0;
			//上下の壁判定
			let isOutsideY = boid.y < 0 && boid.vy < 0 || boid.y > this.view.height && boid.vy > 0;

			//壁に突き当たったら引き返す
			if( isOutsideX ) {
				boid.vx *= -1;
			}
			if( isOutsideY ) {
				boid.vy *= -1;
			}

			boid.x += boid.vx;
			boid.y += boid.vy;
		}
	}
	/**
	*結合・・・オブジェクトが他のオブジェクトが集まっている群れの中心方向へ向かうように方向を変える
	*/
	cohesion(index){
		let center = {x: 0, y: 0};
		let boidLength = this.boids.length;

		for( let i = 0; i < boidLength; i++ ) {
			if( i === index ) {
				continue;
			}
			center.x += this.boids[i].x;
			center.y += this.boids[i].y;
		}
		center.x /= boidLength - 1;
		center.y /= boidLength - 1;

		this.boids[index].vx += (center.x - this.boids[index].x) / 100;
		this.boids[index].vy += (center.y - this.boids[index].y) / 100;
	}
	/**
	*分離・・・オブジェクトが他のオブジェクトとぶつからないように距離をとる
	*/
	separation(index){
		for( let i = 0, len = this.boids.length; i < len; i++ ) {
			if( i === index ) {
				continue;
			}
			let distance = this.getDistance( this.boids[i], this.boids[index] );

			if( distance < 10 ) {
				this.boids[index].vx -= this.boids[i].x - this.boids[index].x;
				this.boids[index].vy -= this.boids[i].y - this.boids[index].y;
			}
		}
	}
	/**
	*整列・・・オブジェクトが他のオブジェクトと概ね同じ方向に飛ぶように速度と方向を合わせる
	*/
	alignment(index){
		let average = {vx: 0, vy: 0};
		let boidLength = this.boids.length;

		for( let i = 0; i < boidLength; i++ ) {
			if( i === index ) {
				continue;
			}
			average.vx += this.boids[i].vx;
			average.vy += this.boids[i].vy;
		}
		average.vx /= boidLength - 1;
		average.vy /= boidLength - 1;

		this.boids[index].vx += (average.vx - this.boids[index].vx) / 8;
		this.boids[index].vy += (average.vy - this.boids[index].vy) / 8;
	}
	/**
	*BOID間の距離の算出
	*/
	getDistance( boid1, boid2 ) {
		let x = boid1.x - boid2.x;
		let y = boid1.y - boid2.y;
		return Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
	}
	/**
	*カラー設定
	*/
	getRandomColor() {
		let colors = [0,0,0];
		colors = colors.map( () => {
			return Math.round( Math.random() * 255 );
		});
		return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 1)`;
	}
	/**
	 * BOIDを描画する
	 */
	drowBoid(boids){
			this.context.clearRect( 0, 0, this.view.width, this.view.height );

			for( let i = 0, len = this.boids.length; i < len; i++ ) {
				this.context.fillStyle = this.boids[i].color;
				this.context.beginPath();
				this.context.arc(
					this.boids[i].x,
					this.boids[i].y,
					BOID_SIZE / 2,
					0,
					Math.PI * 2,
					false
				);
				this.context.fill();
			}
			this.context.fillStyle = '#444';
			this.context.font = '16px sans-serif';
			this.context.fillText(`count : ${this.boids.length}`, 20, 40);
	}
	/**
	* イベントハンドラ
	*/
	bindEvents(){
		window.addEventListener( 'resize', () => {
			this.updateView();
		});
	}
	/**
	* 画面サイズの取得
	*/
	updateView(){
		this.view = {
			width: window.innerWidth,
			height: window.innerHeight
		};
		this.canvas.width = this.view.width;
		this.canvas.height = this.view.height;
	}
}

setTimeout(() => {
  new Boids().init();
}, 1000);
