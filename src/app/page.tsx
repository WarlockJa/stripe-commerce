import ShopPage from "@/components/shop/shop-page";
import StripePage from "@/components/stripe-page";

export const runtime = "edge";

export default function Home() {
  return (
    <>
      <StripePage />
      <ShopPage />
    </>
  );
}
