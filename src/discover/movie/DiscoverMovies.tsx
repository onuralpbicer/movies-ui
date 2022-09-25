import Scroller from '../../shared/Scroller/Scroller'
import { useDiscover } from '../util'

const DiscoverMovies: React.FC = () => {
	const listQuery = useDiscover('movie')

	const list = listQuery.data ?? []
	console.log(list)
	return (
		<section style={{ overflow: 'hidden' }}>
			<h1>Discover Movies</h1>
			{listQuery.isLoading ? (
				'loading'
			) : (
				<>
					<Scroller list={list} getName={(item) => item.title} />
				</>
			)}
		</section>
	)
}

export default DiscoverMovies
