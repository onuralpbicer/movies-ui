import { useDiscover } from '../util'

const DiscoverMovies: React.FC = () => {
	const listQuery = useDiscover('movie')

	const list = listQuery.data ?? []
	console.log(list.length)
	return (
		<section>
			<h1>Discover Movies</h1>
			{listQuery.isLoading
				? 'loading'
				: list.map((item) => <div key={item.id}>{item.title}</div>)}
		</section>
	)
}

export default DiscoverMovies
