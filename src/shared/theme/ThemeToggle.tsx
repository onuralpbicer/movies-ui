import React from 'react'
import styled from 'styled-components'
import { Theme, useThemeToggle } from './util'

const StyledInput = styled.input`
	display: none;
`

const StyledLabel = styled.label`
	width: 24px;
	height: 24px;
	display: inline-block;
	background-color: gray;
	cursor: pointer;
	:first-of-type {
		border-top-left-radius: 1rem;
		border-bottom-left-radius: 1rem;
	}
	:last-of-type {
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}
`

const StyledContainer = styled.span`
	position: relative;
	display: inline-block;
	::after {
		content: '';
		position: absolute;
		pointer-events: none;
		top: 0;
		left: 0;
		height: 24px;
		width: 24px;
		border-radius: 1rem;
		transition: transform 0.25s ease-in-out, border-radius 0.25s ease-in-out,
			background-color 0.25s ease-in-out;
		border-radius: ${({ theme }: { theme: Theme }) =>
			theme === 'default' ? '4px' : '1rem'};
		transform: ${({ theme }: { theme: Theme }) =>
			`translateX(${theme === 'dark' ? 200 : theme === 'default' ? 100 : 0}%)`};
		background-color: ${({ theme }: { theme: Theme }) =>
			theme === 'dark' ? 'black' : theme === 'default' ? 'darkgray' : 'yellow'};
	}
`

// const StyledState = styled.div`
// `

const ThemeToggle: React.FC = () => {
	const [theme, setTheme] = useThemeToggle()

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.id.replace('theme-', '')
		if (name === 'light' || name === 'dark' || name === 'default') {
			setTheme(name)
		}
	}

	return (
		<StyledContainer theme={theme}>
			<StyledInput
				id="theme-light"
				name="theme-toggle"
				type="radio"
				checked={theme === 'light'}
				onChange={changeHandler}
			/>
			<StyledLabel htmlFor="theme-light"></StyledLabel>

			<StyledInput
				id="theme-default"
				name="theme-toggle"
				type="radio"
				checked={theme === 'default'}
				onChange={changeHandler}
			/>
			<StyledLabel htmlFor="theme-default"></StyledLabel>

			<StyledInput
				id="theme-dark"
				name="theme-toggle"
				type="radio"
				checked={theme === 'dark'}
				onChange={changeHandler}
			/>
			<StyledLabel htmlFor="theme-dark"> </StyledLabel>
		</StyledContainer>
	)
}

export default ThemeToggle
