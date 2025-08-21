import SuccessPage from "./page-success";
import { Suspense } from "react";

export default function AuthSuccess() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessPage />
      </Suspense>
    </>
  );
}
