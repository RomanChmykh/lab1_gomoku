var colors = require('colors'); // https://www.npmjs.com/package/colors
var blessed = require('blessed'); // https://www.npmjs.com/package/blessed


x = 0
y = 0


var screen = blessed.screen({
  smartCSR: true
});
var bg_box = blessed.box({
  top: 'center',
  left: 'center',
  width: '120%',
  height: '120%',
  tags: true,
  style: {
      bg: 'blue'
  }
});
var main_field_box = blessed.box({
  top: 'center',
  left: 'center',
  width: '95%',
  height: '95%',
  tags: true,
  style: {
      bg: 'black'
  }
});
class field{
  #h
  #w
  #arr
  #arr_point
  constructor(h,w){
    this.#h=h
    this.#w=w
    this.#arr = new Array(h)
    for(let i=0;i<h;i++){
      this.#arr[i] = new Array(w)
      for(let j=0;j<w;j++){
        this.#arr[i][j] = ' '
      }
    }
    this.#arr_point = new Array(h)
    for(let i=0;i<h;i++){
      this.#arr_point[i] = new Array(w)
      for(let j=0;j<w;j++){
        this.#arr_point[i][j] = ' '
      }
    }
    this.#arr[0][0] = '#'
  }
  print(){
    main_field_box.setContent('')
    for(let i=0;i<this.#h;i++){
      for(let j=0;j<this.#w;j++){
        if( this.#arr[i][j] == '#'){
          main_field_box.setContent(main_field_box.content + this.#arr[i][j])
        }
        else{
          main_field_box.setContent(main_field_box.content + this.#arr_point[i][j])
        }
        
      }
      main_field_box.setContent(main_field_box.content + '\n')
    }
    screen.render();
  }
  to_6(){
    if(this.#arr_point[y][x] == ' '){
      this.#arr[y][x] = ' '
    }
    else{
      this.#arr[y][x] = this.#arr_point[y][x]
    }
    x+=1
    this.#arr[y][x] = '#'
  }
  to_4(){
    this.#arr[y][x] = ' '
    x-=1
    this.#arr[y][x] = '#'
  }
  to_2(){
    this.#arr[y][x] = ' '
    y+=1
    this.#arr[y][x] = '#'
  }
  to_8(){
    if(this.#arr_point[y][x] == ' '){
      this.#arr[y][x] = ' '
    }
    else{
      this.#arr[y][x] = this.#arr_point[y][x]
    }
    y-=1
    this.#arr[y][x] = '#'
  }
  point(f){
    this.#arr_point[y][x] = f
  }
  check(){
    for(let i=0;i<this.#h;i++){
      for(let j=0;j<this.#w;j++){
        if (this.#arr_point[i][j] != ' ') {
          if (this.check_h(i,j)){
            this.win(this.#arr_point[i][j])
          }
          if(this.check_w(i,j)){
            this.win(this.#arr_point[i][j])
          }
        }
      }
    }
  }
  check_h(i,j){
    if (this.#arr_point[i][j] == this.#arr_point[i+1][j] && this.#arr_point[i+1][j] == this.#arr_point[i+2][j] && this.#arr_point[i+2][j] == this.#arr_point[i+3][j] && this.#arr_point[i+3][j] == this.#arr_point[i+4][j]){
      return true
    }
    return false
  }
  check_w(i,j){
    if (this.#arr_point[i][j] == this.#arr_point[i][j+1] && this.#arr_point[i][j+1] == this.#arr_point[i][j+2] && this.#arr_point[i][j+2] == this.#arr_point[i][j+3] && this.#arr_point[i][j+3] == this.#arr_point[i][j+3]){
      return true
    }
    return false
  }
  win(win){
    main_field_box.setContent('win   -     ' + win)
    main_field_box.style.bg = 'green'

    screen.render()
  }
}

screen.key(['6'], function(ch, key) {
  A.to_6()
  A.print()
});
screen.key(['4'], function(ch, key) {
  A.to_4()
  A.print()
});
screen.key(['8'], function(ch, key) {
  A.to_8()
  A.print()
});
screen.key(['2'], function(ch, key) {
  A.to_2()
  A.print()
});
screen.key(['0'], function(ch, key) {
  A.point('0')
  A.print()
  A.check()
});
screen.key(['x'], function(ch, key) {
  A.point('x')
  A.print()
  A.check()
});


screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
screen.append(bg_box);
screen.append(main_field_box);
screen.title = 'game';
A = new field( parseInt(main_field_box.height), parseInt(main_field_box.width));
A.print()


screen.render();