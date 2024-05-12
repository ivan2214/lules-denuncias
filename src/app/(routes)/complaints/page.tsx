import {Suspense} from "react";

import {Separator} from "@/components/ui/separator";
import {SearchBar} from "@/components/search-bar";
import SearchBarFallback from "@/components/fallbacks/search-bar-fallback";
import {type QueryProps, getFilteredComplaints} from "@/actions/complaints/get-filtered-complaints";
import {ComplaintArticle} from "@/components/complaint-article";
import {QueryComponent} from "@/app/(routes)/complaints/components/query-component";

export default async function ComplaintsPage({searchParams}: {searchParams?: QueryProps}) {
  const {complaints} = await getFilteredComplaints(searchParams);

  const hasQuery = searchParams && Object.keys(searchParams).length > 0;

  return (
    <main className="col-span-5 border-t lg:col-span-4 lg:border-l">
      <section className="h-full px-4 py-6 lg:px-8">
        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Suspense fallback={<SearchBarFallback />}>
            <SearchBar />
          </Suspense>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">Listado de ofertas</h2>
            <p className="text-sm text-muted-foreground">
              Encuentra las mejores ofertas, descuentos y promociones.
            </p>
          </div>
        </div>

        {hasQuery ? <QueryComponent searchParams={searchParams} /> : null}

        <Separator className="my-4" />

        <section className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] place-items-center gap-10">
          {complaints.map((complaint) => (
            <ComplaintArticle
              key={complaint.id}
              aspectRatio="portrait"
              className="w-[250px]"
              complaint={complaint}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
