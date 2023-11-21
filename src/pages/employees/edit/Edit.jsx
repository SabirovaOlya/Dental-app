import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useGetData } from '../../../hooks/useGetData';
import { alert } from '../../../components/Common/alert';
import https from '../../../services/https';
import Loader from '../../../components/Common/Loader';
import BackButton from '../../../components/Common/BackButton'
import SubmitButton from '../../../components/Common/SubmitButton';

function EmployeeEdit() {
  const { id } = useParams()
  const { register, handleSubmit } = useForm()
  const [employee, setEmployee] = useState(null)
  const [ disable, setDisable ] = useState(false)
  const { data, error, loading } = useGetData(`workers/${id}`)

  useEffect(() => {
    if (data) {
      setEmployee(data);
    }
  }, [data]);


  const onSubmit = async (postData) => {
    delete employee?.id

    if(!postData) return alert('Недостаточно данных', 'error')
    setDisable(true)
    
    try {
      const { data } = await https.put(`/workers/${id}`, employee);
      alert("Данные изменены", 'success');
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Ошибка';
      console.log(err);
      alert(errorMessage, 'error');
    }
    finally{
      setDisable(false)
    }
  }


  return (
    <div>
      <BackButton to='/employee' />
      <div className='formik'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formik_inputs'>
            <div className='post_input'>
              Фамилия:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                value={employee?.surname}
                {...register("surname", { required: false })}
                onChange={(e)=>{
                  let newEmployee = {...employee}
                  newEmployee.surname = e.target.value
                  setEmployee(newEmployee)
                }}
              />
            </div>
            <div className='post_input'>
              Имя:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                value={employee?.firstname}
                {...register("firstname", { required: false })}
                onChange={(e)=>{
                  let newEmployee = {...employee}
                  newEmployee.firstname = e.target.value
                  setEmployee(newEmployee)
                }}
              />
            </div>
            <div className='post_input'>
              Отчество:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                value={employee?.lastname}
                {...register("lastname", { required: false })}
                onChange={(e)=>{
                  let newEmployee = {...employee}
                  newEmployee.lastname = e.target.value
                  setEmployee(newEmployee)
                }}
              />
            </div>
            <div className='post_input'>
              Профессия:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                value={employee?.profession}
                {...register("profession", { required: false })}
                onChange={(e)=>{
                  let newEmployee = {...employee}
                  newEmployee.profession = e.target.value
                  setEmployee(newEmployee)
                }}
              />
            </div>
          </div>
          <SubmitButton name={'Изменить'}/>
        </form>
        <Loader disable={disable} />
      </div>
    </div>
  )
}

export default EmployeeEdit