import ShopPage from "@/components/shop/shop-page";
import StripePage from "@/components/stripe-page";

export const runtime = "edge";
// test

export default function Home() {
  return (
    <>
      <StripePage />
      <ShopPage />
    </>
  );
}
