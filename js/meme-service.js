'use strict';

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['animal'] }
];

var gTextPositions = [
    { x: 250, y: 50 },
    { x: 250, y: 450 },
    { x: 250, y: 250 }
]

function align(direction) {
    switch (direction) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].align = 'start';
            gTextPositions[gMeme.selectedLineIdx].x = 40;
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].align = 'center';
            gTextPositions[gMeme.selectedLineIdx].x = 250;
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].align = 'end';
            gTextPositions[gMeme.selectedLineIdx].x = 460;
            break;
    }
    drawMeme(gMeme.selectedImgId);
}

function moveLine(direction) {
    if (direction === 'up') {
        gTextPositions[gMeme.selectedLineIdx].y -= 5;
    } else if (direction === 'down') {
        gTextPositions[gMeme.selectedLineIdx].y += 5;
    }
    drawMeme(gMeme.selectedImgId);
}


function switchLines() {

}

function addLine() {
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx);
    var newLine = gMeme.lines.slice(gMeme.lines.length - 1, 1)[0];
    console.log(newLine);
    newLine.txt = '';
    newLine.align='center';
    gMeme.lines.push(newLine);
}

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 50,
            align: 'center',
            color: document.querySelector('input[name=text-fill-color]').value,
            strokeColor: document.querySelector('input[name=text-stroke-color]').value,
            font: document.querySelector('.font-selector').value,
        }
    ]
}

// var text = document.querySelector('input[name=text]').value;

function drawText(text, x, y) {
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    gCtx.lineWidth = 2;
    gCtx.fillStyle = `${currLine.color}`;
    gCtx.strokeStyle = `${currLine.strokeColor}`;
    gCtx.font = `${currLine.size}px ${currLine.font}`;
    gCtx.textAlign = `${currLine.align}`;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
    drawMeme(gMeme.selectedImgId);
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

function update(changedItem){
if (changedItem==='color') gMeme.lines[gMeme.selectedLineIdx].color=document.querySelector('input[name=text-color]').value;
if (changedItem==='stroke') gMeme.lines[gMeme.selectedLineIdx].strokeColor=document.querySelector('input[name=text-stroke-color]').value;
    drawMeme(gMeme.selectedImgId)
}

function drawMeme(imgId) {
    const img = new Image()
    img.src = `./img/${imgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) //img,x,y,xend,yend
        drawText(gMeme.lines[0].txt, gTextPositions[0].x, gTextPositions[0].y);
        if (gMeme.lines.length === 2) drawText(gMeme.lines[1].txt, gTextPositions[1].x, gTextPositions[1].y);
        if (gMeme.lines.length === 3) drawText(gMeme.lines[2].txt, gTextPositions[2].x, gTextPositions[2].y);
    }
}