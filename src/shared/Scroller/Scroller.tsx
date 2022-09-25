import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DiscoverItemResponse } from '../../discover/util'
import ScrollGroup from './ScrollerGroup'

const ScrollContainer = styled.div`
	overflow: hidden;
	display: flex;
`

interface ScrollerProps<T extends DiscoverItemResponse> {
	list: T[]
	getName: (item: T) => string
}

const Scroller = <T extends DiscoverItemResponse>({
	list,
	getName,
}: ScrollerProps<T>) => {
	const numPerPage = 3
	const length = Math.ceil(list.length / numPerPage)

	const pageList = list.reduce(
		(acc, cur, index) => {
			acc[Math.floor(index / numPerPage)].push(cur)
			return acc
		},
		Array.from({ length }, () => [] as T[]),
	)

	const [page, setPage] = useState(0)

	useEffect(() => {
		setPage(0)
	}, [length])

	const goNextPage = () => {
		const newPage = page + 1
		if (newPage >= length) setPage(0)
		else setPage(newPage)
	}

	const goPrevPage = () => {
		const newPage = page - 1
		if (newPage < 0) setPage(length - 1)
		else setPage(newPage)
	}

	return (
		<>
			<ScrollContainer>
				{pageList.map((pageItems, index) => (
					<ScrollGroup
						key={index}
						numPerPage={numPerPage}
						curPage={page}
						list={pageItems}
						getName={getName}
					/>
				))}
			</ScrollContainer>
			<button onClick={goPrevPage}>prev</button>
			<button onClick={goNextPage}>next</button>
			{page}
		</>
	)
}

export default Scroller
