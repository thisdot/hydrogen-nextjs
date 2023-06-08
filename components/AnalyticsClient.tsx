'use client';

import { useAnalytics } from '@/hooks/useAnalytics';

function AnalyticsClient() {
	useAnalytics(true, {
		pathPrefix: 'en',
		language: 'EN',
		country: 'US',
		label: 'English',
		currency: 'USD',
	});
	return <></>;
}

export default AnalyticsClient;
