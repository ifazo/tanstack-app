'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Search,
  Sun,
  Moon,
  LogIn,
  LogOut,
  User,
  Home,
  Compass,
  MessageCircle,
  Users2,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getUser } from '@/store'
import { useSignOut } from '@/lib/mutations'
import { Link, useRouterState } from '@tanstack/react-router'

const navItems = [
  { name: 'Home', icon: Home, to: '/' },
  { name: 'Video', icon: Compass, to: '/video' },
  { name: 'Chat', icon: MessageCircle, to: '/chat' },
  { name: 'Friends', icon: Users2, to: '/friends' },
  { name: 'Profile', icon: User, to: '/profile' },
]

export function Header() {
  const user = getUser()
  const signOut = useSignOut()

  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const { location } = useRouterState()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md border-b border-border/40">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 h-16 flex items-center justify-between">
          {/* Left group: logo, divider, nav */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  TSA
                </span>
              </div>
              <span className="hidden lg:block font-semibold text-lg text-foreground">
                Tanstack App
              </span>
            </Link>

            {/* vertical divider between logo and nav (hidden on very small creens) */}
            <div className="hidden sm:block h-6 border-l border-primary" />
            {/* Navigation placed to the left of header, visible at sm+ */}
            <nav className="hidden sm:flex items-center space-x-2 ml-1">
              {navItems.map((item) => {
                const isActive = location?.pathname === item.to
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={cn(
                      'flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md',
                      isActive && 'text-primary bg-secondary',
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-10 w-full max-w-[180px] sm:max-w-[360px] md:max-w-[520px] lg:max-w-[680px] bg-background/50 border-border/60 focus:bg-background transition-all"
              />
            </div>

            {/* Theme Toggle (render placeholder until mounted) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 relative"
            >
              {mounted ? (
                <>
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </>
              ) : (
                <div className="h-4 w-4 rounded-full bg-muted" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Login/Logout */}
            {user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-9 h-9">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => signOut.mutate()}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4" />
                  {/* <span className="hidden sm:inline">Login</span> */}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
