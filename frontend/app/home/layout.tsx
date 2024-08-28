import RightSection from "../component/home/right-section";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-200 h-screen flex">
      <RightSection />
      {children}
    </div>
  );
}
