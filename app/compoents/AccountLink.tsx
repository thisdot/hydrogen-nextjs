import { IconAccount, IconLogin } from "@/components/Icon";
import { Link } from "@/components/Link";

function AccountLink({ className }: { className?: string }) {
  const isLoggedIn = false; // TODO: replace with real auth check
  return isLoggedIn ? (
    <Link href="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link href="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

export default AccountLink;
