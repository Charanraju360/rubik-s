interface ValidationBannerProps {
  error: string | null;
}

export default function ValidationBanner({ error }: ValidationBannerProps) {
  if (!error) return null;
  return (
    <div className="w-full max-w-xl bg-red-900/30 border border-red-700 text-red-300 rounded-xl px-4 py-3 text-sm">
      ⚠️ {error}
    </div>
  );
}