import styled from 'styled-components'
import ThemeToggle from '../shared/theme/ThemeToggle'
import MenuIcon from 'mdi-react/MenuIcon'

const StyledHeader = styled.header`
	height: 4rem;
	background-color: var(--header-bg-color);
	border-bottom: 1px solid var(--header-underline-color);
	position: sticky;
	top: 0;
	z-index: 1;
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 0 1rem;
	@media (max-width: 768px) {
		justify-content: space-around;
	}
`

const StyledButton = styled.button`
	padding: 1rem;
	background: transparent;
	cursor: pointer;
	border-radius: 50%;
	border: 0;
	position: relative;
	background-position: center;
	transition: background 0.8s;
	color: white;
	:hover {
		background: rgba(255, 255, 255, 0.1)
			radial-gradient(circle, transparent 1%, rgba(255, 255, 255, 0.1) 1%)
			center/15000%;
	}
	:active {
		background-color: rgba(255, 255, 255, 0.1);
		background-size: 100%;
		transition: background 0s;
	}
`

const Header: React.FC = () => {
	return (
		<StyledHeader>
			<ThemeToggle />
			<StyledButton>
				<MenuIcon />
			</StyledButton>
		</StyledHeader>
	)
}

export default Header
