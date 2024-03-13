const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerposition = {
    x: undefined,
    y: undefined,
}

const giftposition = {
    x: undefined,
    y: undefined,
}   

let enemiesPositions = [];

window.addEventListener('load', startGame);
window.addEventListener('resize', setCanvasSize);



function setCanvasSize() {
    if(window.innerHeight > window.innerWidth){ 
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = (canvasSize / 10);

    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map,mapRows,mapRowCols});
    enemiesPositions=[];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1.2);
            const posY = elementsSize * (rowIndex + 0.85);

            if(col === 'O') {
                    if(!playerposition.x && !playerposition.y) {
                        playerposition.x = posX;
                        playerposition.y = posY;
                    }
            }else if(col === 'I') {
                giftposition.x = posX;
                giftposition.y = posY;
            }else if(col === 'X') {
                enemiesPositions.push({
                    x: posX,
                    y: posY,
                });
            }
            game.fillText(emoji, posX, posY);
        });
    });
    
    movePlayer();
    /*for(let row=1;row<=10;row++) {
        for(let column=1;column<=10;column++) {
            game.fillText(emojis[mapRowCols[row-1][column-1]],elementsSize*column,elementsSize*row);
        }
    }*/
}

function movePlayer() {

    const giftCollisionX = playerposition.x.toFixed(2) === giftposition.x;
    const giftCollisionY = playerposition.y.toFixed(2) === giftposition.y;       
    const giftCollision = giftCollisionX && giftCollisionY;
    if(giftCollision) {
        console.log('Subiste de Nivel')
    }

    const enemyCollision = enemiesPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) === playerposition.x;
        const enemyCollisionY = enemy.y.toFixed(2) === playerposition.y;
        return enemyCollisionX && enemyCollisionY;
    });
    if(enemyCollision) {
        console.log('Chocaste contra un enemigo');
    }
    game.fillText(emojis['PLAYER'], playerposition.x, playerposition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if(event.key === 'ArrowUp') moveUp();
    else if(event.key === 'ArrowLeft') moveLeft();
    else if(event.key === 'ArrowRight') moveRight();
    else if(event.key === 'ArrowDown') moveDown();
}

function moveUp() {
    console.log('Me quiero mover hacia arriba');
    if((playerposition.y-elementsSize) < elementsSize) {
         console.log('OUT');
    }else {
        playerposition.y -= elementsSize;
        startGame();
    }
    
}

function moveLeft() {
    console.log('Me quiero mover hacia izquierda');
    if((playerposition.x-elementsSize) < elementsSize) {
        console.log('OUT');
   }else {
     playerposition.x -= elementsSize;
     startGame();
   }
    
}

function moveRight() {
    console.log('Me quiero mover hacia derecha');
    if((playerposition.x+elementsSize) > canvasSize) {
        console.log('OUT');
    }else {
      playerposition.x += elementsSize;
      startGame();
    }
    
}

function moveDown() {
    console.log('Me quiero mover hacia abajo');
    if((playerposition.y+elementsSize) > canvasSize) {
        console.log('OUT');
    }else {
        playerposition.y += elementsSize;
        startGame();
    }
    
}