import { toast } from "react-toastify"
import { usePatientStore } from "../store"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type PatientDetailProps = {
    patient: Patient
}

export default function PatientDetail({patient}:PatientDetailProps) {
  
  const deletePatient = usePatientStore(state=>state.deletePatient)
  const getPatientById = usePatientStore(state=>state.getPatientById)
  const activeId = usePatientStore(state => state.activeId)

  const handleDelete = (id:Patient["id"]) => {
    deletePatient(id)
    toast.success("Paciente Eliminado Correctamente")
  }

    return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
        <PatientDetailItem label="ID" data={patient.id}/>
        <PatientDetailItem label="Nombre" data={patient.name}/>
        <PatientDetailItem label="Propietario" data={patient.caretaker}/>
        <PatientDetailItem label="Email" data={patient.email}/>
        <PatientDetailItem label="Date" data={patient.date.toString()}/>
        <PatientDetailItem label="Síntomas" data={patient.symptoms}/>
        <div className="flex flex-wrap justify-start gap-3 mt-10">
            <button
            type="button"
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 font-bold uppercase rounded-lg"
            onClick={()=>getPatientById(patient.id)}>
                Editar
            </button>
            <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 font-bold uppercase rounded-lg disabled:opacity-20"
            onClick={()=>handleDelete(patient.id)}
            disabled={activeId === patient.id}>
                Eliminar
            </button>
        </div>
    </div>
  )
}
