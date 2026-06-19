type FirebaseConfigNoticeProps = {
  message: string;
};

export default function FirebaseConfigNotice({ message }: FirebaseConfigNoticeProps) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
      <div className="flex items-start gap-3">
        <div className="text-xl">⚠️</div>
        <div>
          <h2 className="font-semibold text-amber-300">Firebase setup needed</h2>
          <p className="mt-1 text-sm text-amber-100/90">{message}</p>
          <p className="mt-2 text-xs text-amber-200/70">
            Data-backed pages will stay empty until Firebase Admin credentials are configured locally.
          </p>
        </div>
      </div>
    </div>
  );
}