// =====================================================
// Quantum Materials Hero Animation
// Part 1
// =====================================================

const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

function resize(){

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

}

window.addEventListener("resize",resize);

resize();


// ==========================================
// Particle
// ==========================================

class Particle{

    constructor(){

        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;

        this.tx=this.x;
        this.ty=this.y;

        this.vx=0;
        this.vy=0;

        this.radius=2+Math.random()*1.5;

        this.type = 0;
        this.color = "#55ccff";

    }

   update(){

    if(mode=="assemble"){

        let dx=this.tx-this.x;
        let dy=this.ty-this.y;

        this.vx+=dx*0.015;
        this.vy+=dy*0.015;

    }

    else{

        this.vx*=1.002;
        this.vy*=1.002;

    }

    this.vx*=0.92;
    this.vy*=0.92;

    this.x+=this.vx;
    this.y+=this.vy;

}

    draw(){

        ctx.beginPath();

       if(this.type==0){

    ctx.fillStyle="#4FC3F7";

}

else if(this.type==1){

    ctx.fillStyle="#C084FC";

}

else{

    ctx.fillStyle="#FACC15";

}

        ctx.shadowBlur=18;
        ctx.shadowColor=ctx.fillStyle;

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


// ==========================================
// Create Particles
// ==========================================

const particles=[];

const TOTAL=220;

for(let i=0;i<TOTAL;i++){

    particles.push(

        new Particle()

    );

}
// ==========================================
// Hexagonal Crystal
// ==========================================

function createHexagonalLattice(){

    const a = 34;

    const cols = 8;
    const rows = 7;

    let index = 0;

    const cx = canvas.width*0.68;
    const cy = canvas.height*0.50;

    const startX = cx - cols*a*0.55;
    const startY = cy - rows*a*0.45;

    for(let r=0;r<rows;r++){

        for(let c=0;c<cols;c++){

            if(index>=particles.length) return;

            //------------------------
            // Metal atom
            //------------------------

            particles[index].tx =
                startX +
                c*a +
                (r%2)*(a/2);

            particles[index].ty =
                startY +
                r*a*0.86;

            particles[index].type=0;

            index++;

            if(index>=particles.length) return;

            //------------------------
            // Upper atom
            //------------------------

            particles[index].tx =
                startX +
                c*a +
                (r%2)*(a/2) +
                a*0.5;

            particles[index].ty =
                startY +
                r*a*0.86 -
                a*0.28;

            particles[index].type=1;

            index++;

            if(index>=particles.length) return;

            //------------------------
            // Lower atom
            //------------------------

            particles[index].tx =
                startX +
                c*a +
                (r%2)*(a/2) +
                a*0.5;

            particles[index].ty =
                startY +
                r*a*0.86 +
                a*0.28;

            particles[index].type=2;

            index++;

        }

    }

}

createHexagonalLattice();
let mode = "assemble";

let timer = 0;
function drawBonds(){

    const maxDistance = 36;

    ctx.lineWidth = 1.2;

    for(let i=0;i<particles.length;i++){

        for(let j=i+1;j<particles.length;j++){

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const d = Math.sqrt(dx*dx + dy*dy);

            if(d < maxDistance){

                ctx.beginPath();

                ctx.strokeStyle =
                    "rgba(100,210,255," +
                    (1-d/maxDistance)*0.35 +
                    ")";

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();

            }

        }

    }

}
// ==========================================
// Animation
// ==========================================

function animate(){

    requestAnimationFrame(animate);

    ctx.clearRect(
timer++;

if(mode=="assemble" && timer>260){

    explode();

    mode="explode";

    timer=0;

}

if(mode=="explode" && timer>150){

    createHexagonalLattice();

    mode="assemble";

    timer=0;

}
        0,

        0,

        canvas.width,

        canvas.height

    );

  particles.forEach(p=>{

    p.update();

});
function explode(){

    particles.forEach(p=>{

        const angle=Math.random()*Math.PI*2;

        const speed=4+Math.random()*3;

        p.vx=Math.cos(angle)*speed;

        p.vy=Math.sin(angle)*speed;

    });

}
drawBonds();

particles.forEach(p=>{

    p.draw();

});

}

animate();
