import { MediaType, useDiscover } from './util'

const Discover: React.FC<{ type: MediaType }> = ({ type }) => {
	const listQuery = useDiscover(type)
	console.log(listQuery.data)

	if (listQuery.isLoading) return <section>loading</section>
	const list = listQuery.data ?? []
	return (
		<section>
			{list.map((item) => (
				<div key={item.id}>{item.title}</div>
			))}
		</section>
	)
}

export default Discover
