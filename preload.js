var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var hei = canvas.width;
var wei = canvas.height;

var size = 1 / 100;
var wd = wei * size;
var hd = hei * size;

var img = new Image();
img.src = 'http://image.ibb.co/jfcYnc/1.jpg';

// draw the original image at a fraction of the final size
ctx.drawImage(img, 0, 0, wd, hd);

// turn off image aliasing
ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

// enlarge the minimized image to full size
ctx.drawImage(canvas, 0, 0, wd, hd, 0, 0, wei, hei);
//
for(let i = 0; i < h; i++){ 
  for(let j = 0; j < w; i++){
    var p = ctx.getImageData(j, i, 1, 1).data;
    console.log(w);
    console.log(p);
    break;
    // if(p[0]+p[1]+p[2]/3 <= 100){
    //   pic.push(1);
    // }else{
    //   pic.push(0);
    // }
  }
}
console.log(pic);
