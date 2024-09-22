import { useEffect, useRef } from 'react'

const DELAY = 2000

export const useDelayedEffect = (callback, inputs) => {
	const timerRef = useRef(null)

	useEffect(() => {
		clearTimeout(timerRef.current)

		timerRef.current = setTimeout(() => {
			callback()
		}, DELAY)

		return () => clearTimeout(timerRef.current)
	}, [...inputs])
}
