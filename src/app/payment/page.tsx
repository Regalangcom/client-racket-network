"use client";

import SearchForm from "../components/search/search";
import MatchCard from "../components/match/match";
import { useWindowDimension } from "@/hooks/useWindowdimension";
import Payment from "../components/payment/payment";

export default function PaymentPage() {
  const { isLaptop } = useWindowDimension();
  console.log("laptop", isLaptop);
  return (
    <section className="container-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className={`flex-1 p-4 max-w-5xl  ${
            isLaptop ? "max-w-full" : "max-w-full"
          } `}
        >
          <div>
            <Payment />
          </div>
        </div>
      </div>
    </section>
  );
}
