'use strict'
const gMouseEvs = ['click', 'mousedown', 'mouseup', 'mouseover', 'mouseleave', 'mousemove']
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

// Listen for touch / mouse events
function initHandlers() {
    gMouseEvs.forEach(evName => {
        // document.querySelector('.mouse').addEventListener('click', () => {
        //     console.log('click')
        // })
        document.querySelector('.mouse').addEventListener(evName, handleMouse)
        document.querySelector('.both').addEventListener(evName, handleMouse)
    })
    gTouchEvs.forEach(evName => {
        document.querySelector('.touch').addEventListener(evName, handleTouch)
        document.querySelector('.both').addEventListener(evName, handleTouch)
    })
}

// Handle mouse events
function handleMouse(ev) {
    console.log('handleMouse')
    if (ev.target.className.includes('pos-container') || ev.type !== 'click') return
    console.log(ev);
    renderPos(ev, 'mouse')
}

// Handle touch events
function handleTouch(ev) {
    console.log(ev)
    if (ev.target.className.includes('pos-container') || ev.type !== 'touchstart') return
    ev.preventDefault()
    renderPos(ev, 'touch')
}

function renderPos(ev, evClass) {
    var pos = getEvPos(ev)
    if (ev.type === 'touchstart') ev = ev.changedTouches[0]
    var elPosIcon = document.querySelector(`.${evClass} .pos-icon`)
    elPosIcon.classList.remove('hide')
    elPosIcon.style.left = pos.x - 10 + 'px' // Substract pos-icon width and height to get accurate position
    elPosIcon.style.top = pos.y - 30 + 'px'
    const { screenX, screenY, pageX, pageY, clientX, clientY } = ev
    var elPos = document.querySelector(`.${evClass} .pos-container`)
    elPos.querySelector('.offset').innerText = `( ${parseInt(pos.x)}, ${parseInt(pos.y)} )`
    elPos.querySelector('.screen').innerText = `( ${parseInt(screenX)}, ${parseInt(screenY)} )`
    elPos.querySelector('.page').innerText = `( ${parseInt(pageX)}, ${parseInt(pageY)} )`
    elPos.querySelector('.client').innerText = `( ${parseInt(clientX)}, ${parseInt(clientY)} )`
}

// Get event position depending on event type (mouse / touch)
function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - (ev.target.offsetLeft + ev.target.clientLeft), // clientLeft, clientTop is the element's border width
            y: ev.pageY - (ev.target.offsetTop + ev.target.clientTop)
        }
    }
    return pos
}