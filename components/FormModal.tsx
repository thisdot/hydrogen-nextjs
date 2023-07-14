'use client';

import { IconClose } from './Icon';
import { Text } from './Text';

interface IFormModal {
	heading: string;
	children: React.ReactNode;
}

function FormModal({ heading, children }: IFormModal) {
	return (
		<>
			<div className="fixed inset-0 transition-opacity bg-opacity-75 bg-primary/40" />
			<div className="fixed inset-0 z-50 overflow-y-auto">
				<div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
					<div className="relative flex-1 px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded shadow-xl bg-contrast sm:my-12 sm:flex-none sm:w-full sm:max-w-sm sm:p-6">
						<Text className="mt-4 mb-6" as="h3" size="lead">
							{heading}
						</Text>
						<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
							<a
								className="p-4 -m-4 transition text-primary hover:text-primary/50"
								href="/account"
							>
								<IconClose />
							</a>
						</div>
						<div className="max-w-lg">{children}</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default FormModal;
