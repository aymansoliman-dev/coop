'use client'

// import {ChartAreaInteractive} from "@/shared/components/chart-area-interactive";
// import {DataTable} from "@/shared/components/data-table";

export default function Dashboard() {
  return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2 relative">
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
