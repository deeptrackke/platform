import { getSession } from "@/lib/session"
import VerificationSteps from "@/modules/kyc/verification-steps"
import { redirect } from "next/navigation"
import { getLatestCustomer } from "@/_actions/customer-actions"

export default async function KYCPPage() {
  const session = await getSession()
  if (!session?.user) redirect("/login")
  const latestCustomer = await getLatestCustomer()
  return (
    <div className="p-4">
      <VerificationSteps customer={latestCustomer} userId={Number.parseInt(session.user.id)} />
    
    </div>
  )
}
