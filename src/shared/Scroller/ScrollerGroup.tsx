import styled from 'styled-components'
import { DiscoverItemResponse } from '../../discover/util'

const ScrollGroupContainer = styled.div`
	width: 100%;
	flex-shrink: 0;
	display: flex;
	gap: 0.5rem;
	transform: ${({ curPage }: { curPage: number }) =>
		`translateX(calc(-${curPage}00% - calc(${0} * 8px)))`};
	transition: transform 0.75s ease-in-out;
`

const ScrollGroupItem = styled.div`
	height: 200px;
	flex-shrink: 0;
	width: ${({ numPerPage }: { numPerPage: number }) =>
		`calc(calc(100% - 8px * ${numPerPage}) / ${numPerPage})`};
	background-color: palevioletred;
`

interface ScrollGroupProps<T extends DiscoverItemResponse> {
	numPerPage: number
	curPage: number
	list: T[]
	getName: (item: T) => string
}

const ScrollGroup = <T extends DiscoverItemResponse>({
	numPerPage,
	curPage,
	list,
	getName,
}: ScrollGroupProps<T>) => {
	return (
		<ScrollGroupContainer curPage={curPage}>
			{list.map((item) => (
				<ScrollGroupItem key={item.id} numPerPage={numPerPage}>
					{getName(item)}
				</ScrollGroupItem>
			))}
		</ScrollGroupContainer>
	)
}

export default ScrollGroup
