import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export type MediaType = 'movies' | 'shows'

const api_key = 'de3e345d787759aafb69a48a4192ef5e'

function isError(error: unknown): error is Error {
	return error instanceof Error
}

async function getDiscoverList<T>(type: MediaType): Promise<T> {
	const baseURL = 'https://api.themoviedb.org'
	const path = '/3/discover/movie'

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
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

interface DiscoverResponse {
	page: number
	total_pages: number
	total_results: number
	results: DiscoverItemResponse[]
}

export function useDiscover(type: MediaType) {
	return useQuery({
		queryKey: ['Discover list', type],
		queryFn: () => getDiscoverList<DiscoverResponse>(type),
		onError: (error: Error) => {
			console.error(error)
			toast.error(error.message)
		},
		select: (data) => data.results,
	})
}
