'use strict';

// var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics', 'man'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['animal', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['animal'] },
    { id: 5, url: 'img/5.jpg', keywords: ['cute', 'funny'] },
    { id: 6, url: 'img/6.jpg', keywords: ['man'] },
    { id: 7, url: 'img/7.jpg', keywords: ['cute', 'funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['man'] },
    { id: 9, url: 'img/9.jpg', keywords: ['cute', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['politics', 'funny', 'man'] },
    { id: 11, url: 'img/11.jpg', keywords: ['man', 'sport'] },
    { id: 12, url: 'img/12.jpg', keywords: ['man'] },
    { id: 13, url: 'img/13.jpg', keywords: ['man'] },
    { id: 14, url: 'img/14.jpg', keywords: ['man'] },
    { id: 15, url: 'img/15.jpg', keywords: ['man'] },
    { id: 16, url: 'img/16.jpg', keywords: ['man'] },
    { id: 17, url: 'img/17.jpg', keywords: ['man', 'politics'] },
    { id: 18, url: 'img/18.jpg', keywords: ['cute'] }
];

var gTextPositions = [
    { x: 250, y: 75 },
    { x: 250, y: 500 },
    { x: 250, y: 300 }
]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 50,
            align: 'center',
            color: 'white',
            strokeColor: 'black',
            font: 'impact',
            x: 250,
            y: 75
        },
    ]
}
function align(direction) {
    switch (direction) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].align = 'start';
            gMeme.lines[gMeme.selectedLineIdx].x = 40;
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].align = 'center';
            gMeme.lines[gMeme.selectedLineIdx].x = 250;
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].align = 'end';
            gMeme.lines[gMeme.selectedLineIdx].x = 460;
            break;
    }
    drawMeme(gMeme.selectedImgId);
}

function moveLine(direction) {
    if (direction === 'up') {
        gMeme.lines[gMeme.selectedLineIdx].y -= 5;
    } else if (direction === 'down') {
        gMeme.lines[gMeme.selectedLineIdx].y += 5;
    }
    drawMeme(gMeme.selectedImgId);
}

// function markCurrLine() {
//     drawRect(gMeme.lines[gMeme.selectedLineIdx].x, gMeme.lines[gMeme.selectedLineIdx].y)
//     gTextPositions[gMeme.selectedLineIdx]
// }

// function drawRect(x, y) {
//     gCtx.beginPath();
//     gCtx.rect(x - 240, y - gMeme.lines[gMeme.selectedLineIdx].size, 530, gMeme.lines[gMeme.selectedLineIdx].size + 10);
//     gCtx.strokeStyle = 'yellow';
//     gCtx.stroke();
// }

function switchLines() {
    if (gMeme.selectedLineIdx === (gMeme.lines.length) - 1) {
        gMeme.selectedLineIdx = 0;
    } else {
        gMeme.selectedLineIdx++;
    }
    renderMeme()
    document.querySelector('input[name=text]').value = gMeme.lines[gMeme.selectedLineIdx].txt;
    // markCurrLine();
}

function addLine() {
    if (gMeme.lines.length > 3) return;
    createNewLine();
    gMeme.selectedLineIdx++;
    document.querySelector('input[name=text]').value = null;
    renderMeme();
    // markCurrLine();///////////////////////////////////////////////still have bugs here incase I erase a line or swich line before adding additional line( didn't have time to fix it)
}

function renderMeme() {
    // clearCanvas();
    drawMeme(gMeme.selectedImgId)
}

// function clearCanvas() {
//     gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
// }

function createNewLine() {
    var newLine = {
        txt: '',
        size: 50,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        font: 'impact',
        x: 250,
        y: gTextPositions[gMeme.lines.length].y,
        isDragging: false
    }
    gMeme.lines.push(newLine);
}

function drawText(text, x, y, line) {
    gCtx.lineWidth = 2;
    gCtx.fillStyle = `${line.color}`;
    gCtx.strokeStyle = `${line.strokeColor}`;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = `${line.align}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}
function updateTxt(elTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = elTxt;
}

function deleteLine() {
    document.querySelector('input[name=text]').value = null;
    gMeme.lines[gMeme.selectedLineIdx].txt = '';
    renderMeme();
}

//    function getImgIdxById(imgId) {
//     var imgIdx = gImgs.findIndex(function (currImg) {
//         return (currImg.id.toString() === imgId);
//     });
//     gCurrImgIdx=imgIdx;
//     return imgIdx;
// }
function changeFontSize(sign) {
    var newFontSize = (sign === 'plus') ? gMeme.lines[gMeme.selectedLineIdx].size + 5 : gMeme.lines[gMeme.selectedLineIdx].size - 5;
    gMeme.lines[gMeme.selectedLineIdx].size = newFontSize;
    drawMeme(gMeme.selectedImgId)

}


///////////there is a bug here - need to fix it
function updateColor(changedItem, color) {
    if (changedItem === 'color') gMeme.lines[gMeme.selectedLineIdx].color = color;
    if (changedItem === 'stroke') gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;

    renderMeme();
}

function drawMeme(imgId) {
    const img = new Image();
    img.src = `./img/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        //on CR please explain to me why when using the next commented lines instead of "foreach", the addition of a third line erases the seconde line?
        // drawText(gMeme.lines[0].txt, gTextPositions[0].x, gTextPositions[0].y);
        // if (gMeme.lines.length === 2) drawText(gMeme.lines[1].txt, gMeme.lines[1].x, gMeme.lines[1].y);
        // if (gMeme.lines.length === 3) drawText(gMeme.lines[2].txt, gMeme.lines[2].x, gMeme.lines[2].y);
        gMeme.lines.forEach((line) => {
            drawText(line.txt, line.x, line.y, line);
        })
    }
}