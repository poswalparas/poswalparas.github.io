/* ==========================================================
   Quantum Materials Hero Animation
   Part 1 - Engine Core
   Paras Poswal Research Website
========================================================== */

const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

// --------------------------------------------
// Configuration
// --------------------------------------------

const CONFIG = {

    particles: 220,

    background: "#08111f",

    particleColor: "#38bdf8",

    bondColor: "#60a5fa",

    fps: 60,

    mouseRadius: 120,

    connectionDistance: 90

};

// --------------------------------------------
// Canvas Resize
// --------------------------------------------

function resizeCanvas(){

    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );

}

window.addEventListener("resize",resizeCanvas);

resizeCanvas();


// --------------------------------------------
// Mouse
// --------------------------------------------

const mouse={

    x:-9999,
    y:-9999

};

canvas.addEventListener("mousemove",(e)=>{

    const r=canvas.getBoundingClientRect();

    mouse.x=e.clientX-r.left;

    mouse.y=e.clientY-r.top;

});

canvas.addEventListener("mouseleave",()=>{

    mouse.x=-9999;
    mouse.y=-9999;

});


// --------------------------------------------
// Utilities
// --------------------------------------------

function random(min,max){

    return Math.random()*(max-min)+min;

}

function distance(ax,ay,bx,by){

    return Math.hypot(ax-bx,ay-by);

}


// --------------------------------------------
// Particle
// --------------------------------------------

class Particle{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=random(0,canvas.clientWidth);

        this.y=random(0,canvas.clientHeight);

        this.vx=random(-0.25,0.25);

        this.vy=random(-0.25,0.25);

        this.radius=random(1.8,3.8);

        this.alpha=random(.4,.9);

        this.tx=this.x;

        this.ty=this.y;

        this.mode="free";

    }

    update(){

        if(this.mode==="free"){

            this.x+=this.vx;

            this.y+=this.vy;

        }

        if(this.mode==="assemble"){

            this.x+=(this.tx-this.x)*0.06;

            this.y+=(this.ty-this.y)*0.06;

        }

        if(this.x<0)this.x=canvas.clientWidth;

        if(this.x>canvas.clientWidth)this.x=0;

        if(this.y<0)this.y=canvas.clientHeight;

        if(this.y>canvas.clientHeight)this.y=0;

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle=`rgba(56,189,248,${this.alpha})`;

        ctx.shadowBlur=20;

        ctx.shadowColor="#38bdf8";

        ctx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI*2

        );

        ctx.fill();

    }

}

// --------------------------------------------
// Create particles
// --------------------------------------------

const particles=[];

for(let i=0;i<CONFIG.particles;i++){

    particles.push(

        new Particle()

    );

}
