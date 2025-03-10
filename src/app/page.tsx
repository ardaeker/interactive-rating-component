import { Toaster } from "sonner";
import { InteractiveRating } from "@/components/interactive-rating";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-900 p-6">
      <InteractiveRating />
      <Toaster position="top-center" richColors />
    </main>
  );
}
