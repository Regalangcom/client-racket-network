import HomeCard from "../app/components/home/cardHome";
import Notification from "./components/home/notification/notification";

export default function Home() {
  return (
    <section className="container-lg min-h-screen mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar w-1/4 */}
        {/* xl:w-[20%] */}
        <div className="w-full md:w-[27%] text-white">
          <div className="">
            {/* <Notification
              type="join"
              username="Padel Cihuy"
              message="just joined Racket Network"
            /> */}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 md:p-4 max-w-full">
          <div className="mb-4 font-semibold">
            <p className="text-3xl"></p>
            <p className="font-semibold mt-1">
              <Notification
                type="join"
                username="Padel Cihuy"
                message="just joined Racket Network"
              />
            </p>
          </div>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`}
          >
            <HomeCard />
            <HomeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
