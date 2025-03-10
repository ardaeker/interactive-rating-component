import type { Metadata as NextMetadata } from "next";

declare global {
  type Metadata = NextMetadata;

  type Layout = Readonly<{
    children: React.ReactNode;
  }>;
}
