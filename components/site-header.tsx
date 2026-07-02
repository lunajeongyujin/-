import Link from "next/link"
import { UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <UtensilsCrossed className="size-5" aria-hidden="true" />
          </span>
          <span className="font-heading text-xl text-foreground">오늘 뭐 먹지?</span>
        </Link>
        <nav className="flex items-center gap-2" aria-label="사용자 메뉴">
          <Button
            variant="ghost"
            className="text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            로그인
          </Button>
          <Button className="rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            회원가입
          </Button>
        </nav>
      </div>
    </header>
  )
}
