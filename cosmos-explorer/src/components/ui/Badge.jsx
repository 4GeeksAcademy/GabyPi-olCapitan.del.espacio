export default function Badge({ variant = 'default', children }) {
  const styles = {
    default: 'bg-space-700 text-gray-300 border-gray-600',
    danger: 'bg-red-950/40 text-red-400 border-red-900/40',
    success: 'bg-green-950/40 text-green-400 border-green-900/40',
    primary: 'bg-space-primary/20 text-space-primary border-space-primary/30'
  };

  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${styles[variant]}`}>
      {children}
    </span>
  );
}