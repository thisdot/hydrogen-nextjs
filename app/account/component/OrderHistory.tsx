import { Order } from "@/lib/shopify/types";

export default function OrderHistory({ orders }: { orders: Order[] }) {
	return <h2 className="font-bold text-lead">Order History</h2>;
}
