import { SectionCards } from "@/components/dashboard/section-cards";
import { SiteHeader } from "@/components/site-header";
import { UsersTable } from "@/components/dashboard/users-table";

export default async function Page() {

  return (
    <>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-0 py-4">
            <SectionCards />

            <UsersTable />
          </div>
        </div>
      </div>
    </>
  )
}