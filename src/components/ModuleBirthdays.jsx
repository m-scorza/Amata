export default function ModuleBirthdays({ data }) {

 const { aniversariantesSemana, aniversariantesMes } = data
 const [tab, setTab] = useState("semana")

 const lista = tab === "semana"
   ? aniversariantesSemana
   : aniversariantesMes

 return (

  <div className="space-y-6">

   <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-white">
        🎂 Aniversários
      </h2>

      <div className="flex gap-2">
        <button onClick={()=>setTab("semana")}>
          Semana
        </button>

        <button onClick={()=>setTab("mes")}>
          Mês
        </button>
      </div>
   </div>

   <SortableTable
      data={lista}
      columns={anivColumns}
   />

  </div>
 )
}
