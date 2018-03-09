var neunet;
var data;

//Setup actions
function setup() {
  
  createCanvas(280,280);
  background(255);
  data = loadBytes("numbers100.lmnist");

   //NeuralNetwork initialization and training
   var neunet = new NeuralNetwork(784, 800, 10);

   //Training
   // for(let i = 0; i < ){
   //
   // }

}

//Drawing
function draw(){
  strokeWeight(18);
  stroke(0);
  if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
  }

}

//Training and Feedforwarding
function subm(){

//  let outs = neunet.query(); //Feedforwarding the answer

//  // Finding max from outputs
//  // And getting its index
//  // index equals the number we are finding
  // let max_num = outs[0];
  // let number = null;
  // for(let i = 0;i<outs.length;i++){
  //   if(outs[i]>=max_num){
  //     max_num = outs[i];
  //     number = outs.indexOf(max_num);
  //   }
  // }
}
