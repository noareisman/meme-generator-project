'use strict';

var gElAbout = document.querySelector('.creator');
var gElMemeGenerator = document.querySelector('.meme-generator-container');
var gElMemeGallery = document.querySelector('.saved-memes-gallery-container');
var gElGallery = document.querySelector('.img-gallery-container');
var gElCanvas;
var gCtx;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCurrImgList;

function init() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');
    gCtx.font = 'impact';
    gCurrImgList = gImgs;
    loadImgs();
    recreateSavedMemeGallery();
    loadSavedMemes();
    renderFilterNav();
    addListeners();
}

function loadImgs() {
    var strHTML = '';
    var elImgContainer = document.querySelector('.img-grid-container');
    for (var i = 0; i < gCurrImgList.length; i++) {
        strHTML += `<article>
                        <img class="img-item" id="${gCurrImgList[i].id}" src="img/${gCurrImgList[i].id}.jpg" onclick="onSelectImg(this)">
                    </article>`
    }
    elImgContainer.innerHTML = strHTML;
}

function loadSavedMemes(){
    var strHTML = '';
    var elImgContainer = document.querySelector('.saved-meme-grid-container');
    for (var i = 0; i < gSavedMemes.length; i++) {
        strHTML += `<article>
                        <img class="img-item" id="${gSavedMemes[i].id}" src="${gSavedMemes[i].img}" onclick="onSelectSavedMeme(this)">
                    </article>`
    }
    elImgContainer.innerHTML = strHTML;

}
function onSelectSavedMeme(elMeme) {
    var idx=getMemeIdxById(elMeme.id);
    getMemeByIdx(idx);
    onOpenMemeGenerator();
    renderMeme();
}


function onSearch(filter) {
    var val=filter.value;
    gCurrImgList = gImgs.filter(img => img.keywords.includes(val));
    gKeywordsMap[0][val]+=1;
    console.log(gKeywordsMap[0]);
    console.log(gKeywordsMap);
    _saveKeywordMapToStorage()
    renderFilterNav();
    loadImgs();
}

function renderFilterNav(){
    var keywordsMap=getSavedKeywordMap()[0];
    var keywords=Object.keys(keywordsMap);
    var strFilters='';
    var strFilterWordsDisplay='';
    keywords.forEach((keyword)=>{
        strFilters+=`<option value="${keyword}">`;
        strFilterWordsDisplay+=`<button value="${keyword}" style="font-size:${18+keywordsMap[keyword]*5}px" onclick="onSearch(this)">${keyword}</button>`
    });
    document.getElementById('filters').innerHTML=strFilters;
    document.querySelector('.filter-words').innerHTML=strFilterWordsDisplay;
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDownload(elLink) {
    download(elLink);
}

function onShare(elForm, event) {
    share(elForm, event);
}

function onSelectImg(elImg) {
    createMeme();
    gMeme.selectedImgId = elImg.id;
    onOpenMemeGenerator();
    renderMeme();
}

function onSavedMemesGallery(){
    gElMemeGenerator.style = 'display: none';
    gElGallery.style = 'display: none';
    gElAbout.style = 'display: none';
    gElMemeGallery.style='display:flex';
}

function onOpenMemeGenerator() {
    gElMemeGenerator.style = 'display: flex';
    gElGallery.style = 'display: none';
    gElAbout.style = 'display: none';
    gElMemeGallery.style='display:none';
}

function onOpenGallery() {
    gElMemeGenerator.style = 'display: none';
    gElGallery.style = 'display: flex';
    gElAbout.style = 'display: flex';
    gElMemeGallery.style='display:none';
}

function onAdd() {
    addLine();
}

function onDelete() {
    deleteLine();
}

function onSwitchLines() {
    switchLines();
}
function onUpdateTxt(elTxt) {
    updateTxt(elTxt);
    renderMeme();
}


function onMoveLine(direction) {
    moveLine(direction);
}


function onAlign(direction) {
    align(direction);
}

function onChangeFontSize(sign) {
    changeFontSize(sign);
}

function onUpdateColor(changedItem, color) {
    gCtx.save();
    updateColor(changedItem, color);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    // if (!isLineClicked(pos)) return
    gMeme.lines[gMeme.selectedLineIdx].isDragging = true;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    if (gMeme.lines[gMeme.selectedLineIdx].isDragging) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        
        gMeme.lines[gMeme.selectedLineIdx].x += dx;
        gMeme.lines[gMeme.selectedLineIdx].y += dy;
        gStartPos = pos;
        renderMeme();
    }
}

function onUp() {
    gMeme.lines[gMeme.selectedLineIdx].isDragging = false;
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault();
        ev = ev.changedTouches[0];
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos;
}

function onSave(ev){
    ev.preventDefault();
    save();
}


