import styled from 'styled-components'
import './App.css'
import DiscoverMovies from './discover/movie/DiscoverMovies'
import DiscoverTVShows from './discover/tv/DiscoverTV'
import Header from './header/Header'
import Theme from './shared/theme/Theme'

const StyledContainer = styled.div`
	padding: 1rem;
`

function App() {
	return (
		<Theme>
			<Header />
			<StyledContainer>
				<DiscoverMovies />
				<DiscoverTVShows />
			</StyledContainer>
		</Theme>
	)
}

export default App
