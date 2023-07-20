import React from 'react';
import AccountPage from '../page';

export default function ModalFormLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			{children}
			{
				//@ts-ignore
				<AccountPage />
			}
		</>
	);
}
