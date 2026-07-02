import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { MapView } from "@/components/map-view"

export default function MapPage() {
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
          <MapView />
        </Suspense>
      </main>
    </div>
  )
}
