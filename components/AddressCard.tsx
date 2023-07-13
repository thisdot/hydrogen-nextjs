'use client';
import { MailingAddress } from '@/lib/shopify/types';
import { Link } from './Link';

function AddressCard({
	address,
	defaultAddress,
}: {
	address: MailingAddress;
	defaultAddress?: boolean;
}) {
	const removeAddress = (id: string) => {
		fetch('/api/address/remove', {
			method: 'POST',
			body: JSON.stringify({ addressId: id }),
		})
			.then(() => {})
			.catch(() => {});
	};
	return (
		<div className="lg:p-8 p-6 border border-gray-200 rounded flex flex-col">
			{defaultAddress && (
				<div className="mb-3 flex flex-row">
					<span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary/50">
						Default
					</span>
				</div>
			)}
			<ul className="flex-1 flex-row">
				{(address.firstName || address.lastName) && (
					<li>
						{'' +
							(address.firstName && address.firstName + ' ') +
							address?.lastName}
					</li>
				)}
				{address.formatted &&
					address.formatted.map((line: string) => <li key={line}>{line}</li>)}
			</ul>

			<div className="flex flex-row font-medium mt-6 items-baseline">
				<Link
					href={`/account/address/${encodeURIComponent(address.id)}`}
					className="text-left underline text-sm"
					prefetch={true}
				>
					Edit
				</Link>
				<button
					onClick={() => removeAddress(address.id)}
					className="text-left text-primary/50 ml-6 text-sm"
				>
					Remove
				</button>
			</div>
		</div>
	);
}

export default AddressCard;
