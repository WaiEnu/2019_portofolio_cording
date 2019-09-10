//https://qiita.com/cawpea/items/f1233c37ea799d3810cc

const FPS = 30;
const BOID_SIZE = 5;
const MAX_SPEED = 7;

class Boids {
  constructor() {
    this.body = document.querySelector('body');
    this.canvas = document.getElementById("boid");
    this.ctx = this.canvas.getContext('2d');
    this.boids = [];
  }
  init() {
    this.bindEvents();
    this.updateView();
    this.appendBoids(30);
    setInterval( this.simulate.bind(this), 1000/FPS );
  }
  bindEvents() {
    window.addEventListener( 'resize', () => {
      this.updateView();
    });
  }
  updateView() {
    this.view = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.canvas.width = this.view.width;
    this.canvas.height = this.view.height;
  }
  simulate() {
    this.drawBoids();
    this.moveBoids();
  }
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
  drawBoids() {
    this.ctx.clearRect( 0, 0, this.view.width, this.view.height );

    for( let i = 0, len = this.boids.length; i < len; i++ ) {
      this.ctx.fillStyle = this.boids[i].color;
      this.ctx.beginPath();
      this.ctx.arc(
        this.boids[i].x,
        this.boids[i].y,
        BOID_SIZE / 2,
        0,
        Math.PI * 2,
        false
      );
      this.ctx.fill();
    }
    this.ctx.fillStyle = '#444';
    this.ctx.font = '16px sans-serif';
    this.ctx.fillText(`count : ${this.boids.length}`, 20, 40);
  }
  moveBoids() {
    for( let i = 0, len = this.boids.length; i < len; i++ ) {
      let boid = this.boids[i];
      let speed = Math.sqrt( Math.pow( boid.vx, 2 ) + Math.pow( boid.vy, 2 ) );
/**
**/
      this.cohesion(i);
      this.separation(i);
      this.alignment(i);

      if( speed >= MAX_SPEED ) {
        let r = MAX_SPEED / speed;
        boid.vx *= r;
        boid.vy *= r;
      }

      let isOutsideX = boid.x < 0 && boid.vx < 0 || boid.x > this.view.width && boid.vx > 0;
      let isOutsideY = boid.y < 0 && boid.vy < 0 || boid.y > this.view.height && boid.vy > 0;

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
  cohesion(index) {
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
  separation(index) {
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
  alignment(index) {
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
  getDistance( boid1, boid2 ) {
    let x = boid1.x - boid2.x;
    let y = boid1.y - boid2.y;
    return Math.sqrt( Math.pow( x, 2 ) + Math.pow( y, 2 ) );
  }
  getRandomColor() {
    let colors = [0,0,0];
    colors = colors.map( () => {
      return Math.round( Math.random() * 255 );
    });
    return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 1)`;
  }
}

setTimeout(() => {
  new Boids().init();
}, 1000);
