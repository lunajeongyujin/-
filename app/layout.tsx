import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Jua, Gothic_A1 } from 'next/font/google'
import './globals.css'

const jua = Jua({
  variable: '--font-jua',
  weight: '400',
  subsets: ['latin'],
})

const gothicA1 = Gothic_A1({
  variable: '--font-gothic',
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '오늘 뭐 먹지? | 점심 메뉴 추천',
  description:
    '점심 메뉴 선택 장애를 겪는 직장인과 학생을 위한 메뉴 추천 서비스. 취향 필터와 랜덤 룰렛으로 오늘의 점심을 골라드려요.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#FF6B6B',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`light ${jua.variable} ${gothicA1.variable} bg-background`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
