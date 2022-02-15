video = "";
objects = [];
status = "";
hexagon = "";

function preload() {
    hexagon = loadSound("Hexagon.mp3");
}

function setup() {
    canvas = createCanvas(640,480);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start_detection() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.error();
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video, 0, 0, 640, 480);
    if (status != "") {
        hexagon.stop()
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "No. of Objects Detected: " + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if (status = "") {
                hexagon.stop();
                document.getElementById("status").innerHTML = "Status : Objects Detected";
                document.getElementById("no_of_objects").innerHTML = "No Objects Detected!";
                document.getElementById("object_detected").innerHTML = "No Objects Detected!";
                
            }

    if (objects[i].label == input) {
        hexagon.play();
        video.stop()
        objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = input + "Found!";
            document.getElementById("number_of_objects").innerHTML = "No. of Objects Detected: " + objects.length;
        }

        else {
            document.getElementById("status").innerHTML = input + "Not Found!";
        }
 
     }

  }

}