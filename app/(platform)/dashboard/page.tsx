import { MetricsGrid } from "../_components/metrics-grid"
import { ConversionChart } from "../_components/conversion-chart"
// import ApiKeyGenerator from "../_components/apiKey-generator"

export default function Page() {
  return (
    <div >
      <main className="flex-1">
        <div className="space-y-4 p-8 pt-6">
          <MetricsGrid />
          <div className="grid lg:grid-cols-2 gap-4 md:grid-cols-2">
            <ConversionChart />
            {/* <ApiKeyGenerator /> */}
          </div>
        </div>
      </main>
    </div>
  )
}
