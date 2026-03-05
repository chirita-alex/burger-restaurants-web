import "./PageContent.scss";

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="pageContent">
      {children}
    </section>
  );
};