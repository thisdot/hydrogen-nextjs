import { Meta, StoryFn } from '@storybook/react';
import AddressCard from '../AddressCard';
import { MailingAddress } from '@/lib/shopify/types';

export default {
	title: 'Components/AddressCard',
	component: AddressCard,
} as Meta;

const adress = {
	address1: 'Oluyole',
	address2: 'Sango Ota',
	firstName: 'Jerry',
	lastName: 'Hogan',
	phone: '2347030995296',
	formattedArea: 'Ibadan, Nigeria',
	formatted: ['Oluyole', 'Sango Ota', '112212 Ibadan', 'Nigeria'],
	name: 'Jerry Hogan',
	id: 'gid://shopify/MailingAddress/9428147732761?model_name=CustomerAddress&customer_access_token=ScyQrG41lRHaS-MCPH29ZKZ1H9LG_BrL9cNsykD7yoXwoKIzjUKtOFyAIJb0UaYHjQ-yIYvQIFFStsl2pwvliYP-MReVDOVSs5AD5O3AVqaKbNNAmeS3NJTJeBOan6Ihh0hwND-csvqRYrYH7p80mGGGqGwS4akNeNfctEno-d0gYUKLFC5D30kgga7HgOlt6fc2086ooVn28y3vmzct-RJgFsnQpJrO3p_Qr7MTib3scgcb8UyUaeWieZwLq55y',
	zip: '112212',
	country: 'Nigeria',
	province: null,
	provinceCode: null,
} as MailingAddress;

const Template: StoryFn = () => (
	<AddressCard address={adress} defaultAddress={true} />
);

export const Default = Template.bind({});
