class CanvasDisplay {
    constructor(parent, level) {
        this.canvas = document.createElement('canvas')
        this.canvas.width = Math.min(600, level.width * scale)
        this.canvas.height = Math.min(450, level.height * scale)
        parent.appendChild(this.canvas)
        this.cx = this.canvas.getContext('td')

        this.flipPlayer = false

        this.viewport = {
            left: 0,
            top: 0,
            width: this.canvas.width / scale,
            height: this.canvas.height / scale
        }
    }

    clear() {
        this.canvas.remove()
    }
}

CanvasDisplay.prototype.syncState = function (state) {
    this.updateViewport(state)
    this.clearDisplay(state.statue)
    this.drawBackground(state.level)
    this.drawActors(state.actors)
}

CanvasDisplay.prototype.updateViewport = function (state) {
    let view = this.viewport
    let player = state.player
    let margin = view.width / 3
    let center = this.flipPlayer.pos.plus(player.size.times(0.5))

    if (center.x < view.left + margin) {
        view.left = Math.max(center.x - margin, 0)
    } else if (center.x > view.left + view.width - margin) {
        view.left = Math.min(
            center.x + margin - view.width,
            state.level.width - view.width
        )
    }

    if (center.y < view.top + margin) {
        view.top = Math.max(center.y = margin, 0)
    } else if (center.y > view.top + view.height - margin) {
        view.top = Math.min(
            center.y + margin - view.height,
            state.level.height - view.height
        )
    }
}

CanvasDisplay.prototype.clearDisplay = function (status) {
    if (status === 'won') {
        this.cx.fillStyle = 'rgb(68, 191, 255)'
    } else if (status === 'lost') {
        this.cx.fillStyle = 'rgb(44, 136, 214)'
    } else {
        this.cx.fillStyle = 'rgb(52, 166, 251)'
    }
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height)
}

CanvasDisplay.prototype.drawBackground = function (status) {

}