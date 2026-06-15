// =======================================
// HERO PARTICLE ENGINE V1
// Paras Poswal Research Website
// =======================================

const canvas = document.getElementById("heroCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


// -------------------------------
// Particle Class
// -------------------------------

class Particle {

    constructor(){

        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;

        this.vx=(Math.random()-0.5)*0.4;
        this.vy=(Math.random()-0.5)*0.4;

        this.radius=2+Math.random()*2;

        this.alpha=0.4+Math.random()*0.6;

    }

    update(){

        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x<0) this.x=canvas.width;
        if(this.x>canvas.width) this.x=0;

        if(this.y<0) this.y=canvas.height;
        if(this.y>canvas.height) this.y=0;

    }

    draw(){

        ctx.beginPath();

        ctx.fillStyle=`rgba(56,189,248,${this.alpha})`;

        ctx.shadowBlur=15;

        ctx.shadowColor="#38bdf8";

        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

        ctx.fill();

    }

}


// -------------------------------
// Create particles
// -------------------------------

const particles=[];

const TOTAL_PARTICLES=200;

for(let i=0;i<TOTAL_PARTICLES;i++){

    particles.push(new Particle());

}


// -------------------------------
// Animation Loop
// -------------------------------
function drawConnections(){

    const maxDistance = 80;

    for(let i=0;i<particles.length;i++){

        for(let j=i+1;j<particles.length;j++){

            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;

            const d = Math.sqrt(dx*dx + dy*dy);

            if(d < maxDistance){

                const alpha = (1 - d/maxDistance) * 0.25;

                ctx.beginPath();

                ctx.strokeStyle = `rgba(56,189,248,${alpha})`;

                ctx.lineWidth = 1;

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
function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Update particles
    particles.forEach(p=>{
        p.update();
    });

    // Draw bonds first
    drawConnections();

    // Draw particles on top
    particles.forEach(p=>{
        p.draw();
    });

    requestAnimationFrame(animate);

}
animate();
