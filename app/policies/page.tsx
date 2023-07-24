import { Link } from '@/components/Link';
import { PageHeader, Section, Heading } from '@/components/Text';
import { getPolicies } from '@/lib/shopify';

export default async function Policies() {
	const data = await getPolicies();
	let policies: { id: string; handle: string; title: string }[] = [];
	for (const key in data.body.data.shop) {
		if (data.body.data.shop.hasOwnProperty(key)) {
			const element = data.body.data.shop[key];
			if (element.handle !== 'subscription-policy') {
				policies = [...policies, element];
			}
		}
	}

	return (
		<>
			<PageHeader heading="Policies" />
			<Section padding="x" className="mb-24">
				{policies.map(policy => {
					return (
						policy && (
							<Heading className="font-normal text-heading" key={policy.id}>
								<Link href={`/policies/${policy.handle}`}>{policy.title}</Link>
							</Heading>
						)
					);
				})}
			</Section>
		</>
	);
}
