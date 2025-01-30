import { ArrowUpIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
    title: string
    value: string
    isPercentage?: boolean
    showTrend?: boolean
}

function MetricCard({ title, value, isPercentage = false, showTrend = false }: MetricCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <div className="text-2xl font-bold">
                        {value}
                        {isPercentage && "%"}
                    </div>
                    {showTrend && <ArrowUpIcon className="ml-2 h-4 w-4 text-green-500" />}
                </div>
            </CardContent>
        </Card>
    )
}

export function MetricsGrid() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCard title="Started Verifications" value="248" />
            <MetricCard title="Completed Verifications" value="106" />
            <MetricCard title="Verification Conversion Rate" value="72" isPercentage showTrend />
            <MetricCard title="Approved Verifications" value="60.4" isPercentage showTrend />
            <MetricCard title="Verification Rejection Rate" value="0.0" isPercentage showTrend />
            <MetricCard title="Verification Manual Review Rate" value="37.7" isPercentage />
        </div>
    )
}