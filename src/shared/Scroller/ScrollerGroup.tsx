import styled from 'styled-components'
import { DiscoverItemResponse } from '../../discover/util'
import { KeysOfType } from '../util'

const touchOffset = 2000
const ScrollGroupContainer = styled.div`
	width: 100%;
	flex-shrink: 0;
	display: flex;
	gap: 0.5rem;
	transform: ${({
		curPage,
		touch,
	}: {
		curPage: number
		touch: number | null
	}) =>
		`translateX(calc(-${curPage}00% - calc(${0} * 8px) - ${
			touch ? (touch > 0 ? touch + touchOffset : touch - touchOffset) : 0
		}px))`};
	transition: transform 0.75s ease-in-out;
`

const imageBasePath = 'https://image.tmdb.org/t/p/w500'

const ScrollGroupImg = styled.img`
	transition: transform 0.25s ease-in-out, filter 0.25s ease-in-out;
`

const ScrollGroupItem = styled.a`
	height: 200px;
	flex-shrink: 0;
	width: ${({ numPerPage }: { numPerPage: number }) =>
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
	:hover > ${ScrollGroupImg} {
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
	touch: number | null
}

const ScrollGroup = <T extends DiscoverItemResponse>({
	numPerPage,
	curPage,
	list,
	titleKey,
	imageKey,
	touch,
}: ScrollGroupProps<T>) => {
	return (
		<ScrollGroupContainer curPage={curPage} touch={touch}>
			{list.map((item) => {
				return (
					<ScrollGroupItem key={item.id} numPerPage={numPerPage}>
						<ScrollGroupImg
							src={imageBasePath + item[imageKey]}
							loading="lazy"
						/>
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
