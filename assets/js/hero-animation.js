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

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.tx = this.x;
        this.ty = this.y;

        this.vx=0;
        this.vy=0;

        this.radius=2+Math.random()*1.5;

        this.type = 0;
        this.color = "#55ccff";
        this.phase = Math.random() * Math.PI * 2;
        this.amp = 0.8 + Math.random() * 0.5;

    }

   update(){

    if(mode=="assemble"){

        let dx = this.tx - this.x;
        let dy = this.ty - this.y;

        this.vx+=dx*0.015;
        this.vy+=dy*0.015;

    }

    else{

        this.vx*=1.002;
        this.vy*=1.002;

    }

    this.vx*=0.92;
    this.vy*=0.92;

    this.x += this.vx;
    this.y += this.vy;

}

draw(){

    const t = performance.now() * 0.002;

    const px =
    this.x + Math.cos(t + this.phase) * this.amp;

const py =
    this.y + Math.sin(t + this.phase) * this.amp;
    
    let color;

    if(this.type==0){

        color="#4FC3F7";      // Metal

    }
    else if(this.type==1){

        color="#C084FC";      // Upper atom

    }
    else{

        color="#FACC15";      // Lower atom

    }

    // ==========================
    // Outer glow
    // ==========================

    ctx.save();

    ctx.globalAlpha=0.12;

    ctx.beginPath();

    ctx.fillStyle=color;

    ctx.arc(
        px,
        py,
        this.radius*4,
        0,
        Math.PI*2
    );

    ctx.fill();

    // ==========================
    // Middle glow
    // ==========================

    ctx.globalAlpha=0.30;

    ctx.beginPath();

    ctx.arc(
        px,
        py,
        this.radius*2.2,
        0,
        Math.PI*2
    );

    ctx.fill();

    // ==========================
    // Main atom
    // ==========================

    ctx.globalAlpha=1;

    ctx.shadowBlur=20;

    ctx.shadowColor=color;

    const gradient = ctx.createRadialGradient(

        px-this.radius*0.35,
        py-this.radius*0.35,
        this.radius*0.2,

        px,
        py,
        this.radius

    );

    gradient.addColorStop(0,"#ffffff");
    gradient.addColorStop(0.25,color);
    gradient.addColorStop(1,"#0b1220");

    ctx.fillStyle=gradient;

    ctx.beginPath();

    ctx.arc(
        px,
        py,
        this.radius,
        0,
        Math.PI*2
    );

    ctx.fill();

    // ==========================
    // Specular highlight
    // ==========================

    ctx.shadowBlur=0;

    ctx.beginPath();

    ctx.fillStyle="rgba(255,255,255,0.75)";

    ctx.arc(

        px-this.radius*0.28,

        py-this.radius*0.28,

        this.radius*0.25,

        0,

        Math.PI*2

    );

    ctx.fill();

    ctx.restore();

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
let currentStructure = 0;
// ==========================================
// Hexagonal Crystal
// ==========================================

function createMoS2(){

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

createMoS2();
function nextStructure(){

        createMoS2();

}
let mode = "assemble";

let timer = 0;
// ==============================
// Explosion
// ==============================

function explode(){

    particles.forEach(p=>{

        const angle = Math.random()*Math.PI*2;

        const speed = 4 + Math.random()*3;

        p.vx = Math.cos(angle)*speed;

        p.vy = Math.sin(angle)*speed;

    });

}

function drawBonds(){

    const maxDistance = 38;
    const maxNeighbors = 3;

    ctx.lineWidth = 1.5;

    for(let i=0;i<particles.length;i++){

        let neighbors = 0;

        for(let j=i+1;j<particles.length;j++){

            const t = performance.now()*0.002;

const x1 = x1 +
Math.cos(t+particles[i].phase)*particles[i].amp;

const y1 = y1 +
Math.sin(t+particles[i].phase)*particles[i].amp;

const x2 = x2 +
Math.cos(t+particles[j].phase)*particles[j].amp;

const y2 = y2 +
Math.sin(t+particles[j].phase)*particles[j].amp;

const dx = x1-x2;
const dy = y1-y2;

            const d = Math.sqrt(dx*dx + dy*dy);

            if(d < maxDistance){

                const alpha = (1-d/maxDistance)*0.45;

                const gradient = ctx.createLinearGradient(

                    x1,
                    y1,

                    x2,
                    y2

                );

                gradient.addColorStop(
                    0,
                    `rgba(255,255,255,${alpha*0.15})`
                );

                gradient.addColorStop(
                    0.5,
                    `rgba(90,210,255,${alpha})`
                );

                gradient.addColorStop(
                    1,
                    `rgba(255,255,255,${alpha*0.15})`
                );

                ctx.strokeStyle = gradient;

                ctx.shadowBlur = 8;

                ctx.shadowColor = "#55ccff";

                ctx.beginPath();

                ctx.moveTo(
                    x1,
                    y1
                );

                ctx.lineTo(
                    x2,
                    y2
                );

                ctx.stroke();

                neighbors++;

                if(neighbors>=maxNeighbors){

                    break;

                }

            }

        }

    }

    ctx.shadowBlur = 0;

}
// ==========================================
// Animation
// ==========================================

function animate(){

    requestAnimationFrame(animate);

    timer++;

    if(mode=="assemble" && timer>260){

        explode();

        mode="explode";

        timer=0;

    }

    if(mode=="explode" && timer>150){

        nextStructure();

        mode="assemble";

        timer=0;

    }

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p=>{

        p.update();

    });

    drawBonds();

    particles.forEach(p=>{

        p.draw();

    });

}

animate();
