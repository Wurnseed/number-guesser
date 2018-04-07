//////////////////////////////////
//          ADJUSTABLE          //
//            VALUES            //
//////////////////////////////////

// Length of training set
// !warning! THIS NUMBER DEPENDS ON
// AVAILABILITY numbers%times%.mnist FILES
var times = 100;

// Amount of training epochs
var t_c = 1;

//Hidden neurones
var hn = 1;

var touchEnded = true;

//////////////////////////////////
//          ADJUSTABLE          //
//            VALUES            //
//////////////////////////////////




// Defining weather it is hosted
// on localhost or on real server
var lh = document.location.host == "localhost:8000" ? true : false;

//Array of 10 numbers
var pic = [[],[],[],[],[],[],[],[],[],[]];

var data;
var mtx = [];
var start = true;
var isPhone = false;

var sbmt,
    cler;

var prevX;
var prevY;

var neunet;

var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0],
  x1 = w.innerWidth || e.clientWidth || g.clientWidth,
  y1 = w.innerHeight|| e.clientHeight|| g.clientHeight;

  //Setting size to a 80% of window size
  var sz = y1<x1 ? y1-y1/5 : x1-x1/5;

  var txt;

//Loading data
function preload(){
  if(lh){data = loadBytes("http://localhost:8000/mnist/numbers"+times+".mnist");}
  else{data = loadBytes("mnist/numbers"+times+".mnist");}
}

//Setup actions
function setup() {
  txt = createP('.');
  txt.attribute('class','txet');

  let strsz = 'font-size: ' + sz/10 + 'px;visibility: hidden;';
  txt.attribute('style',strsz);

  var c = createCanvas(28,28);
  background(255);
  noFill();

  sbmt = createButton('Submit');
  sbmt.position(0,sz+sz/8);
  sbmt.mousePressed(subm);
  sbmt.size(sz/2,sz/10);

  cler = createButton('Clear');
  cler.position(sz/2,sz+sz/8);
  cler.mousePressed(clr);
  cler.size(sz/2,sz/10);

  //Matrix emptying
  for(let i = 0; i < 784; i++){mtx[i]=0;}

  //Upscaling canvas size to 28 by 28
  let atrt = "width:"+sz+"px;height:"+sz+"px;";
  c.attribute("style",atrt);
  c.attribute("class","cvs");

  neunet = new NeuralNetwork(784, hn, 10);

  for(let n = 0; n < times; n++){
                  // let img = createImage(28,28);
                  // img.loadPixels();
    let offset =  times + (n*784);
    //Buffered pic
    let temp = [];
    //Buffering pic
    for(let i = 0; i < 784; i++){
      let val = data.bytes[i + offset]/255;
                  // img.pixels[i * 4 + 0]  = 255-(val*255);
                  // img.pixels[i * 4 + 1]  = 255-(val*255);
                  // img.pixels[i * 4 + 2]  = 255-(val*255);
                  // img.pixels[i * 4 + 3]  = 255;
      temp.push(val);
    }
                  // img.updatePixels();
                  // let x = (n % 10) *28;
                  // let y = Math.floor(n / 10) * 28;
                  // image(img, x ,y);
    //Pushing Buffered picture to array[label of this pic]
    pic[data.bytes[n]].push(temp);
  }

  //NN Init
  subm();
}

//Drawing
function draw(){
  strokeWeight(2);
  stroke(0);

  // if(isPhone==false){
  //   //Is click in the canvas
  //   let inCnv = winMouseX<=sz&&winMouseY<=sz+sz/10 ? true : false;
  //   //Drawin
  //   if(mouseIsPressed&&inCnv){line(mouseX,mouseY,pmouseX,pmouseY);}
  // }
}

// function touchStarted() {
//   prevX = mouseX;
//   prevY = mouseY;
// }
//
// function touchMoved() {
//   if(isPhone==true){
//     //Is click in the canvas
//     let inCnv = winMouseX<=sz&&winMouseY<=sz+sz/10 ? true : false;
//     //Drawin
//     if(mouseIsPressed&&inCnv){line(mouseX,mouseY,pmouseX,pmouseY);}
//     prevX = mouseX;
//     prevY = mouseY;
//   }
// 	return false;
// }

function touchMoved() {
	line(pmouseX, pmouseY, pmouseX, pmouseY);
	return false;
}



//Training and Feedforwarding
function subm(){
  // * AFTER IF STATEMENT ARE ASYNC STARTED COMMANDS
if(start){
  //Training

  for(let n = 0; n < t_c; n++){
    let training = pic;
    for(let i = 0; i < times; i++){
      let num = Math.round(random(0, 9));

      //Skiping already trained numbers
      if(training[num]==undefined){times--;continue;}
      if(training[num][0]==undefined){times--;continue;}

      //Number in range of number`s data
      let el = training[num].pop();
      let out  = [];

      //Preparing data for training
      for(let i  = 0; i < 10; i++){if(i!=num){out.push(0);}if(i===num){out.push(1);}}

      neunet.train(el,out);
      startup();
      start_canvas();
    }
  }

  start = false;
  //Breaking the func
  return;
}
  //BUTTON FUNCTION

  let strsz = 'font-size: ' + sz/10 + 'px;visibility: visible;';
  txt.attribute('style',strsz);

  //Getting data from canvas
  let can = get();
  let ins = [];
  can.loadPixels();

  //Matrix emptying
  for(let i = 0; i < 784; i++){mtx[i]=0;}

  //Forming raw inputs
  for(let i = 0; i < 784; i++){ins[i] =  (255 - can.pixels[i * 4])/255;}

  var x_start = null;
  var y_start = null;
  var x_end = 0;
  var y_end = 0;
  var x_start_offset = 0;

  //Centering drawing
  for(let i = 0; i < 784; i++){
    //Skips white pixels
    if(ins[i]==0){continue;}else if (ins[i]>0){
      // First point of drawing
        //X
        if(x_start==null||i%28<x_start){x_start = i%28;x_start_offset = i%28;}
        //Y
        if(y_start==null){y_start = floor(i/28);}
      // Last point
        //X
        if(i%28>x_end){x_end=i%28;}
        //Y
        if(floor(i/28)>y_end){y_end=floor(i/28);}
    }
  }
  //Distance between min x and start x
  x_start_offset-=x_start;

  //Some boring formulas to find that stuff
  var pw = x_end - x_start;
  var ph = y_end - y_start;
  var xOffset = floor((28 - pw)/2);
  var yOffset = floor((28 - ph)/2);
  var p1 = yOffset * 28 + (xOffset - x_start_offset);
  var p2 = y_start * 28 + x_start - x_start_offset;

  for(let i = 0; i < 784; i++){
    if(floor(i/28)>y_end||i+p1>=784||i+p2>=784){break;}
    mtx[i + p1] = ins[i + p2];
  }

  //Drawing centered drawing
  let img = createImage(28,28);
  img.loadPixels();
  for(let i = 0; i < 784; i++){
      let val = mtx[i];
      //R
      img.pixels[i*4]  = 255-val*255;
      //G
      img.pixels[i*4 + 1]  = 255-val*255;
      //B
      img.pixels[i*4 + 2]  = 255-val*255;
      //Transperency
      img.pixels[i*4 + 3]  = 255;
  }
  img.updatePixels();
  image(img, 0 ,0);

  // //Drawing bounds around drawing
  // //This thing was used only in debugging
  // //If you want to get some lulz, try it
  // strokeWeight(1);
  // stroke(255,0,0);
  // rect(xOffset,yOffset,pw,ph);

  //Feedforwarding
  var outs = neunet.query(mtx);

  // Finding max from outputs
  // And getting its index
  // index equals the number we are finding
  txt.elt.innerText = outs.indexOf(max(outs));
  console.log(neunet.wih.matrix[0]);
  console.log(neunet.who.matrix[0]);

}

function clr() {background(255);}
