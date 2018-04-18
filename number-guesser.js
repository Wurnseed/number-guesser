//////////////////////////////////
//          ADJUSTABLE          //
//            VALUES            //
//////////////////////////////////

// Length of training set
// !warning! THIS NUMBER DEPENDS ON
// AVAILABILITY OF numbers%times%.mnist FILE
var times = 100;

// Amount of training epochs
var t_c = 1;

//Hidden neurones
var hn = 1;

//////////////////////////////////
//          ADJUSTABLE          //
//            VALUES            //
//////////////////////////////////




// Defining weather it is hosted
// on localhost or on real server
var lh = document.location.host == "localhost:8000" ? true : false;

//Array of 10 numbers
var pic = [[],[],[],[],[],[],[],[],[],[]];
var rev_l_cs_mtx = [[],[],[],[],[], [],[],[],[],[], [],[],[],[],[], [],[],[],[],[], [],[],[],[],[], [],[],[]];

var data;
var mtx = [];
//Matrix of 28 layers
var layers = [[],[],[],[],[], [],[],[],[],[], [],[],[],[],[], [],[],[],[],[], [],[],[],[],[], [],[],[]];
var cs_mtx = [];
var start = true;

var sbmt,
    cler;

var prevX;
var prevY;

var stupidvariable = 0;

var neunet;

/* Copied this code below from StackOverflow */
/**/ var w = window,
/**/ d = document,
/**/ e = d.documentElement,
/**/ g = d.getElementsByTagName('body')[0],
/**/ x1 = w.innerWidth || e.clientWidth || g.clientWidth,
/**/ y1 = w.innerHeight|| e.clientHeight|| g.clientHeight;
/* Copied this code above from StackOverflow */

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
  sbmt.position(0,sz+sz/7);
  sbmt.mousePressed(subm);
  sbmt.size(sz/2,sz/10);

  cler = createButton('Clear');
  cler.position(sz/2,sz+sz/7);
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
}

function touchMoved() {
  if(stupidvariable !=0){
    line(mouseX, mouseY, prevX, prevY);
    prevX=mouseX;
    prevY=mouseY;
  }else{
    line(mouseX, mouseY, mouseX, mouseY);
    prevX=mouseX;
    prevY=mouseY;
    stupidvariable = 1;
  }
	return false;
}

function touchEnded(){
  stupidvariable = 0;
  return false;
}

function mouseReleased(){
   stupidvariable = 0;
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
  cs_mtx = [];

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

  //Some boring formulas to find needed stuff
  var pw = x_end - x_start;
  var ph = y_end - y_start;
//  console.log("Height: ", ph, "\nWidth: ", pw);
  var xOffset = floor((28 - pw)/2);
  var yOffset = floor((28 - ph)/2);
  var p1 = yOffset * 28 + (xOffset - x_start_offset);
  var p2 = y_start * 28 + x_start - x_start_offset;

  for(let i = 0; i < 784; i++){
    if(floor(i/28)>y_end||i+p1>=784||i+p2>=784){break;}
    mtx[i + p1] = ins[i + p2];
  }

  let xctnt = 0;
  //Filling layers Array
  for(let i = 0; i < 28; i++){
    for(let j = 0; j < 28; j++){
      layers[i][j] = mtx[xctnt];
      xctnt++;
    }
  }

  //Scaling drawing height to 20px
  if(ph!=20){
    let ratio = 20/ph;
    let xratio = 0;

    let np = ratio*1.5;
    let wp = 0;
    let nw = 0;
    let hei = 0;

    //Adding offset
    for(let i = 0; i<yOffset; i++){
      let poop = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0];
      cs_mtx = cs_mtx.concat(poop);
    }

    //Scaling height
    for(let i  = yOffset; i < ph+1.5*yOffset; i++){
      while(np>=1){
        cs_mtx = cs_mtx.concat(layers[i]);
        np--;
      }
      np+=ratio;
    }

    //Count scaled height
    for(let i = 0; i < 28; i++){
      for(let j = 0; j < 28; j++){
        if(cs_mtx[i*28+j]>0){
          hei++;
          i++;
          j=0;
        }
      }
    }
    hei-=1;

    let l_cs_mtx = new Matrix(28,28);
    for(let i = 0; i < 28; i++){
      for(let j = 0; j < 28; j++){
        l_cs_mtx.matrix[i][j]=cs_mtx[i*28+j];
      }
    }

    let rev_cs_mtx = l_cs_mtx.transpose();


    for(let i = 0; i < 28; i++){
      for(let j = 0; j < 28; j++){
        cs_mtx[i*28+j]=rev_cs_mtx.matrix[i][j];
      }
    }

    console.log(rev_l_cs_mtx);

    //Layered cs_mtx
    for(let i = 0; i < 28; i++){
      for(let j = 0; j < 28; j++){
        rev_l_cs_mtx[i][j]=cs_mtx[i*28+j];
      }
    }

    //Scaled width
    nw = Math.round(pw*hei/ph);
    xratio = pw/nw;
    wp = xratio;
    let ctnn = 0;

    let temp_rev_cs_mtx = new Matrix(28,28);

    for(let i  = xOffset; i < pw+1.5*xOffset; i++){
      while(wp>=1){
        temp_rev_cs_mtx.matrix = temp_rev_cs_mtx.matrix.concat(rev_l_cs_mtx[i]);
        wp--;
      }
      wp+=xratio;
    }

    // let matrix = temp_rev_cs_mtx.transpose();
    //
    //
    // for(let i = 0; i < 28; i++){
    //   for(let j = 0; j < 28; j++){
    //     cs_mtx[i*28+j]=matrix.matrix[i][j];
    //   }
    // }

    for(let i = 0; i<28-ph+6-(yOffset); i++){
      if(cs_mtx.length<784){
        let poop = [0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0];
        cs_mtx = cs_mtx.concat(poop);
      }
    }
  }else{
    for(let i = 0; i < 28; i++){
      cs_mtx = cs_mtx.concat(layers[i]);
    }
  }

    //Centering drawing
    ins = cs_mtx;

    var x_start = null;
    var y_start = null;
    var x_end = 0;
    var y_end = 0;
    var x_start_offset = 0;
    cs_mtx = [];

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

    //Some boring formulas to find needed stuff
    var pw = x_end - x_start;
    var ph = y_end - y_start;
    //console.log("Height scaled: ", ph, "\nWidth scaled: ", pw);
    var xOffset = floor((28 - pw)/2);
    var yOffset = floor((28 - ph)/2);
    var p1 = yOffset * 28 + (xOffset - x_start_offset);
    var p2 = y_start * 28 + x_start - x_start_offset;

    for(let i = 0; i < 784; i++){
      if(floor(i/28)>y_end||i+p1>=784||i+p2>=784){break;}
      mtx[i + p1] = ins[i + p2];
    }

  cs_mtx = mtx;

  //Making area out of centered 20x20 box white
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 28; j++){
      if(i<4){
        cs_mtx[i*28+j]=0;
      }else{
        cs_mtx[((i+20)*28)+j]=0;
      }
    }
  }


  //Drawing centered drawing
  //Thx Daniel Shiffman
  let img = createImage(28,28);
  img.loadPixels();
  for(let i = 0; i < 784; i++){
      let val = cs_mtx[i];
      //R
      //Yeah, he`s i*4 + 0
      img.pixels[i*4 + 0]  = 255-val*255;
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
  // //This thing was used  for debugging
  // //If you want to get some lulz, try it
  // strokeWeight(1);
  // stroke(255,0,0);
  // rect(xOffset,yOffset,pw,ph);


  //Feedforwarding
  var outs = neunet.query(cs_mtx);


  // Finding max from outputs
  // And getting its index
  // index equals the number we are finding
 txt.elt.innerText = softmax(outs).indexOf(max(softmax(outs)));
  // console.log(neunet.wih.matrix[0]);
  // console.log(neunet.who.matrix[0]);

}

function clr() {background(255);}

//THX Jabrils
function softmax(vec) {
    VEC = [];
    for (var i = 0; i < vec.length; i++) {
        VEC[i] = Math.pow(Math.E, vec[i]) / Summation(vec);
    }
    return VEC;
}

//THX Jabrils
function Summation(vec) {
    final = 0;
    for (var i = 0; i < vec.length; i++) {
        final += Math.pow(Math.E, (vec[i]))
    }
    return final;
}

//I was to lazy to wriste dat code
//THX Jabrils, again
