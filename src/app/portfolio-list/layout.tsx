import { DataSetProvider } from "./dataset-context";

export default function PortfolioListLayout({ children }: { children: React.ReactNode }) {
  return <DataSetProvider>{children}</DataSetProvider>;
}
