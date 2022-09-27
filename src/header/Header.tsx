import styled from 'styled-components'
import ThemeToggle from '../shared/theme/ThemeToggle'

const StyledHeader = styled.header`
	height: 4rem;
	background-color: var(--header-bg-color);
	border-bottom: 1px solid var(--header-underline-color);
	position: sticky;
	top: 0;
	z-index: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 1rem;
	@media (max-width: 768px) {
		justify-content: center;
	}
`

const Header: React.FC = () => {
	return (
		<StyledHeader>
			<ThemeToggle />
		</StyledHeader>
	)
}

export default Header
