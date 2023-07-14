export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';

export default function NotFoundCatchAll() {
  notFound();
}
