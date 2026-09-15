'use client'

// import {ChartAreaInteractive} from "@/components/chart-area-interactive";
// import {DataTable} from "@/components/data-table";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();
  useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) router.push('login')
  }, [router])

  return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 relative">
          <div className="ball absolute w-lg aspect-square rounded-full bg-[#00DBF3] right-0 -top-8 opacity-15 blur-[640rem]"></div>
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 relative z-20">
            {/*<div className="px-4 lg:px-6">*/}
            {/*  <ChartAreaInteractive />*/}
            {/*</div>*/}
            {/*<DataTable data={data} />*/}
          </div>
        </div>
      </div>
  )
}
