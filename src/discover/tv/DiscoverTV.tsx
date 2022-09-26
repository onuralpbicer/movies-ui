import Scroller from '../../shared/Scroller/Scroller'
import { useDiscover } from '../util'

const DiscoverTVShows: React.FC = () => {
	const listQuery = useDiscover('tv')

	const list = listQuery.data ?? []
	return (
		<section style={{ overflow: 'hidden' }}>
			<h1>Discover TV Shows</h1>
			{listQuery.isLoading ? (
				'loading'
			) : (
				<Scroller list={list} imageKey="backdrop_path" titleKey="name" />
			)}
		</section>
	)
}

export default DiscoverTVShows
