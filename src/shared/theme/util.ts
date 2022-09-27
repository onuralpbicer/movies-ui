import { useCallback, useEffect, useState } from 'react'

const themeKey = 'theme'

export function useTheme() {
	useEffect(() => {
		// const theme = localStorage.getItem(themeKey)

		// const el = document.querySelector(':root')
		// if (el) {
		// 	if (theme === 'light') {
		// 		el.className = 'light-mode'
		// 	} else if (theme === 'dark') {
		// 		el.className = 'dark-mode'
		// 	}
		// }

		function listenChange() {
			localStorage.removeItem(themeKey)
		}

		const mediaQueryList =
			matchMedia && matchMedia('(prefers-color-scheme: dark)')
		mediaQueryList?.addEventListener('change', listenChange)

		return () => {
			mediaQueryList?.removeEventListener('change', listenChange)
		}
	}, [])
}

export type Theme = 'light' | 'default' | 'dark'
export function useThemeToggle(): [Theme, (theme: Theme) => void] {
	const [theme, setTheme] = useState<Theme>(() => {
		const theme = localStorage.getItem(themeKey)

		if (theme === 'light' || theme === 'dark') {
			const el = document.querySelector(':root')
			if (el) el.className = theme + '-theme'
			return theme
		} else return 'default'
	})

	const changeTheme = useCallback((theme: Theme) => {
		setTheme(theme)

		const el = document.querySelector(':root')
		if (theme === 'default') {
			if (el) el.className = ''
			localStorage.removeItem(themeKey)
		} else {
			if (el) el.className = theme + '-theme'
			localStorage.setItem(themeKey, theme)
		}
	}, [])

	return [theme, changeTheme]
}
