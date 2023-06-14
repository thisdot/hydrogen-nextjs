import { IconAccount, IconLogin } from '@/components/Icon';
import { Link } from '@/components/Link';
import { useCookie } from 'react-use';

function AccountLink({ className }: { className?: string }) {
	const [customerAccessToken,] = useCookie('customerAccessToken');
	return (
		<Link href="/account" className={className}>
			{customerAccessToken ? <IconAccount /> : <IconLogin/> }
		</Link>
	)
}

export default AccountLink;
