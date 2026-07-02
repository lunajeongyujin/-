"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Star, MapPin, Navigation } from "lucide-react"
import {
  getMenuById,
  getRestaurantsForMenu,
  type Restaurant,
} from "@/lib/data"
import { cn } from "@/lib/utils"

const RestaurantMap = dynamic(() => import("@/components/restaurant-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      지도를 불러오는 중...
    </div>
  ),
})

type SortKey = "distance" | "rating"

export function MapView() {
  const params = useSearchParams()
  const menuId = params.get("menu") ?? "kimchi-jjigae"
  const menu = getMenuById(menuId)
  const [sort, setSort] = useState<SortKey>("distance")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const restaurants = useMemo(() => {
    const list = [...getRestaurantsForMenu(menuId)]
    list.sort((a, b) =>
      sort === "distance" ? a.distance - b.distance : b.rating - a.rating,
    )
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuId, sort])

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="flex h-2/5 w-full flex-col border-b border-border bg-card md:h-full md:w-[380px] md:border-b-0 md:border-r">
        <div className="border-b border-border px-5 py-4">
          <Link
            href={`/result?menu=${menuId}`}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            결과로 돌아가기
          </Link>
          <h1 className="font-heading text-2xl text-foreground">
            {menu ? `주변 ${menu.name} 맛집` : "주변 맛집"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            현재 위치 기준 500m 이내 · {restaurants.length}곳
          </p>
          <div className="mt-3 flex gap-2">
            {(
              [
                { key: "distance", label: "거리순" },
                { key: "rating", label: "평점 높은순" },
              ] as const
            ).map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSort(s.key)}
                aria-pressed={sort === s.key}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                  sort === s.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:bg-secondary",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {restaurants.map((r) => (
            <li key={r.id}>
              <RestaurantRow
                restaurant={r}
                active={selectedId === r.id}
                onClick={() => setSelectedId(r.id)}
              />
            </li>
          ))}
        </ul>
      </aside>

      {/* Map */}
      <div className="relative flex-1">
        <RestaurantMap
          restaurants={restaurants}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  )
}

function RestaurantRow({
  restaurant,
  active,
  onClick,
}: {
  restaurant: Restaurant
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full flex-col items-start gap-1 border-b border-border px-5 py-4 text-left transition-colors",
        active ? "bg-accent/40" : "hover:bg-secondary",
      )}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="font-bold text-foreground">{restaurant.name}</span>
        <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
          <Star
            className="size-3.5 fill-accent text-accent"
            aria-hidden="true"
          />
          {restaurant.rating}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3.5" aria-hidden="true" />
          {restaurant.distance}m
        </span>
        <span>{restaurant.price}</span>
        <span>리뷰 {restaurant.reviews.toLocaleString()}</span>
      </div>
      <span className="mt-0.5 text-xs text-muted-foreground">
        {restaurant.address}
      </span>
      <a
        href={`https://map.kakao.com/link/search/${encodeURIComponent(
          restaurant.name,
        )}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
      >
        <Navigation className="size-3.5" aria-hidden="true" />
        길찾기
      </a>
    </button>
  )
}
