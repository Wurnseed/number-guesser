var start = true;
var times = 5000;
var t_c = 1;
//Array of 10 numbers
var pic = [[],[],[],[],[],[],[],[],[],[]];
var data;

var neunet;

function preload(){
  //Loading data
  data = loadBytes("http://localhost:8000/numbers"+times+".mnist");
}

//Setup actions
function setup() {

  createCanvas(28,28);
  background(255);
  noFill();

  var c = document.getElementById('defaultCanvas0');
  //Upscaling canvas size to 28 by 28
  c.setAttribute("style","width:280px;height:280px;");

  neunet = new NeuralNetwork(784, 800, 10);

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

  //Disabling button while training
  document.getElementById("subm").disabled = true;
  //NN Init
  subm();
}

//Drawing
function draw(){
  strokeWeight(2);
  stroke(0);
  if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
  }

}

//Training and Feedforwarding
function subm(){
  // * AFTER IF IS ASYNC STARTED COMMANDS
  if(start){
  //Training

  for(let n = 0; n < t_c; n++){
    let training = pic;
//    console.log(training);
    for(let i = 0; i < times; i++){
      let num = round(random(0, 9));

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

  //Enabling button after training
  document.getElementById("subm").disabled = false;
  start = false;
  //Breaking the func
  return;
  }
  //BUTTON FUNCTION


  //Getting data from canvas
  let can = get();
  let ins = [];
  can.loadPixels();



  //Forming raw inputs
  for(let i = 0; i < 784; i++){
    ins[i] =  (255 - can.pixels[i * 4])/255;
  }

  var x_start = null;
  var y_start = null;
  var x_end = 0;
  var y_end = 0;

  //Centering drawing
  for(let i = 0; i < 784; i++){
    //Skips white pixels
    if(ins[i]==0){continue;}else if (ins[i]>0){
      // First point of drawing
        //X
        if(x_start==null||i%28<x_start){x_start = i%28;}
        //Y
        if(y_start==null){y_start = floor(i/28);}
      // Last point
        //X
        if(i%28>x_end){x_end=i%28;}
        //Y
        if(floor(i/28)>y_end){y_end=floor(i/28);}
    }
  }



// for(let y = 0; y < 28; y++){
//   for(let x = 0; x < 28; x++){
//     let cli = x%2+y%2==0 ? 255 : 0;
//     strokeWeight(0.15);
//     stroke(cli);
//
//     rect(x,y,1,1);
//   }
// }

  //Feedforwarding
  var outs = neunet.query(ins);
  stroke(255,0,0);
  quad(x_start,y_start,x_end,y_start,x_end,y_end,x_start,y_end);
//  // Finding max from outputs
//  // And getting its index
//  // index equals the number we are finding
  console.log(outs.indexOf(max(outs)));
  // console.log(pic);
}


function clr() {background(255);}
