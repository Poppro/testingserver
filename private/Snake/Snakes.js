var w = 10;
var col, row;
var s = [];
var st = [];
var f;
var sSize = 0;
var socket;
var player;

function setup() {
  createCanvas(600,600);
  col = width/w;
  row = height/w;
  noStroke();
  frameRate(10);
  f = new food(floor(random(row)), floor(random(col)));
  player = 0;
  s.push(new snakeH(3,3));
}

function draw() {
  background(50);
  fill(0,255,0);
  f.render();
  fill(255);

    var posx = [];
    var posy = [];
  for(var i = 0; i < s.length; i++) {
    s[i].render();
    posx.push(s[i].col);
    posy.push(s[i].row);
    }
  if(st.length > sSize) {
    st.splice(0,1);
  }
  for(var i = 0; i < st.length; i++) {
    st[i].render();
  }
  if(s.row == f.row && s.col == f.col) {
    f = new food(floor(random(row)), floor(random(col)));
    sSize += 1;
  }

}

function snakeH(r,c) {
  this.col = c;
  this.row = r;
  this.xm = 0;
  this.ym = 0;
  
   this.render = function() {
     if(this.xm != 0) {
       st.push(new snakeT(this.row, this.col)); 
       this.col += this.xm;
     }
     if(this.ym != 0) {
       st.push(new snakeT(this.row, this.col)); 
       this.row += this.ym;
     }
    rect(this.col*w,this.row*w,w,w);
  }
}

function snakeT(r,c) {
  this.col = c;
  this.row = r;
  
  this.render = function() {
    rect(this.col*w,this.row*w,w,w);
  }
}

function food(r,c) {
  this.col = c;
  this.row = r;
  this.render = function() {
    rect(this.col*w,this.row*w,w,w);
  }
}

function keyPressed() {
  if(key == 'A') {
    s[player].xm = -1;
    s[player].ym = 0;
  }
  if(key == 'D') {
    s[player].xm = 1;
    s[player].ym = 0;
  }
  if(key == 'W') {
    s[player].ym = -1;
    s[player].xm = 0;
  }
  if(key == 'S') {
    s[player].ym = 1;
    s[player].xm = 0;
  }
}