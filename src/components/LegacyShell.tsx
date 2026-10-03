// Wraps /blog and /admin in the original dark theme + Font Awesome,
// so the new design system doesn't leak into them (or vice versa).
export default function LegacyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="legacy">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        precedence="default"
      />
      {children}
    </div>
  );
}
