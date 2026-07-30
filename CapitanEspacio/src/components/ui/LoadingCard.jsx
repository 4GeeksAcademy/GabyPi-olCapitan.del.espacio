export default function LoadingCard() {
  return (
    <div className="bg-space-800/60 border border-gray-800/80 rounded-2xl p-6 space-y-4 animate-pulse h-full min-h-[220px]">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-space-700 rounded w-1/3"></div>
        <div className="w-8 h-8 bg-space-700 rounded-xl"></div>
      </div>
      <div className="space-y-2">
        <div className="h-10 bg-space-700 rounded w-1/4"></div>
        <div className="h-4 bg-space-700 rounded w-5/6"></div>
        <div className="h-4 bg-space-700 rounded w-2/3"></div>
      </div>
      <div className="h-8 bg-space-700 rounded-xl w-full mt-4"></div>
    </div>
  );
}