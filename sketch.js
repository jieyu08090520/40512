let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(400, 400);

  video = createCapture(VIDEO);
  video.size(400, 400); // 確保視訊大小與畫布一致
  video.hide();

  console.log(video); // 確認 video 是否成功初始化

  facemesh = ml5.facemesh(video, () => {
    console.log("Facemesh model loaded!");
    facemesh.on("predict", (results) => {
      predictions = results;
    });
  });
}

function draw() {
  background(220);

  // 鏡像 video
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height); // 確保視訊填滿畫布
  pop();

  noFill();
  stroke(255, 0, 0);
  strokeWeight(5);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 畫嘴唇時也要鏡像 x 座標
    drawLines(keypoints, [
      409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
      76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184,
    ]);
  }
}

function drawLines(keypoints, indices) {
  for (let i = 0; i < indices.length - 1; i++) {
    const [x1, y1] = keypoints[indices[i]];
    const [x2, y2] = keypoints[indices[i + 1]];
    line(width - x1, y1, width - x2, y2); // 鏡像 x 座標
  }
}