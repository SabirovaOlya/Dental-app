import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { alert } from '../../../components/Common/alert';
import https from '../../../services/https';
import Loader from '../../../components/Common/Loader';
import BackButton from '../../../components/Common/BackButton'
import SubmitButton from '../../../components/Common/SubmitButton';
import { makeTheme, customStyles } from '../../../components/Common/inputStyle';


function PriceForm() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [ disable, setDisable ] = useState(false)
  const [ jobs, setJobs ] = useState([])
  const [ employees, setEmployees ] = useState([])
  const [ selectedJob, setSelectedJob ] = useState(null)
  const [ selectedEmployee, setSelectedEmployee ] = useState(null)

  const getAllJobs = async() =>{
    try{
      const res = await https.get('works')
      const { data } = res?.data

      let allJobs = []
      data?.map(item=>{
        allJobs.push({
          value: item?.id,
          label: item?.title
        })
      })
      setSelectedJob(allJobs[0])
      setJobs(allJobs)
    }
    catch(err){
      console.log(err);
    }
  }

  const getAllEmployees = async() =>{
    try{
      const res = await https.get('workers')
      const { data } = res?.data

      let allEmployees = []
      data?.map(item=>{
        allEmployees.push({
          value: item?.id,
          label: `${item?.surname}.${item?.firstname?.[0]}.${item?.lastname?.[0]}`
        })
      })
      setSelectedEmployee(allEmployees[0])
      setEmployees(allEmployees)
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getAllJobs()
    getAllEmployees()
  },[])

  const onSubmit = async (postData) => {
    if(!postData) return alert('Недостаточно данных', 'error')
    setDisable(true)
    
    const numericFields = ['model', 'modeling', 'press', 'processing', 'technique'];
    const info = {...postData};
    
    numericFields.forEach((field) => {
      info[field] = parseFloat(info[field]);
    });

    Object.assign(info, {work_id: selectedJob?.value, worker_id: selectedEmployee?.value})
    console.log(info);

    try {
      const { data } = await https.post('/prices', info);
      alert("Добавлено", 'success');
      navigate(`/price`, { replace: true });
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
      <BackButton to='/price' />
      <div className='formik'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formik_inputs'>
            <div className='option_select'>
              <p>Работник:</p>
              <Select
                value={selectedEmployee}
                defaultValue={selectedEmployee}
                options={employees}
                className='buyurtma_select_new group_selector'
                styles={customStyles}
                theme={makeTheme}
                onChange={(event) => {
                  setSelectedEmployee(event)
                }}
              />
            </div>
            <div className='option_select'>
              <p>Вид Работы:</p>
              <Select
                value={selectedJob}
                defaultValue={selectedJob}
                options={jobs}
                className='buyurtma_select_new group_selector'
                styles={customStyles}
                theme={makeTheme}
                onChange={(event) => {
                  setSelectedJob(event)
                }}
              />
            </div>
            <div className='post_input'>
              Модель:
              <input
                min="0" 
                step="0.01"
                type='number'
                autocomplete="off"
                className='formit_inputs_input'
                {...register("model", { required: true })}
              />
            </div>
            <div className='post_input'>
              Моделировка:
              <input
                min="0" 
                step="0.01"
                type='number'
                autocomplete="off"
                className='formit_inputs_input'
                {...register("modeling", { required: true })}
              />
            </div>
            <div className='post_input'>
              Пресс:
              <input
                min="0" 
                step="0.01"
                type='number'
                autocomplete="off"
                className='formit_inputs_input'
                {...register("press", { required: true })}
              />
            </div>
            <div className='post_input'>
              Обработка:
              <input
                min="0" 
                step="0.01"
                type='number'
                autocomplete="off"
                className='formit_inputs_input'
                {...register("processing", { required: true })}
              />
            </div>
            <div className='post_input'>
              Техник:
              <input
                min="0" 
                step="0.01"
                type='number'
                autocomplete="off"
                className='formit_inputs_input'
                {...register("technique", { required: true })}
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

export default PriceForm