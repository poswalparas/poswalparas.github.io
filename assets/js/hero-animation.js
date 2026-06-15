alert("Hero animation loaded");

const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth;
canvas.height = 420;

ctx.fillStyle = "red";
ctx.fillRect(50,50,150,150);

console.log(canvas.width);
console.log(canvas.height);

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.beginPath();

    ctx.fillStyle="#38bdf8";

    ctx.arc(200,200,12,0,Math.PI*2);

    ctx.fill();

    requestAnimationFrame(animate);

}

animate();
