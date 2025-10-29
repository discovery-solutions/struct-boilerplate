"use client";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ReactNode, useMemo } from "react"

export function SiteHeader({ heading, children }: { heading?: { link: string, label: string }[], children?: ReactNode }) {
  const content = useMemo(() => [{ link: "/dashboard", label: "Dashboard" }, ...(heading || [])], [heading])
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {content && content.length > 0 && (
          <nav>
            <ul className="flex items-center space-x-2">
              {content.map((item, index) => (
                <li key={item.link} className="inline-flex flex-row items-center gap-2">
                  {(index > 0) && (
                    <p className="text-muted-foreground text-sm">/</p>
                  )}
                  <a href={item.link} className="text-muted-foreground hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      {children}
    </header>
  )
}
