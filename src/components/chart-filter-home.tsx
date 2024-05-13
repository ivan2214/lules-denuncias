import {StatusComplaint} from "@prisma/client"

import {type ComplaintExtends} from "@/actions/complaints/get-filtered-complaints"

import {Input} from "./ui/input"
import {Label} from "./ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select"
import {BarChart} from "./ba-chart"

const statusOptions = [
  {label: "Cerrado", value: StatusComplaint.CLOSED},
  {label: "En progreso", value: StatusComplaint.IN_PROGRESS},
  {label: "Abierto", value: StatusComplaint.OPEN},
  {label: "Pendiente", value: StatusComplaint.PENDING},
  {label: "Resuelto", value: StatusComplaint.RESOLVED},
  {label: "No resuelto", value: StatusComplaint.UNRESOLVED},
]

interface ChartFilterHomeProps {
  complaints: ComplaintExtends[]
}

export const ChartFilterHome: React.FC<ChartFilterHomeProps> = ({complaints}) => {
  return (
    <div>
      <div className="flex flex-col items-start space-y-4">
        <div className="dark: inline-block  rounded-lg px-3 py-1 text-sm">Explorar quejas</div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Vea lo que está sucediendo en su comunidad
        </h2>
        <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Explore las quejas recientes de la comunidad y filtre por ubicación, categoría o estado
          para mantenerse informado.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" placeholder="Search complaints" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="filter">Filter</Label>
          <Select defaultValue="select">
            <SelectTrigger id="filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="select">Seleccionar</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6">
        <BarChart className="aspect-[4/3] w-full" data={complaints} />
      </div>
    </div>
  )
}
