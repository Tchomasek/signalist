import Header from "@/components/ui/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Header />
      <div className="container py-10">{children}</div>
    </main>
  );
};

export default Layout;
