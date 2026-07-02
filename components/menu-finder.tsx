"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dices, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CATEGORIES,
  MOODS,
  PRICES,
  type Category,
  type Mood,
  type Price,
} from "@/lib/data"
import { cn } from "@/lib/utils"

export function MenuFinder() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [moods, setMoods] = useState<Mood[]>([])
  const [price, setPrice] = useState<Price | "any">("any")

  function toggleCategory(id: Category) {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    )
  }

  function toggleMood(id: Mood) {
    setMoods((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    )
  }

  function handleRecommend() {
    const params = new URLSearchParams()
    params.set("mode", "filter")
    if (categories.length) params.set("cat", categories.join(","))
    if (moods.length) params.set("mood", moods.join(","))
    if (price !== "any") params.set("price", price)
    router.push(`/result?${params.toString()}`)
  }

  function handleRandom() {
    router.push("/result?mode=random")
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* 종류 */}
      <fieldset className="mb-7">
        <legend className="mb-3 flex items-center gap-2 font-heading text-lg text-foreground">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
            1
          </span>
          어떤 종류가 땡기나요?
        </legend>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = categories.includes(c.id)
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleCategory(c.id)}
                aria-pressed={active}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-secondary",
                )}
              >
                <span aria-hidden="true">{c.emoji}</span>
                {c.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* 상황/기분 */}
      <fieldset className="mb-7">
        <legend className="mb-3 flex items-center gap-2 font-heading text-lg text-foreground">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
            2
          </span>
          지금 기분은 어때요?
        </legend>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => {
            const active = moods.includes(m.id)
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleMood(m.id)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-foreground hover:border-accent hover:bg-secondary",
                )}
              >
                #{m.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* 가격대 */}
      <fieldset className="mb-8">
        <legend className="mb-3 flex items-center gap-2 font-heading text-lg text-foreground">
          <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
            3
          </span>
          가격대는요?
        </legend>
        <div className="flex flex-wrap gap-2">
          {[...PRICES, { id: "any" as const, label: "상관없음" }].map((p) => {
            const active = price === p.id
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPrice(p.id)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-secondary",
                )}
              >
                {p.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-3">
        <Button
          onClick={handleRecommend}
          className="h-14 w-full rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Sparkles className="size-5" aria-hidden="true" />
          조건대로 추천받기
        </Button>
        <Button
          onClick={handleRandom}
          variant="secondary"
          className="h-14 w-full rounded-2xl border border-border bg-accent text-lg font-bold text-accent-foreground hover:bg-accent/80"
        >
          <Dices className="size-5" aria-hidden="true" />
          아무거나 랜덤 룰렛 돌리기!
        </Button>
      </div>
    </div>
  )
}
