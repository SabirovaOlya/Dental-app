import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { alert } from '../../../components/Common/alert';
import https from '../../../services/https';
import Loader from '../../../components/Common/Loader';
import BackButton from '../../../components/Common/BackButton'
import SubmitButton from '../../../components/Common/SubmitButton';

function JobForm() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [ disable, setDisable ] = useState(false)

  const onSubmit = async (postData) => {
    console.log(postData);
    if(!postData) return alert('Недостаточно данных', 'error')
    setDisable(true)

    try {
      const { data } = await https.post('/works', postData);
      alert("Работа добавлена", 'success');
      navigate(`/job`, { replace: true });
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
      <BackButton to='/job' />
      <div className='formik'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formik_inputs'>
            <div className='post_input'>
              Название:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                {...register("title", { required: true })}
              />
            </div>
            <div className='post_input'>
              Описание:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                {...register("description", { required: true })}
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

export default JobForm