const player = document.getElementById('player');
const ground = document.getElementById('ground');
const bats = document.getElementById('bats');
const cloud = document.getElementById('cloud');

let dx = 0;
let dy = 1;
let acceleration = 0.3;
let index = 0;

const draw = ()=>{
    if(dy != 0){
        player.style.backgroundImage = `url('img/templerun/Jump__00${index++}.png')`;
    }else if (dx != 0){
        player.style.backgroundImage = `url('img/templerun/Run__00${index++}.png')`;
    }else{
        player.style.backgroundImage = `url('img/templerun/Idle__00${index++}.png')`;
    }   
    if (index > 9) index = 0;

    requestAnimationFrame(draw);
}

const animate = ()=>{

    if ((player.offsetLeft + player.offsetWidth) > innerWidth){
        dx =0;
        player.style.left =`${innerWidth - player.offsetWidth}px`;
    }else if(player.offsetLeft < 0){
        dx =0;
        player.style.left = '0';
    }

    dy += acceleration;
    
    if((player.offsetTop + player.offsetHeight) > ground.offsetTop){
        dy =0;
        player.style.top = `${ground.offsetTop - player.offsetHeight}px`;
        acceleration = 0;
    }

    player.style.left = `${player.offsetLeft + dx}px`
    player.style.top = `${player.offsetTop + dy}px`

    requestAnimationFrame(animate);
}

addEventListener('keydown', ({key})=>{
    if (key === 'ArrowRight'){
        // index = 0;
        player.classList.remove('turn');
        dx = 10; 
    }else if (key === 'ArrowLeft'){
        // index = 0;
        player.classList.add('turn');
        dx = -10;
    }
});

addEventListener('keypress', ({key})=>{
    if (key === ' '){
        dy = -10;
        acceleration = 0.3;
    }
});

addEventListener('keyup', ({key})=>{
    if (key === 'ArrowRight' || key === 'ArrowLeft'){
        dx = 0;
    }
});

requestAnimationFrame(draw);
requestAnimationFrame(animate);

let bx = 0;
let right = false;

setInterval(()=>{
    bats.style.left = `${bx}px`;
    bx += !right ? 10 : -10;

    if (bats.offsetLeft >= innerWidth){
        right = true;
        bats.style.top = `${Math.random() * 60}vh`;
    }else if (bx + bats.offsetWidth <=0){
        right =false;
        bats.style.top = `${Math.random() * 60}vh`;
    }
},12);


let cx = 0;
let cright = false;

setInterval(()=>{
    cloud.style.left = `${cx}px`;
    cx += !cright ? 5 : -5;

    if (cloud.offsetLeft >= innerWidth){
        cright = true;
        cloud.style.top = `${Math.random() * 35}vh`;
    }else if (bx + cloud.offsetWidth <=0){
        cright =false;
        cloud.style.top = `${Math.random() * 35}vh`;
    }
},60);


// let j = 0;
// let t1 = 0;
// const interval = 1; 

// function repaint(timestamp){
//     if (!t1) t1 = timestamp;
//     const diff = timestamp -t1;
//     if (diff >= (interval * 1000)){
//         t1 = timestamp;
//         console.log('painted', j++);
//     }
//     requestAnimationFrame(repaint);
//     // console.log('timestamp', timestamp);
// }

// requestAnimationFrame(repaint);


