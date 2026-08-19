import type { Metadata } from "next";
import { ErrorScreen } from "@/components/ErrorScreen";

export const metadata: Metadata = {
  title: "Page not found — Nupur Aggarwal",
};

export default function NotFound() {
  return (
    <ErrorScreen
      word="404"
      message="We cannot find this page. It does not exist, or it moved."
    />
  );
}
