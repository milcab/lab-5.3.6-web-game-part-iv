function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function withArrowKeys(left, bottom, callback) {
        let direction = null;

        let x = left
        let y = bottom

        function moveElement() {
            let maxTop = window.innerHeight - element.height
            if (direction === 'north' && y < maxTop) {
                y++
            }

            const maxRight = window.innerWidth - element.width
            if (direction === 'east' && x < maxRight) {
                x++
            }

            if (direction === 'south' && y > 0) {
                y--
            }

            if (direction === 'west' && x > 0) {
                x--
            }

            move(element).to(x, y)
        }


        setInterval(moveElement, 1)


        document.addEventListener('keydown', function (e) {
            if (e.repeat) return

            if (e.key === 'ArrowUp') {
                direction = 'north'
            }

            if (e.key === 'ArrowRight') {
                direction = 'east'
            }

            if (e.key === 'ArrowDown') {
                direction = 'south'
            }

            if (e.key === 'ArrowLeft') {
                direction = 'west'
            }

            if (callback) {
                callback(direction)
            }

        })

        document.addEventListener('keyup', function (e) {
            direction = null
            if (callback) {
                callback(direction)
            }
        })
    }

    return {
        to: moveToCoordinates,
        withArrowKeys
    }
}
