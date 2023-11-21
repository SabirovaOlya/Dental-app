import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import { useGetData } from '../../../hooks/useGetData';
import { alert } from '../../../components/Common/alert';
import https from '../../../services/https';
import Loader from '../../../components/Common/Loader';
import BackButton from '../../../components/Common/BackButton'
import SubmitButton from '../../../components/Common/SubmitButton';

function JobEdit() {
  const { id } = useParams()
  const { register, handleSubmit } = useForm()
  const [job, setJob] = useState(null)
  const [ disable, setDisable ] = useState(false)
  const { data, error, loading } = useGetData(`works/${id}`)

  useEffect(() => {
    if (data) {
      setJob(data);
    }
  }, [data]);


  const onSubmit = async (postData) => {
    delete job?.id

    if(!postData) return alert('Недостаточно данных', 'error')
    setDisable(true)
    
    try {
      const { data } = await https.put(`/works/${id}`, job);
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
      <BackButton to='/job' />
      <div className='formik'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formik_inputs'>
            <div className='post_input'>
              Название:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                value={job?.title}
                {...register("title", { required: false })}
                onChange={(e)=>{
                  let newJob = {...job}
                  newJob.title = e.target.value
                  setJob(newJob)
                }}
              />
            </div>
            <div className='post_input'>
              Описание:
              <input 
                className='formit_inputs_input'
                autocomplete="off"
                value={job?.description}
                {...register("description", { required: false })}
                onChange={(e)=>{
                  let newJob = {...job}
                  newJob.description = e.target.value
                  setJob(newJob)
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

export default JobEdit