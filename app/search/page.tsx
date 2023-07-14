'use client';
export const dynamic = 'force-dynamic';
import { Input } from '@/components/Input';
import { PageHeader, Heading } from '@/components/Text';
import useLoadSearchData from '@/hooks/useLoadSearchData';
import { useSearchParam } from 'react-use';
import NoSearchResults from './components/NoSearchResults';
import SearchResult from './components/SearchResult';
import { Grid } from '@/components/Grid';
import CardLoader from './components/CardLoader';

export default function SearchPage() {
	const searchTerm = useSearchParam('q');

	const {
		products,
		pageInfo,
		featuredProducts,
		featuredCollections,
		loadingSearchedProducts,
	} = useLoadSearchData();

	return (
		<>
			<PageHeader>
				<Heading as="h1" size="copy">
					Search
				</Heading>
				<form
					method="get"
					action="/search"
					className="relative flex w-full text-heading"
				>
					<Input
						defaultValue={searchTerm}
						name="q"
						placeholder="Search…"
						type="search"
						variant="search"
					/>
					<button className="absolute right-0 py-2" type="submit">
						Go
					</button>
				</form>
			</PageHeader>
			{loadingSearchedProducts ? (
				<div className="m-8">
					<Grid>
						{[1, 2, 3, 4].map(res => (
							<CardLoader key={res} />
						))}
					</Grid>
				</div>
			) : (
				<>
					{!searchTerm || products.length === 0 ? (
						<NoSearchResults
							noResult={products.length === 0}
							featuredProducts={featuredProducts}
							featuredCollections={featuredCollections}
						/>
					) : (
						<SearchResult products={products} pageInfo={pageInfo} />
					)}
				</>
			)}
		</>
	);
}
