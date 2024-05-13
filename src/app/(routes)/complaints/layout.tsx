import {db} from "@/lib/db"
import {Sidebar} from "@/app/(routes)/complaints/components/sidebar"

interface ComlpaintsLayoutProps {
  children: React.ReactNode
}

const ComlpaintsLayout: React.FC<ComlpaintsLayoutProps> = async ({children}) => {
  const categories = await db.category.findMany()

  return (
    <div className="container grid grid-cols-5">
      <Sidebar categories={categories} className="hidden lg:block" />
      {children}
    </div>
  )
}

export default ComlpaintsLayout
