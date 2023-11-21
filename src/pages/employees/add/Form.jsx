import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { alert } from '../../../components/Common/alert';
import https from '../../../services/https';
import Loader from '../../../components/Common/Loader';
import BackButton from '../../../components/Common/BackButton'
import SubmitButton from '../../../components/Common/SubmitButton';

function EmployeeForm() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [ disable, setDisable ] = useState(false)

  const onSubmit = async (postData) => {
    console.log(postData);
    if(!postData) return alert('Недостаточно данных', 'error')
    setDisable(true)

    try {
      const { data } = await https.post('/workers', postData);
      alert("Работник добавлен", 'success');
      navigate(`/employee`, { replace: true });
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
                {...register("surname", { required: true })}
              />
            </div>
            <div className='post_input'>
              Имя:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                {...register("firstname", { required: true })}
              />
            </div>
            <div className='post_input'>
              Отчество:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                {...register("lastname", { required: true })}
              />
            </div>
            <div className='post_input'>
              Профессия:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                {...register("profession", { required: true })}
              />
            </div>
          </div>
          <SubmitButton name={'Добавить'}/>
        </form>
        <Loader disable={disable} />
      </div>
    </div>
  )
}

export default EmployeeForm