import Scroller from '../../shared/Scroller/Scroller'
import { useDiscover } from '../util'

const DiscoverMovies: React.FC = () => {
	const listQuery = useDiscover('movie')

	const list = listQuery.data ?? []
	return (
		<section>
			<h1>Discover Movies</h1>
			{listQuery.isLoading ? (
				'loading'
			) : (
				<Scroller list={list} imageKey="backdrop_path" titleKey="title" />
			)}
		</section>
	)
}

export default DiscoverMovies
