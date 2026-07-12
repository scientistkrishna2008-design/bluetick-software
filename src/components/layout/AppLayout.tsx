import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-growbro-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-growbro-400/10 blur-[120px] pointer-events-none" />
      
      <main className="flex-grow z-10">
        <Outlet />
      </main>
    </div>
  );
}
