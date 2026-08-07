export function Card({ className = '', children }) {
  return (
    <div className={`bg-surface border border-line rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({ eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.2em] text-wine font-medium mb-1.5">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl md:text-[2.15rem] leading-tight">{title}</h1>
      </div>
      {action}
    </div>
  );
}

const STATUS_STYLES = {
  active: 'bg-success-light text-success',
  approved: 'bg-success-light text-success',
  accepted: 'bg-success-light text-success',
  completed: 'bg-success-light text-success',
  upcoming: 'bg-info-light text-info',
  pending: 'bg-gold-light text-[#8a6d2f]',
  suspended: 'bg-danger-light text-danger',
  rejected: 'bg-danger-light text-danger',
  cancelled: 'bg-danger-light text-danger',
  withdrawn: 'bg-line text-muted',
  inactive: 'bg-line text-muted',
  failed: 'bg-danger-light text-danger',
};

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status?.toLowerCase()] || 'bg-line text-muted';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
}

export function StatCard({ label, value, icon: Icon, hint }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
          <div className="font-display text-3xl mt-2">{value}</div>
          {hint && <div className="text-xs text-muted mt-1">{hint}</div>}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center shrink-0">
            <Icon size={18} className="text-[#8a6d2f]" strokeWidth={1.75} />
          </div>
        )}
      </div>
    </Card>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <Card className="p-12 flex flex-col items-center text-center">
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-ivory flex items-center justify-center mb-4">
          <Icon size={24} className="text-muted" strokeWidth={1.5} />
        </div>
      )}
      <div className="font-display text-xl mb-1.5">{title}</div>
      {description && <p className="text-sm text-muted max-w-sm mb-5">{description}</p>}
      {action}
    </Card>
  );
}

export function Button({ variant = 'primary', className = '', children, ...props }) {
  const variants = {
    primary: 'bg-wine text-ivory hover:bg-wine-dark',
    outline: 'border border-line text-ink hover:bg-ivory',
    ghost: 'text-ink hover:bg-ivory',
    danger: 'bg-danger text-ivory hover:opacity-90',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-wine outline-none transition-colors';

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-7 h-7 border-2 border-line border-t-wine rounded-full animate-spin" />
    </div>
  );
}
