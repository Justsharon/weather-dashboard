export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse bg-slate-50 rounded-lg shadow-lg p-6">
      <div className="h-8 bg-slate-100 rounded w-1/2 mb-4"></div>
      <div className="space-y-3">
        <div className="h-6 bg-slate-100 rounded"></div>
        <div className="h-6 bg-slate-100 rounded w-3/4"></div>
      </div>
    </div>
  );
}
