"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { RefreshCw, MapPin, Share2, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  MENUS,
  CATEGORY_LABEL,
  filterMenus,
  pickRandom,
  type Category,
  type Menu,
  type Mood,
  type Price,
  type FilterState,
} from "@/lib/data"

function parseFilters(params: URLSearchParams): FilterState {
  const cat = params.get("cat")
  const mood = params.get("mood")
  const price = params.get("price")
  return {
    categories: cat ? (cat.split(",") as Category[]) : [],
    moods: mood ? (mood.split(",") as Mood[]) : [],
    price: (price as Price | null) ?? "any",
  }
}

export function ResultView() {
  const router = useRouter()
  const params = useSearchParams()

  const mode = params.get("mode") ?? "random"

  const pool = useMemo(() => {
    if (mode === "filter") {
      const filtered = filterMenus(parseFilters(params))
      return filtered.length > 0 ? filtered : MENUS
    }
    return MENUS
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, params.toString()])

  const noMatch = useMemo(() => {
    if (mode !== "filter") return false
    return filterMenus(parseFilters(params)).length === 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, params.toString()])

  const [spinning, setSpinning] = useState(true)
  const [result, setResult] = useState<Menu | null>(null)
  const [reel, setReel] = useState<Menu>(() => pickRandom(pool))
  const [copied, setCopied] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function runSpin() {
    setSpinning(true)
    setResult(null)
    let ticks = 0
    const totalTicks = 16
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setReel(pickRandom(pool))
      ticks += 1
      if (ticks >= totalTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        const final = pickRandom(pool)
        setReel(final)
        setResult(final)
        setSpinning(false)
      }
    }, 90)
  }

  // Run spin on mount and whenever the pool identity changes.
  useEffect(() => {
    runSpin()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool])

  async function handleShare() {
    const url = window.location.href
    const menu = result
    const text = menu
      ? `오늘 점심은 '${menu.name}' 어때요? - 오늘 뭐 먹지?`
      : "오늘 뭐 먹지?"
    if (navigator.share) {
      try {
        await navigator.share({ title: "오늘 뭐 먹지?", text, url })
        return
      } catch {
        // user cancelled; fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const display = spinning ? reel : result ?? reel

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        처음으로
      </Link>

      <p className="text-center text-sm font-bold uppercase tracking-wide text-primary">
        {spinning
          ? "메뉴 고르는 중..."
          : mode === "random"
            ? "랜덤 룰렛 결과"
            : "맞춤 추천 결과"}
      </p>
      <h1 className="mt-1 text-center font-heading text-3xl text-foreground">
        {spinning ? "두구두구두구!" : "오늘의 점심은"}
      </h1>

      <div className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          <Image
            key={display.id}
            src={display.image || "/placeholder.svg"}
            alt={display.name}
            fill
            sizes="(max-width: 512px) 100vw, 512px"
            className={`object-cover transition-all duration-150 ${
              spinning ? "scale-105 blur-sm" : "scale-100 blur-0"
            }`}
            priority
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur">
            {CATEGORY_LABEL[display.category]}
          </span>
        </div>

        <div className="p-6 text-center">
          <h2 className="font-heading text-3xl text-foreground">
            {display.name}
          </h2>
          {!spinning && result && (
            <>
              <p className="mt-3 text-pretty font-semibold text-primary">
                {result.tagline}
              </p>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {result.description}
              </p>
            </>
          )}
          {spinning && (
            <p className="mt-3 text-sm text-muted-foreground">
              맛있는 메뉴를 고르고 있어요
            </p>
          )}
        </div>
      </div>

      {noMatch && !spinning && (
        <p className="mt-4 rounded-xl bg-accent/50 px-4 py-3 text-center text-sm font-medium text-accent-foreground">
          조건에 딱 맞는 메뉴가 없어서 전체 메뉴 중에서 골랐어요!
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Button
          onClick={runSpin}
          disabled={spinning}
          variant="secondary"
          className="h-12 rounded-xl border border-border bg-background font-bold text-foreground hover:bg-secondary sm:col-span-1"
        >
          <RefreshCw
            className={`size-4 ${spinning ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          다른 메뉴
        </Button>
        <Button
          asChild
          disabled={spinning}
          className="h-12 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Link href={result ? `/map?menu=${result.id}` : "#"}>
            <MapPin className="size-4" aria-hidden="true" />
            주변 맛집 보기
          </Link>
        </Button>
        <Button
          onClick={handleShare}
          disabled={spinning}
          variant="secondary"
          className="h-12 rounded-xl border border-border bg-accent font-bold text-accent-foreground hover:bg-accent/80"
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Share2 className="size-4" aria-hidden="true" />
          )}
          {copied ? "복사됨!" : "공유하기"}
        </Button>
      </div>
    </div>
  )
}
