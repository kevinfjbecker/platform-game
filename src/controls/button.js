export const button = (center) => {

    ///////////////////////////////////////////////////////////////////

    const buttonWidth = 60
    const buttonHeight = 60
    const buttonRadii = [10]
    const buttonX = center.x - buttonWidth / 2
    const buttonY = center.y - buttonHeight / 2

    let idle = true

    ///////////////////////////////////////////////////////////////////

    const contact = (contactPoint) => {
        return (
            contactPoint.x < buttonX + buttonWidth &&
            contactPoint.x > buttonX &&
            contactPoint.y < buttonY + buttonHeight &&
            contactPoint.y > buttonY
        )
    }

    const draw = (ctx) => {

        ctx.save()

        if (idle) {

            ctx.strokeStyle = 'white'
            ctx.fillStyle = 'rgba(0, 0, 0, 0)'
            ctx.lineWidth = 1

            ctx.beginPath()
            ctx.roundRect(
                buttonX,
                buttonY,
                buttonWidth,
                buttonHeight,
                buttonRadii
            )
            ctx.stroke()
            ctx.fill()
            ctx.closePath()

        } else {

            ctx.strokeStyle = 'white'
            ctx.fillStyle = 'rgba(0, 0, 0, 0)'
            ctx.lineWidth = 2

            ctx.beginPath()
            ctx.roundRect(
                buttonX,
                buttonY,
                buttonWidth,
                buttonHeight,
                buttonRadii
            )
            ctx.stroke()
            ctx.fill()
            ctx.closePath()

        }

        ctx.restore()

    }

    const getState = () => ! idle

    const input = (contactPoint) => {
        idle = false
    }

    const release = () => {
        idle = true
    }

    ///////////////////////////////////////////////////////////////////

    return {
        contact,
        draw,
        getState,
        input,
        release
    }

}