import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export type MediaType = 'movie' | 'tv'

const api_key = 'de3e345d787759aafb69a48a4192ef5e'

async function getDiscoverList<T>(type: MediaType): Promise<T> {
	const baseURL = 'https://api.themoviedb.org'
	const path = `/3/discover/${type}`

	const url = new URL(path, baseURL)
	url.searchParams.append('api_key', api_key)
	url.searchParams.append('language', navigator.language)

	const res = await fetch(url)
	const contentType = res.headers.get('Content-Type')
	if (res.ok) {
		if (contentType?.includes('application/json')) return res.json()
		else if (contentType?.includes('text/html')) return res.text() as Promise<T>
		else throw new Error('Unsupported Content-Type header')
	}

	if (contentType?.includes('application/json')) {
		const error = await res.json()
		throw new Error(error.status_message)
	} else throw new Error('Unsupported Content-Type header')
}

interface DiscoverItemResponse {
	id: number
	genre_ids: number[]
	original_language: string
	overview: string
	popularity: number
	poster_path: string
	vote_average: number
	vote_count: number
}

interface DiscoverItemTVResponse extends DiscoverItemResponse {
	backdrop_path: string
	first_air_date: string
	name: string
	origin_country: string[]
	original_name: string
}

interface DiscoverItemMovieResponse extends DiscoverItemResponse {
	adult: boolean
	backdrop_path: string
	id: number
	original_title: string
	release_date: string
	title: string
	video: boolean
}

interface DiscoverResponse<T> {
	page: number
	total_pages: number
	total_results: number
	results: T[]
}

export function useDiscover<T extends MediaType>(type: T) {
	const queryFn = () =>
		getDiscoverList<
			DiscoverResponse<
				T extends 'movie' ? DiscoverItemMovieResponse : DiscoverItemTVResponse
			>
		>(type)

	return useQuery({
		queryKey: ['Discover list', type],
		queryFn,
		onError: (error: Error) => {
			console.error(error)
			toast.error(error.message)
		},
		select: (data) => data.results,
	})
}
