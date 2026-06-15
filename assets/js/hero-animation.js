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

        this.color="#55ccff";

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

    const spacing = 28;

    const cols = 13;
    const rows = 11;

    let index = 0;

    const offsetX = canvas.width * 0.53;
    const offsetY = canvas.height * 0.18;

    for(let r=0;r<rows;r++){

        for(let c=0;c<cols;c++){

            if(index >= particles.length) return;

            const x =
                offsetX +
                c * spacing +
                (r % 2) * (spacing / 2);

            const y =
                offsetY +
                r * spacing * 0.86;

            particles[index].tx = x;
            particles[index].ty = y;

            index++;

        }

    }

}
createHexagonalLattice();
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

        p.draw();

    });

}

animate();
