video = "";
objects = [];
status = "";
hexagon = "";
input = "";
detect = "";

function preload() {
    hexagon = loadSound("Hexagon.mp3");
    input = document.getElementById("input").value;
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
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 640, 480);
    if (status != "" && input != objects) {
        hexagon.stop()
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of Objects Detected: " + objects;
            document.getElementById("object_detected").innerHTML = "Correct Object Not Detected!"
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
        }
    }
    
    if (status = "") {
        hexagon.stop();
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("no_of_objects").innerHTML = "No Objects Detected!";
        document.getElementById("object_detected").innerHTML = "No Objects Detected!";
        
    }

    if (input = objects && status != "") {
        hexagon.play();
        console.log("Correct Object Found!")
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "No. of Objects Detected: " + objects;
            document.getElementById("object_detected").innerHTML = "Correct Object Detected!";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}