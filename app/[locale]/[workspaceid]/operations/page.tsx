import { Metadata } from "next"
import { SaintSalOperationsDashboard } from "@/components/operations/sainsal-operations-dashboard"

export const metadata: Metadata = {
  title: "SaintSal™ Operations",
  description: "AI-powered business operations dashboard"
}

export default function OperationsPage() {
  return <SaintSalOperationsDashboard />
}
