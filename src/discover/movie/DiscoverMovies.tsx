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

const DiscoverMovies: React.FC = () => {
	const listQuery = useDiscover('movie')

	const list = listQuery.data ?? []
	return (
		<StyledSection>
			<StyledHeading>Discover Movies</StyledHeading>
			{listQuery.isLoading ? (
				'loading'
			) : (
				<Scroller list={list} imageKey="backdrop_path" titleKey="title" />
			)}
		</StyledSection>
	)
}

export default DiscoverMovies
