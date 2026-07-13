import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header subtitle="v1.0" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
