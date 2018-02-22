

//ADJUSTABLE VALUES
var lr = 0.1;
var training_count = 500000;
var lr_target = 0.0001;
//ADJUSTABLE VALUES

var cols  = 3;
var rows  = 5;

//Getting html element
let html = document.getElementById('html')
//Setting a pixel width to a value of the page height - 1%
var pix = html.clientHeight/rows - (html.clientHeight/rows)/100;

var w = pix*cols;
var h = pix*rows;

//Decreasing LR
var lr_step  = lr_target/training_count;

var pic = [];

var txt = "";
var chance = "";

//Setup actions
function setup() {
 createCanvas(w+w/(2/1.5+1),h);

 //Initializing pic array
 for(let i = 0; i<cols*rows; i++){
   pic[i]=0;
 }

}

//Looped actions
function draw(){
  background(50,50,50);

  //Grid
  drawGrid(0,0);

  //Drawing button
  drawButton();

  //Drawing number
  for(let i = 0;i<pic.length;i++){
    fill(75);
    if(pic[i]==1){
      rect((i%cols)*pix,Math.floor(i/cols)*pix, pix, pix);
    }
  }

    //Text drawing
    fill(75);
    textSize(pix);
    text(txt,cols*pix*1.13,pix*1.3);

    fill(200,25,25);
    textSize(pix/6);
    text(chance,cols*pix*1.06,pix*1.5);


}

//Click handling
function mousePressed(){
  if(Math.floor(mouseX/pix)<cols){
    if(Math.floor(mouseY/pix)<rows){
      drawRect(mouseX,mouseY);
    }
  }

 //Handling button press
  if(mouseX>=cols*pix+10&&mouseX<=cols*pix+10+pix*1.1){
    if(mouseY>=rows*pix-pix+10&&mouseY<=rows*pix-pix+10+pix-20){
      subm();
          console.log(1);
    }
  }

  if(mouseX>=cols*pix+10&&mouseX<=cols*pix+10+pix*1.1){
    if(mouseY>=rows*pix-pix-pix/2&&mouseY<=rows*pix-pix-pix/2+pix/2){
      for(let i = 0;i<pic.length;i++ ){
        pic[i] = 0;
      }
      console.log(2);
     }
  }

}

//Pixel drawing function
function drawRect(_x,_y){
  let x = Math.floor(_x/pix);
  let y = Math.floor(_y/pix);

  if(pic[y*cols+x]==0){
    pic[y*cols+x] = 1;
  }else{
    pic[y*cols+x] = 0;
  }
}

//Grid drawing function
function drawGrid(x_off,y_off){
  let count = 1;
  noStroke();
  for(let i = 0;i<cols;i++){
    for(let j = 0;j<rows;j++){
      if(count%2===0){
        fill(245);
      }else{
        fill(225);
      }
      rect(i*pix+x_off,j*pix+y_off,pix,pix);
      count++;
    }
  }
}

//Drawing button
function drawButton() {
  fill(150,20,20);
  stroke(0);
  strokeWeight(pix/25);
  rect(cols*pix+10,rows*pix-pix-pix/2,w/10+pix-20,pix/2);//DUCT-TAPE POSITIONING
  textSize(pix/4);
  fill(0);
  strokeWeight(0.6);
  text('Clear',cols*pix+pix/3,rows*pix-pix*1.1-pix/15);//DUCT-TAPE POSITIONING
  noStroke();

  fill(200);
  stroke(0);
  strokeWeight(pix/25);
  rect(cols*pix+10,rows*pix-pix+10,w/10+pix-20,pix-20);//DUCT-TAPE POSITIONING
  textSize(pix/4);
  fill(0);
  strokeWeight(0.6);
  text('Submit',cols*pix+pix/4,rows*pix-pix/(2/1.5+1));//DUCT-TAPE POSITIONING
  noStroke();
}

//Train
function subm(){
     //NeuralNetwork initialization and training
  console.log(pic);
  var neunet = new NeuralNetwork(cols*rows,10, 10,lr);

     //Numbers in binary code
     //This is BIG DATA
     //  !!!WARNING!!! I AM GOING TO USE DUCT TAPE !!!WARNING!!!
  var data0 = [{
   in: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]//Full
  },{
   in: [0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0]//Thin
  },{
   in: [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1]//TR,BL
  },{
   in: [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0]//TL,BR
  },{
   in: [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]//Top-left
  },{
   in: [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1]//Top-right
  },{
   in: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1]//Bot-left
  },{
   in: [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0]//Bot-right
  },{
    //Code below makes blank page to be defined as '0'
   in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Blank page
  },{
   in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Blank page
  },{
   in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Blank page
  },{
   in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Blank page
  },{
   in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Blank page
  },{
   in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Blank page
  },{
   in: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Blank page
  }];

  var data1 =[{
   in: [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1]
  },{
   in: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
  },{
   in: [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1]
  },{
   in: [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
  },{
   in: [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0]
  },{
   in: [0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0]
  },{
   in: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]
  },{
   in: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
  },{
   in: [0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
  },{
   in: [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
  },{
   in: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0]
  },{
   in: [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]
  },{
   in: [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]
  },{
   in: [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0]
  },{
   in: [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]
  },{
   in: [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1]
  }];

  var data2 =[{
   in: [1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1]
  },{
   in: [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1]
  },{
   in: [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1]
  },{
   in: [1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1]
  },{
   in: [1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1]
  },{
   in: [1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1]
  }];

  var data3 =[{
   in: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1]
  },{
   in: [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1]
  },{
   in: [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0]
  },{
   in: [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
   in: [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
   in: [0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1]
  }];

  var data4 =[{
   in: [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1]
  },{
   in: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1]
  },{
   in: [0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0]
  },{
   in: [1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
  },{
   in: [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1]
  },{
   in: [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1]
  }];

  var data5 =[{
   in: [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
   in: [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
   in: [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
   in: [0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0]
  }];

  var data6 =[{
   in: [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1]
  },{
   in: [0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0]
  },{
   in: [0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0]
  },{
   in: [0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0]
 },{
   in: [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1]
 },{
   in: [1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1]
 }];

  var data7 =[{
   in: [1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0]
  },{
   in: [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]
  },{
   in: [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
  },{
   in: [1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]
  },{
   in: [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1]
  }];

  var data8 =[{
   in: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
  },{
   in: [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0]
  },{
   in: [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
  },{
   in: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0]
  },{
   in: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
  },{
   in: [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1]
  },{
   in: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
  },{
   in: [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1]
  },{
   in: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1]
  },{
   in: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0]
  },{
   in: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0]
  },{
   in: [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1]
  }];

  var data9 =[{
    in: [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0]
  },{
    in: [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
    in: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0]
  },{
    in: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
    in: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0]
  },{
    in: [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0]
  },{
    in: [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1]
  },{
    in: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1]
  },{
    in: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1]
  }];

   //Array of numbers
   var data = [data0,data1,data2,data3,data4,data5,data6,data7,data8,data9];

  //Training
     for(let j = 0;j<=training_count;j++){
       let nndat = random(data);

       //Forming 'outpus' array for train()
       let outa = [];
       for(let t = 0;t<=9;t++){
         if(t!=data.indexOf(nndat)){
           outa.push(0);
         }else if (t===data.indexOf(nndat)){
           outa.push(1);
         }
       }

       //Train function
       neunet.train(random(nndat).in,outa);

       lr-=lr_step; //Decreasing LR by lr_step
      neunet.lr = lr; //Setting new learning rate value to NN
     }

     //neunet.who.matrix = [];
     //neunet.wih.matrix = [];

  let outs = neunet.query(pic); //Feedforwarding the answer

  //Finding max from outputs
  //And getting its index
  //index equals the number we are finding
  let max_num = outs[0];
  let number = null;
  for(let i = 0;i<outs.length;i++){
    if(outs[i]>=max_num){
      max_num = outs[i];
      number = outs.indexOf(max_num);
    }
  }
  txt = number;
  chance = "Chance: "+Math.floor(max_num*100)+"%";
  console.log(neunet.wih.matrix);
  console.log(neunet.who.matrix);
}
