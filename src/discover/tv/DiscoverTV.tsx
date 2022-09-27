import styled from 'styled-components'
import Scroller from '../../shared/Scroller/Scroller'
import { useDiscover } from '../util'

const StyledHeading = styled.h1`
	margin-block-end: 0;
`

const StyledSection = styled.section`
	:not(:first-of-type) {
		margin-top: 3rem;
	}
`

const DiscoverTVShows: React.FC = () => {
	const listQuery = useDiscover('tv')

	const list = listQuery.data ?? []
	return (
		<StyledSection>
			<StyledHeading>Discover TV Shows</StyledHeading>
			{listQuery.isLoading ? (
				'loading'
			) : (
				<Scroller list={list} imageKey="backdrop_path" titleKey="name" />
			)}
		</StyledSection>
	)
}

export default DiscoverTVShows
