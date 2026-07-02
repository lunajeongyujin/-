import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { ResultView } from "@/components/result-view"

export default function ResultPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main>
        <Suspense
          fallback={
            <div className="py-20 text-center text-muted-foreground">
              불러오는 중...
            </div>
          }
        >
          <ResultView />
        </Suspense>
      </main>
    </div>
  )
}
