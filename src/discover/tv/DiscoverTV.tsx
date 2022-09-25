import { useDiscover } from '../util'

const DiscoverTVShows: React.FC = () => {
	const listQuery = useDiscover('tv')

	const list = listQuery.data ?? []
	console.log(list.at(1))
	return (
		<section>
			<h1>Discover Movies</h1>
			{listQuery.isLoading
				? 'loading'
				: list.map((item) => <div key={item.id}>{item.name}</div>)}
		</section>
	)
}

export default DiscoverTVShows
