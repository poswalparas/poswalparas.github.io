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

        let dx=this.tx-this.x;
        let dy=this.ty-this.y;

        this.vx+=dx*0.015;
        this.vy+=dy*0.015;

        this.vx*=0.92;
        this.vy*=0.92;

        this.x+=this.vx;
        this.y+=this.vy;

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle=this.color;

        ctx.shadowBlur=18;
        ctx.shadowColor=this.color;

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

    const a = 32;

    const cols = 11;
    const rows = 10;

    let index = 0;

    const centerX = canvas.width * 0.67;
    const centerY = canvas.height * 0.50;

    const totalWidth = (cols-1)*a + a/2;
    const totalHeight = (rows-1)*Math.sqrt(3)/2*a;

    const startX = centerX - totalWidth/2;
    const startY = centerY - totalHeight/2;

    for(let r=0;r<rows;r++){

        for(let c=0;c<cols;c++){

            if(index>=particles.length) return;

            particles[index].tx =
                startX +
                c*a +
                (r%2)*(a/2);

            particles[index].ty =
                startY +
                r*(Math.sqrt(3)/2*a);

            index++;

        }

    }

}
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
// ==========================================
// Animation
// ==========================================

function animate(){

    requestAnimationFrame(animate);

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
