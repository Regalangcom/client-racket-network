"use client";

import AccountPage from "../components/account/accountAccount";
import SearchForm from "../components/search/search";
import { useWindowDimension } from "@/hooks/useWindowdimension";

export default function MatchPage() {
  const { isLaptop } = useWindowDimension();

  return (
    <section className="p-4 md:container-lg">
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className={`flex-1 p-4 max-w-full  ${
            isLaptop ? "max-w-full" : "max-w-full"
          } `}
        >
          <div className="mb-4 font-semibold">
            <AccountPage />
          </div>
        </div>
      </div>
    </section>
  );
}
