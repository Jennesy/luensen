export const backToTop = {
	created() {
		const viewElement = document.getElementById('view')
		if (viewElement) {
			viewElement.scrollTop = 0
		}
	},
}
export const throttle = {
	methods: {
		throttle(callback, delay) {
			let shouldWait = false
			let waitingArgs = null
			function timeoutFunc() {
				if (waitingArgs === null) {
					shouldWait = false
					return
				}
				callback(...waitingArgs)
				waitingArgs = null
				setTimeout(timeoutFunc, delay)
			}

			return (...args) => {
				if (shouldWait) {
					waitingArgs = args
					return
				}

				callback(...args)
				shouldWait = true

				setTimeout(timeoutFunc, delay)
			}
		},
	},
}
