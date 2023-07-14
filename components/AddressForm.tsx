import { getInputStyleClasses } from '@/lib/utils';
import { Button } from './Button';
import FormModal from './FormModal';
import { MailingAddress } from '@/lib/shopify/types';
import FormButton from '@/app/account/component/FormButton';

interface IAddressForm {
	isNewAddress: boolean;
	address?: MailingAddress;
	defaultAddress?: MailingAddress;
}
function AddressForm({ isNewAddress, address, defaultAddress }: IAddressForm) {
	const handleSubmit = async (formData: FormData) => {
		'use server';
	};

	return (
		<FormModal heading={isNewAddress ? 'Add address' : 'Edit address'}>
			<form action={handleSubmit} noValidate>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="firstName"
						name="firstName"
						required
						type="text"
						autoComplete="given-name"
						placeholder="First name"
						aria-label="First name"
						defaultValue={address?.firstName ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="lastName"
						name="lastName"
						required
						type="text"
						autoComplete="family-name"
						placeholder="Last name"
						aria-label="Last name"
						defaultValue={address?.lastName ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="company"
						name="company"
						type="text"
						autoComplete="organization"
						placeholder="Company"
						aria-label="Company"
						defaultValue={address?.company ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="address1"
						name="address1"
						type="text"
						autoComplete="address-line1"
						placeholder="Address line 1*"
						required
						aria-label="Address line 1"
						defaultValue={address?.address1 ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="address2"
						name="address2"
						type="text"
						autoComplete="address-line2"
						placeholder="Address line 2"
						aria-label="Address line 2"
						defaultValue={address?.address2 ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="city"
						name="city"
						type="text"
						required
						autoComplete="address-level2"
						placeholder="City"
						aria-label="City"
						defaultValue={address?.city ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="province"
						name="province"
						type="text"
						autoComplete="address-level1"
						placeholder="State / Province"
						required
						aria-label="State"
						defaultValue={address?.province ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="zip"
						name="zip"
						type="text"
						autoComplete="postal-code"
						placeholder="Zip / Postal Code"
						required
						aria-label="Zip"
						defaultValue={address?.zip ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="country"
						name="country"
						type="text"
						autoComplete="country-name"
						placeholder="Country"
						required
						aria-label="Country"
						defaultValue={address?.country ?? ''}
					/>
				</div>
				<div className="mt-3">
					<input
						className={getInputStyleClasses()}
						id="phone"
						name="phone"
						type="tel"
						autoComplete="tel"
						placeholder="Phone"
						aria-label="Phone"
						defaultValue={address?.phone ?? ''}
					/>
				</div>
				<div className="mt-4">
					<input
						type="checkbox"
						name="defaultAddress"
						id="defaultAddress"
						defaultChecked={!isNewAddress && defaultAddress?.id === address?.id}
						className="border-gray-500 rounded-sm cursor-pointer border-1"
					/>
					<label
						className="inline-block ml-2 text-sm cursor-pointer"
						htmlFor="defaultAddress"
					>
						Set as default address
					</label>
				</div>
				<div className="mt-8">
					<FormButton state="Saving" btnText="Save" />
				</div>
				<div>
					<Button
						to="/account"
						className="w-full mt-2 rounded focus:shadow-outline"
						variant="secondary"
					>
						Cancel
					</Button>
				</div>
			</form>
		</FormModal>
	);
}

export default AddressForm;
