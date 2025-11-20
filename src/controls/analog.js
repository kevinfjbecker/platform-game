
import {
    add,
    dist,
    length,
    normal,
    scale,
    sub
} from './util.js'

///////////////////////////////////////////////////////////////////////

export const analog = (center) => {

    ///////////////////////////////////////////////////////////////////

    const innerRadius = 30
    const outerRadius = 70

    const maxStickDist = outerRadius - innerRadius

    let idle = true

    let stickX = center.x
    let stickY = center.y

    let stickNormal = { x: 0, y: 0 }

    ///////////////////////////////////////////////////////////////////

    const contact = (contactPoint) => {
        return dist(contactPoint, center) < outerRadius
    }

    const draw = (ctx) => {

        ctx.save()

        ctx.strokeStyle = 'white'
        ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        ctx.lineWidth = idle ? 1 : 2

        ctx.beginPath()
        ctx.arc(
            center.x,
            center.y,
            outerRadius,
            0,
            Math.PI * 2,
            false
        )
        ctx.stroke()
        ctx.closePath()

        ctx.lineWidth = idle ? 2 : 1

        ctx.beginPath()
        ctx.arc(
            stickX,
            stickY,
            innerRadius,
            0,
            Math.PI * 2,
            false
        )
        ctx.stroke()
        ctx.closePath()

        ctx.restore()
    }

    const getState = () => stickNormal

    const input = (contactPoint) => {

        idle = false

        const stickVector = sub(contactPoint, center)
        const stickDist = length(stickVector)

        stickNormal = normal(stickVector)
        const stickScaled = scale(stickNormal, maxStickDist)
        const stickClamped = add(stickScaled, center)

        if (stickDist > maxStickDist) {
            stickX = stickClamped.x
            stickY = stickClamped.y
        }
        else {
            stickX = contactPoint.x
            stickY = contactPoint.y
        }

    }

    const release = () => {
        idle = true
        stickX = center.x
        stickY = center.y
        stickNormal = { x: 0, y: 0 }
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
