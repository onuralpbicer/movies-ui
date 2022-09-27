import './App.css'
import DiscoverMovies from './discover/movie/DiscoverMovies'
import DiscoverTVShows from './discover/tv/DiscoverTV'
import Theme from './shared/theme/Theme'
import ThemeToggle from './shared/theme/ThemeToggle'

function App() {
	return (
		<Theme>
			<ThemeToggle />
			<DiscoverMovies />
			<DiscoverTVShows />
		</Theme>
	)
}

export default App
