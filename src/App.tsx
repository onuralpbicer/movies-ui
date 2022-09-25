import React from 'react'
import './App.css'
import DiscoverMovies from './discover/movie/DiscoverMovies'
import DiscoverTVShows from './discover/tv/DiscoverTV'

function App() {
	return (
		<React.Fragment>
			<DiscoverMovies />
			{/* <DiscoverTVShows /> */}
		</React.Fragment>
	)
}

export default App
