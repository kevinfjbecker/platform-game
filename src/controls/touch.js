
export default class TouchController {

    ///////////////////////////////////////////////////////////////////////////

    constructor(canvas, analogControl, buttonControl) {

        this.touchesTargets = []

        this.canvas = canvas
        this.analogControl = analogControl
        this.buttonControl = buttonControl

        this.canvas.addEventListener('touchstart', this.handleTouchStart)
        this.canvas.addEventListener("touchmove", this.handleTouchMove)
        canvas.addEventListener("touchend", this.handleTouchEnd)

    }

    ///////////////////////////////////////////////////////////////////////////

    draw = (context) => {
        this.analogControl.draw(context)
        this.buttonControl.draw(context)
    }

    ///////////////////////////////////////////////////////////////////////////

    handleTouchEnd = (event) => {

        event.preventDefault()

        const endingTouchIdentifiers =
            [...event.changedTouches].map(t => t.identifier)

        endingTouchIdentifiers.forEach((touchIdentifier) => {
            const touchTarget = this.touchesTargets.find(
                (tt) => tt.touchIdentifier === touchIdentifier
            )
            touchTarget?.target.release()
        })

        this.touchesTargets =
            this.touchesTargets
                .filter(tt =>
                    !endingTouchIdentifiers
                        .some(eti => eti === tt.touchIdentifier)
                )

    }

    handleTouchMove = (event) => {

        event.preventDefault(); // required semicolon

        // there's got to be a better way to do this
        [...event.changedTouches].forEach(touch => {
            const touchTarget = this.touchesTargets.find(
                (tt) => tt.touchIdentifier === touch.identifier
            )

            if (touchTarget?.drag) {
                const target = touchTarget.target
                target.input({ x: touch.clientX, y: touch.clientY })
            }

        })

    }

    handleTouchStart = (event) => {

        event.preventDefault()

        const touch = event.changedTouches[0];
        const x = touch.clientX
        const y = touch.clientY

        if (this.analogControl.contact({ x, y })) {

            this.touchesTargets.push({
                target: this.analogControl,
                touchIdentifier: touch.identifier,
                drag: true
            })

            this.analogControl.input({ x: touch.clientX, y: touch.clientY })

        } else if (this.buttonControl.contact({ x, y })) {

            this.touchesTargets.push({
                target: this.buttonControl,
                touchIdentifier: touch.identifier,
            })

            this.buttonControl.input({ x, y })
        }
    }

}