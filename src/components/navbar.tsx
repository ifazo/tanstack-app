'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Home, Compass, MessageCircle, User, Settings } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'

const navItems = [
  { name: 'Home', icon: Home, to: '/' },
  { name: 'Explore', icon: Compass, to: '/explore' },
  { name: 'Chat', icon: MessageCircle, to: '/chat' },
  { name: 'Profile', icon: User, to: '/profile' },
  { name: 'Settings', icon: Settings, to: '/settings' },
]

export function Navbar() {
  const { location } = useRouterState()

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50">
      <Card className="w-full max-w-md flex justify-around items-center py-2 rounded-2xl shadow-lg bg-background border">
        <nav className="flex items-center justify-around w-full">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.name}
                to={item.to}
                className={cn(
                  'flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md',
                  isActive && 'text-primary bg-primary/10',
                )}
              >
                <item.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                <span className="hidden sm:block text-[10px] sm:text-xs md:text-sm font-medium mt-1">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>
      </Card>
    </div>
  )
}
