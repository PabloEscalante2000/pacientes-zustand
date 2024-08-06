import { useForm } from "react-hook-form"
import Error from "./Error";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store";
import { useEffect } from "react";
import {toast} from 'react-toastify';


export default function PatientForm() {

    const {addPatient} = usePatientStore()
    const {activeId, patients, updatePatient} = usePatientStore()
    
    const {register, handleSubmit, setValue, formState:{errors}, reset} = useForm<DraftPatient>()

    const registerPatient = (data: DraftPatient) => {
        if(activeId){
            updatePatient(data)
            toast.success("Paciente Actualizado Correctamente")
        } else {
            addPatient(data)
            toast.success("Paciente Registrado Correctamente")
        }
        reset()
    }

    useEffect(()=>{
        if(activeId) {
            const acvtivePatient = patients.filter(p=>p.id === activeId)[0]
            setValue("name",acvtivePatient.name)
            setValue("caretaker",acvtivePatient.caretaker)
            setValue("email",acvtivePatient.email)
            setValue("symptoms",acvtivePatient.symptoms)
            setValue("date",acvtivePatient.date)
        }
    }, [activeId])
  
    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes </h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register("name", {
                            required:"El nombre del paciente es obligatorio"
                        })}
                    />
                    
                    {errors.name && (
                        <Error>{errors.name?.message?.toString()}</Error>
                    )}
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Propietario 
                  </label>
                  <input  
                      id="caretaker"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Propietario" 
                      {...register("caretaker", {
                        required:"El nombre del propietario es obligatorio"
                    })}
                  />
                    {errors.caretaker && (
                        <Error>{errors.caretaker?.message?.toString()}</Error>
                    )}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register("email", {
                        required: "El Email es Obligatorio",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email No Válido'
                        }
                      })} 
                />
                    {errors.email && (
                        <Error>{errors.email?.message?.toString()}</Error>
                    )}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register("date",{
                        required:"La fecha de alta es obligatoria"
                      })}
                  />
                    {errors.date && (
                        <Error>{errors.date?.message?.toString()}</Error>
                    )}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register("symptoms",{
                        required:"Tiene que haber una descripción"
                      })}
                  ></textarea>
                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message?.toString()}</Error>
                    )}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value={activeId ? "Actualizar Paciente" : 'Guardar Paciente'}  
              />
          </form> 
      </div>
    )
  }
