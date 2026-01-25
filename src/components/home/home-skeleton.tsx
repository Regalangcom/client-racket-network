import { Card, CardContent } from "@/components/ui/card";

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-300 rounded ${className || ""}`} />
  );
}

export function NotificationSkeleton() {
  return (
    <div className="bg-white p-3 border-b border-gray-200">
      <div className="flex py-4 px-4 relative items-center pl-3 space-x-2 mt-3 bg-[#F5F5F4]">
        <SkeletonPulse className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonPulse className="h-4 w-3/4" />
          <SkeletonPulse className="h-3 w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function HomeCardSkeleton() {
  return (
    <Card className="sm:w-[290px] w-full md:w-[350px] h-[466px] overflow-hidden shadow-sm border border-gray-200 flex flex-col p-0">
      {/* Header Skeleton */}
      <div className="bg-gray-200 flex items-center px-6 py-3">
        <SkeletonPulse className="w-14 h-12 rounded-full" />
        <div className="flex-1 ml-4 space-y-2">
          <SkeletonPulse className="h-4 w-2/3" />
        </div>
      </div>

      {/* Image Skeleton */}
      <SkeletonPulse className="w-full h-[180px] rounded-none" />

      {/* Content Skeleton */}
      <CardContent className="flex flex-col justify-between flex-1 p-4">
        <div className="space-y-3">
          <SkeletonPulse className="h-5 w-3/4" />
          <div className="flex items-center gap-2">
            <SkeletonPulse className="w-4 h-4 rounded" />
            <SkeletonPulse className="h-4 w-1/2" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonPulse className="w-4 h-4 rounded" />
            <SkeletonPulse className="h-4 w-2/3" />
          </div>
        </div>
        <SkeletonPulse className="mt-4 h-10 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
}

export function HomeSkeleton() {
  return (
    <section className="container-lg min-h-screen mx-auto relative">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[27%]">
          <NotificationSkeleton />
        </div>

        <div className="flex-1 md:p-2 max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <HomeCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSkeleton;