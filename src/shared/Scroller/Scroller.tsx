import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DiscoverItemResponse } from '../../discover/util'
import { KeysOfType } from '../util'
import ScrollGroup from './ScrollerGroup'

const ScrollContainer = styled.div`
	overflow: hidden;
	display: flex;
	position: relative;
`

const ScrollGroupButtons = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	padding: 1rem;
	border-radius: 0.5rem;
`

const ScrollGroupNavigationContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	padding: 1rem;
	gap: 1px;
`

const ScrollGroupNavigationCrumb = styled.span`
	height: 2px;
	width: 1rem;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;
`

interface ScrollerProps<T extends DiscoverItemResponse> {
	list: T[]
	imageKey: KeysOfType<T, string>
	titleKey: KeysOfType<T, string>
}

const Scroller = <T extends DiscoverItemResponse>({
	list,
	imageKey,
	titleKey,
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
		<div>
			<ScrollGroupNavigationContainer>
				{pageList.map((_, index) => (
					<ScrollGroupNavigationCrumb
						style={{
							backgroundColor: page === index ? 'darkgray' : 'black',
						}}
						key={index}
						onClick={() => setPage(Math.min(length - 1, Math.max(0, index)))}
					/>
				))}
			</ScrollGroupNavigationContainer>
			<ScrollContainer>
				{pageList.map((pageItems, index) => (
					<ScrollGroup
						key={index}
						numPerPage={numPerPage}
						curPage={page}
						list={pageItems}
						titleKey={titleKey}
						imageKey={imageKey}
					/>
				))}
				<ScrollGroupButtons style={{ left: 0 }} onClick={goPrevPage}>
					prev
				</ScrollGroupButtons>
				<ScrollGroupButtons style={{ right: 0 }} onClick={goNextPage}>
					next
				</ScrollGroupButtons>
			</ScrollContainer>
		</div>
	)
}

export default Scroller
