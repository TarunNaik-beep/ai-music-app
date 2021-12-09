song1 = "music.mp3";
song2 = "music2.mp3";

leftWristY = 0
leftWristX = 0
rightWristY = 0
rightWristX = 0

scoreLeftWrist = 0
scoreRightWrist = 0

song1_status = "";
song2_status = "";

function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses );
}

function draw() {
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("FF0000");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreLeftWrist>0.2) {
        circle(leftWristX,leftWristY,30);
        song2.stop();
        if(song1_status==false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Harry Potter is Playing";
        }
    }
    if(scoreRightWrist>0.2) {
        circle(rightWristX,rightWristY,30);
        song1.stop();
        if(song2_status==false) {
            song2.play();
            document.getElementById("song_name").innerHTML = "Peter Pan is Playing";
        }
    }
}

function gotposes(error, results) {
    if(results.length) {
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}