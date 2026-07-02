import { Pizza, Soup, Fish, Beef, Salad, Coffee } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { MenuFinder } from "@/components/menu-finder"

const FLOATING = [
  { Icon: Soup, className: "left-[6%] top-[18%] text-primary", delay: "0s" },
  { Icon: Pizza, className: "right-[8%] top-[12%] text-accent-foreground", delay: "0.6s" },
  { Icon: Fish, className: "left-[14%] bottom-[16%] text-primary/70", delay: "1.1s" },
  { Icon: Beef, className: "right-[12%] bottom-[20%] text-primary", delay: "0.3s" },
  { Icon: Salad, className: "left-[44%] top-[6%] text-accent-foreground", delay: "1.4s" },
  { Icon: Coffee, className: "right-[40%] bottom-[8%] text-primary/60", delay: "0.9s" },
]

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {FLOATING.map(({ Icon, className, delay }, i) => (
              <span
                key={i}
                className={`animate-float absolute ${className}`}
                style={{ animationDelay: delay }}
              >
                <Icon className="size-10 opacity-70 sm:size-12" />
              </span>
            ))}
          </div>
          <div className="mx-auto max-w-3xl px-4 pb-6 pt-14 text-center sm:pt-20">
            <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
              점심 메뉴 선택 장애 탈출 프로젝트
            </span>
            <h1 className="mt-5 text-balance font-heading text-4xl leading-tight text-foreground sm:text-6xl">
              오늘 점심 메뉴,
              <br />
              <span className="text-primary">우리가 골라줄게!</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              뭐 먹을지 고민하는 시간이 제일 아까워요. 취향만 알려주면 3초 만에
              오늘의 메뉴를 딱 정해드릴게요.
            </p>
          </div>
        </section>

        {/* Finder */}
        <section className="px-4 pb-20 sm:px-6">
          <MenuFinder />
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <p className="text-center text-sm text-muted-foreground">
          오늘 뭐 먹지? · 직장인과 학생을 위한 점심 메뉴 추천 서비스
        </p>
      </footer>
    </div>
  )
}
