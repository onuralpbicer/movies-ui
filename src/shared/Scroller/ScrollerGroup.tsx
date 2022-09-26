import styled from 'styled-components'
import { DiscoverItemResponse } from '../../discover/util'
import { KeysOfType } from '../util'

const ScrollGroupContainer = styled.div`
	width: 100%;
	flex-shrink: 0;
	display: flex;
	gap: 0.5rem;
	transform: ${({ curPage }: { curPage: number }) =>
		`translateX(calc(-${curPage}00% - calc(${0} * 8px)))`};
	transition: transform 0.75s ease-in-out;
`

const imageBasePath = 'https://image.tmdb.org/t/p/w500'
const ScrollGroupItem = styled.a`
	height: 200px;
	flex-shrink: 0;
	width: ${({ numPerPage }: { numPerPage: number; imagePath: string }) =>
		`calc(calc(100% - 8px * ${numPerPage}) / ${numPerPage})`};
	position: relative;
	overflow: hidden;
	color: white;
	font-size: 2rem;
	font-weight: bold;
	display: grid;
	place-content: center;
	opacity: 1;
	border-radius: 0.5rem;
	text-align: center;
	::before {
		content: '';
		display: block;
		background-image: ${({ imagePath }: { imagePath: string }) =>
			`url(${imageBasePath + imagePath})`};
		background-position: center;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		transition: transform 0.25s ease-in-out, filter 0.25s ease-in-out;
	}
	:hover::before {
		transform: scale(1.2);
		filter: brightness(0.5);
	}
`

const ScrollGroupItemInner = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	display: grid;
	place-content: center;
	text-align: center;
`

interface ScrollGroupProps<T extends DiscoverItemResponse> {
	numPerPage: number
	curPage: number
	list: T[]
	titleKey: KeysOfType<T, string>
	imageKey: KeysOfType<T, string>
}

const ScrollGroup = <T extends DiscoverItemResponse>({
	numPerPage,
	curPage,
	list,
	titleKey,
	imageKey,
}: ScrollGroupProps<T>) => {
	return (
		<ScrollGroupContainer curPage={curPage}>
			{list.map((item) => {
				return (
					<ScrollGroupItem
						key={item.id}
						numPerPage={numPerPage}
						imagePath={item[imageKey] as string}
					>
						<ScrollGroupItemInner>
							{item[titleKey] as string}
						</ScrollGroupItemInner>
					</ScrollGroupItem>
				)
			})}
		</ScrollGroupContainer>
	)
}

export default ScrollGroup
