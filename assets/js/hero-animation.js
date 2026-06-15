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
/* ==========================================================
   PART 2
   Crystal Generator + State Engine
========================================================== */

// --------------------------------------------
// Animation State
// --------------------------------------------

let sceneState = "FREE";

let stateTimer = 0;


// --------------------------------------------
// Build Hexagonal Lattice
// --------------------------------------------

const lattice=[];

function generateHexCrystal(){

    lattice.length=0;

    const spacing=28;

    const rows=10;

    const cols=14;

    const cx=canvas.clientWidth*0.55;
    const cy=canvas.clientHeight*0.50;

    for(let r=0;r<rows;r++){

        for(let c=0;c<cols;c++){

            let x=c*spacing;

            if(r%2)x+=spacing/2;

            let y=r*spacing*0.86;

            lattice.push({

                x:cx-cols*spacing/2+x,

                y:cy-rows*spacing*0.43+y

            });

        }

    }

}

generateHexCrystal();

window.addEventListener("resize",generateHexCrystal);


// --------------------------------------------
// Assemble Particles
// --------------------------------------------

function assembleCrystal(){

    for(let i=0;i<particles.length;i++){

        if(i<lattice.length){

            particles[i].tx=lattice[i].x;
            particles[i].ty=lattice[i].y;

            particles[i].mode="assemble";

        }

    }

}


// --------------------------------------------
// Scatter Particles
// --------------------------------------------

function scatterParticles(){

    particles.forEach(p=>{

        p.mode="free";

        p.vx=random(-0.4,0.4);

        p.vy=random(-0.4,0.4);

    });

}


// --------------------------------------------
// Bond Drawing
// --------------------------------------------

function drawCrystalConnections(){

    const maxDistance=34;

    ctx.lineWidth=1.4;

    for(let i=0;i<lattice.length;i++){

        for(let j=i+1;j<lattice.length;j++){

            const dx=lattice[i].x-lattice[j].x;
            const dy=lattice[i].y-lattice[j].y;

            const d=Math.sqrt(dx*dx+dy*dy);

            if(d<maxDistance){

                ctx.beginPath();

                ctx.strokeStyle="rgba(56,189,248,.18)";

                ctx.moveTo(

                    lattice[i].x,

                    lattice[i].y

                );

                ctx.lineTo(

                    lattice[j].x,

                    lattice[j].y

                );

                ctx.stroke();

            }

        }

    }

}


// --------------------------------------------
// Scene State Machine
// --------------------------------------------

function updateScene(){

    stateTimer++;

    if(sceneState==="FREE"){

        if(stateTimer>220){

            sceneState="ASSEMBLE";

            stateTimer=0;

            assembleCrystal();

        }

    }

    else if(sceneState==="ASSEMBLE"){

        if(stateTimer>260){

            sceneState="HOLD";

            stateTimer=0;

        }

    }

    else if(sceneState==="HOLD"){

        if(stateTimer>180){

            sceneState="FREE";

            stateTimer=0;

            scatterParticles();

        }

    }

}
