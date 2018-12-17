let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let s = document.querySelector('.score')
let score = 0
let grid = newGrid()
function addNumber(){
  let a = [2, 4]
  let ran = Math.floor(Math.random()*a.length)
  let ranX = Math.floor(Math.random()*grid.length)
  let ranY = Math.floor(Math.random()*grid[0].length)

  if(grid[ranX][ranY]>0){
    addNumber()
  }else{
    grid[ranX][ranY] = a[ran]
  }

}
//returns a grid
function newGrid(){
  let grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  return grid
}
//drawing on canvas
addNumber()
function draw(){
  s.innerHTML = `Your Score is: ${score}`
  ctx.clearRect(0,0 , canvas.width, canvas.height)
  let x = 0,  y=0
  for(let i=0; i<4; i++){
    for(let j=0; j<4; j++){
      //drawing boxes
      ctx.fillStyle = '#cdc1b4'
      ctx.lineWidth = "6"
      ctx.strokeStyle = "#b1a497"
      if(grid[i][j]==0){
        ctx.beginPath()
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if(grid[i][j]==2){
        ctx.beginPath()
        ctx.fillStyle = '#eee4da'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==4) {
        ctx.beginPath()
        ctx.fillStyle = '#ede0c8'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==8) {
        ctx.beginPath()
        ctx.fillStyle = '#f2b179'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==16) {
        ctx.beginPath()
        ctx.fillStyle = '#f59563'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==32) {
        ctx.beginPath()
        ctx.fillStyle = '#f57c5f'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==64) {
        ctx.beginPath()
        ctx.fillStyle = '#f65d3b'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==128) {
        ctx.beginPath()
        ctx.fillStyle = '#edce71'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==256) {
        ctx.beginPath()
        ctx.fillStyle = '#edcc61'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==512) {
        ctx.beginPath()
        ctx.fillStyle = '#ecc850'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==1024) {
        ctx.beginPath()
        ctx.fillStyle = '#edc53f'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }else if (grid[i][j]==2048) {
        ctx.beginPath()
        ctx.fillStyle = '#e6bf03'
        ctx.rect(x, y, canvas.width/4, canvas.height/4)
        ctx.fill()
      }
      ctx.stroke()
      //drawing text
      if(grid[i][j]<5){
        if(grid[i][j]>0){
          ctx.font = '30px Arial'
          ctx.fillStyle = 'black'
          ctx.fillText(grid[i][j], x+40, y+60)
        }
      }else if(grid[i][j]>5){
        ctx.font = '30px Arial'
        ctx.fillStyle = 'white'
        ctx.fillText(grid[i][j], x+40, y+60)
      }
      x += canvas.width/4
    }

    x = 0
    y+=canvas.height/4
  }

}
window.onkeydown = e => {
  if(e.keyCode == 39){
    slide()
    combine()
    slide()
    addNumber()
    draw()
  }else if(e.keyCode == 37){
    flip()
    slide()
    combine()
    slide()
    flip()
    addNumber()
    draw()
  }else if(e.keyCode == 40){
    rotate()
    slide()
    combine()
    slide()
    rotate()
    addNumber()
    draw()
  }else if(e.keyCode == 38){
    rotate()
    flip()
    slide()
    combine()
    slide()
    flip()
    rotate()
    addNumber()
    draw()
  }
}
slasho.onswip(canvas, e=>{
  if(e == 'right'){
    slide()
    combine()
    slide()
    addNumber()
    draw()
  }else if(e == 'left'){
    flip()
    slide()
    combine()
    slide()
    flip()
    addNumber()
    draw()
  }else if(e == 'down'){
    rotate()
    slide()
    combine()
    slide()
    rotate()
    addNumber()
    draw()
  }else if(e == 'up'){
    rotate()
    flip()
    slide()
    combine()
    slide()
    flip()
    rotate()
    addNumber()
    draw()
  }

})
window.onkeyup = () =>{
  let tf = isGameOver()
  if(tf){
    s.innerHTML+=`<br>Game is Over`
    grid = newGrid()
    addNumber()
    score = 0
  }

}
function slide(){
  for(let i=0; i<grid.length; i++){
    let arr = grid[i].filter(e => e)
    let missing = 4-arr.length
    grid[i] = []
    for(let m=0; m<missing; m++){
      grid[i].push(0)
    }
    for(let j=0; j<arr.length; j++){
      grid[i].push(arr[j])
    }
  }
}
function combine(){
  for (let i = 0; i < grid.length; i++) {
    for(let j = grid[i].length-1; j>0; j--){
      let a = grid[i][j]
      let b = grid[i][j-1]
      if(a==b){
        grid[i][j] = a+b
        score +=(a+b)
        grid[i][j-1] = 0
        j-=1
      }
    }
  }
}
//flip from left to right and right to left
function flip(){
  for(let i=0; i<grid.length; i++){
    let arr = grid[i]
    grid[i] = [0,0,0,0]
    for(let j=0; j<grid[i].length; j++){
      grid[i][j] = arr[arr.length-(j+1)]
    }
  }
}
// flips from top to botom and bottom to top
function rotate(){
  let arr = grid
  grid = newGrid()
  for(let i=0; i<grid.length; i++){
    for(let j=0; j<grid[i].length; j++){
      grid[i][j] = arr[j][i]
    }
  }
}
draw()

function isGameOver(){
  let a = 0
  for(let i=0; i<grid.length; i++){
    for(let j=0; j<grid[i].length; j++){
      if(grid[i][j]==0){
        return false
      }
    }
  }
  for(let i=0; i<grid.length; i++){
    for(let j=0; j<grid[i].length; j++){
      if(grid[i][j]==0){
        return false
      }
    }
  }
  for(let i=0; i<grid.length-1; i++){
    for(let j=0; j<grid[i].length-1; j++){
      if(grid[i][j] === grid[i+1][j] || grid[i][j] === grid[i][j+1]){
        return false
      }
    }
  }
  for(let i=1; i<grid.length; i++){
    for(let j=1; j<grid[i].length; j++){
      if(grid[i][j] === grid[i-1][j] || grid[i][j] === grid[i][j-1]){
        return false
      }
    }
  }
  return true
}
