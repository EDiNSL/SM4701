
const model = await tf.loadLayersModel('tfjs/4xNEW_XCep_Combined/model.json');

var ctx = document.getElementById('imageCanvas').getContext('2d');
var img = new Image();
var imgData;
var imgDataArray = [];

var loader = document.querySelector('#loader');
loader.addEventListener('change', printImage, false);



function load_data() {
    imgData = ctx.getImageData(0, 0, 299, 299);
    var input = tf.browser.fromPixels(imgData, 3);
    input = input.expandDims(0);
    console.log(input);
    const prediction = model.predict(input);
    prediction.print();
  }

  function load_data_custom() {
    imgData = ctx.getImageData(0, 0, 299, 299).data;
    for (var i = 0, n = 0; i < imgData.length; i++) {

        if (i%4!=3){
          imgDataArray[n] = imgData[i]/127.5-1;
          n++;
        }
      }
    var input = tf.tensor4d(imgDataArray, [1, 299, 299, 3], 'float32');
    console.log(input);
    const prediction = model.predict(input);
    var answer = [];

    prediction.data().then((a)=>{
      let scoreDisplay = [];
      scoreDisplay[0] = document.getElementById("massiveScore");
      scoreDisplay[1] = document.getElementById("averageScore");
      scoreDisplay[2] = document.getElementById("penisScore");
      scoreDisplay[3] = document.getElementById("smallScore");

      for (var j = 0; j < a.length; j++){
        answer[j] = a[j];
        scoreDisplay[j].innerHTML = (answer[j]*100).toFixed(1) + "%";
      }

      if (Math.max.apply(null, answer) == answer[2]){
        document.getElementById("penisConclusion").innerHTML = "There probably aren't any penises.";
      } else {
        document.getElementById("penisConclusion").innerHTML = "There probably is a penis.";
      }

    })
  }

  function printImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        img.onload = function(){
            ctx.drawImage(img, 0, 0, 299, 299);
            load_data_custom();
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
  }