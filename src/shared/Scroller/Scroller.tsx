import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DiscoverItemResponse } from '../../discover/util'
import { KeysOfType } from '../util'
import ScrollGroup from './ScrollerGroup'
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon'
import ChevronRightIcon from 'mdi-react/ChevronRightIcon'

const ScrollContainer = styled.div`
	overflow: hidden;
	display: flex;
	position: relative;
	:hover > .scroller-button {
		opacity: 1;
	}
`

const ScrollGroupButtons = styled.div`
	position: absolute;
	top: 0;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.4);
	padding: 1rem 0.75rem;
	border-radius: 0.5rem;
	opacity: 0;
	transition: opacity 0.25s ease-in-out;
	cursor: pointer;
	display: grid;
	place-content: center;
	box-sizing: border-box;
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

const touchThreshold = 100
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

	const [touchStart, setTouchStart] = useState<number | null>(null)
	const [touchNow, setTouchNow] = useState<number | null>(null)

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
			<ScrollContainer
				onTouchStart={(e) => {
					const pos = e.touches.item(0).clientX
					setTouchStart(pos)
				}}
				onTouchMove={(e) => {
					const pos = e.touches.item(0).clientX
					if (touchStart) {
						const diff = touchStart - pos
						if (Math.abs(diff) > touchThreshold) {
							if (diff > 0) goNextPage()
							else goPrevPage()
							//
							setTouchNow(null)
							setTouchStart(null)
						} else {
							setTouchNow(pos)
						}
					}
				}}
				onTouchEnd={(e) => {
					setTouchStart(null)
					setTouchNow(null)
				}}
				onTouchCancel={() => {
					setTouchStart(null)
					setTouchNow(null)
				}}
			>
				{pageList.map((pageItems, index) => (
					<ScrollGroup
						key={index}
						numPerPage={numPerPage}
						curPage={page}
						list={pageItems}
						titleKey={titleKey}
						imageKey={imageKey}
						touch={touchStart && touchNow && touchStart - touchNow}
					/>
				))}
				<ScrollGroupButtons
					className="scroller-button"
					style={{ left: 0 }}
					onClick={goPrevPage}
				>
					<ChevronLeftIcon color="white" />
				</ScrollGroupButtons>
				<ScrollGroupButtons
					className="scroller-button"
					style={{ right: 0 }}
					onClick={goNextPage}
				>
					<ChevronRightIcon color="white" />
				</ScrollGroupButtons>
			</ScrollContainer>
		</div>
	)
}

export default Scroller
