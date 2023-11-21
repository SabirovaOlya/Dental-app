import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useGetData } from '../../../hooks/useGetData';
import { alert } from '../../../components/Common/alert';
import https from '../../../services/https';
import Loader from '../../../components/Common/Loader';
import BackButton from '../../../components/Common/BackButton'
import SubmitButton from '../../../components/Common/SubmitButton';
import { makeTheme, customStyles } from '../../../components/Common/inputStyle';


function OrderForm() {
  const { id } = useParams()
  const { register, handleSubmit } = useForm()
  const [ disable, setDisable ] = useState(false)
  const [ order, setOrder ] = useState({
    worker_id: 0,
    work_id: 0,
    total_cost: 0,
    date: '',
    model_count: 0,
    modeling_count: 0,
    press_count: 0,
    processing_count: 0,
    technique_count: 0,
    percent: 0
  })
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

  const getTotalCost = () =>{

  }

  useEffect(()=>{
    getAllJobs()
    getAllEmployees()
  },[])

  const onSubmit = async (postData) => {
    delete price?.id

    if(!postData) return alert('Недостаточно данных', 'error')
    setDisable(true)

    const info = JSON.parse(JSON.stringify(price))
    Object.assign(info, {work_id: price?.work?.id, worker_id: price?.worker?.id})
    delete info?.work
    delete info?.worker


    try {
      const { data } = await https.put(`/prices/${id}`, info);
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
                    let newOrder = {...order}
                    newOrder.worker_id = event.value
                    setOrder(newOrder)
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
                  let newOrder = {...order}
                  newOrder.work_id = event.value
                  setOrder(newOrder)
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
                autoComplete="off"
                className='formit_inputs_input'
                value={order?.model_count}
                {...register("model_count", { required: false })}
                onChange={(event) => {
                  let newOrder = {...order}
                  newOrder.model_count = event.value
                  setOrder(newOrder)
                }}
              />
            </div>
            <div className='post_input'>
              Моделировка:
              <input
                min="0" 
                step="0.01"
                type='number'
                autoComplete="off"
                className='formit_inputs_input'
                value={order?.modeling_count}
                {...register("modeling_count", { required: false })}
                onChange={(event) => {
                  let newOrder = {...order}
                  newOrder.modeling_count = event.value
                  setOrder(newOrder)
                }}
              />
            </div>
            <div className='post_input'>
              Пресс:
              <input
                min="0" 
                step="0.01"
                type='number'
                autoComplete="off"
                className='formit_inputs_input'
                value={order?.press_count}
                {...register("press_count", { required: false })}
                onChange={(event) => {
                  let newOrder = {...order}
                  newOrder.press_count = event.value
                  setOrder(newOrder)
                }}
              />
            </div>
            <div className='post_input'>
              Обработка:
              <input
                min="0" 
                step="0.01"
                type='number'
                autoComplete="off"
                className='formit_inputs_input'
                value={order?.processing_count}
                {...register("processing_count", { required: false })}
                onChange={(event) => {
                  let newOrder = {...order}
                  newOrder.processing_count = event.value
                  setOrder(newOrder)
                }}
              />
            </div>
            <div className='post_input'>
              Техник:
              <input
                min="0" 
                step="0.01"
                type='number'
                autoComplete="off"
                className='formit_inputs_input'
                value={order?.technique_count}
                {...register("technique_count", { required: false })}
                onChange={(event) => {
                  let newOrder = {...order}
                  newOrder.technique_count = event.value
                  setOrder(newOrder)
                }}
              />
            </div>
            <div className='post_input'>
              Процент:
              <input
                min="0" 
                step="0.01"
                type='number'
                autoComplete="off"
                className='formit_inputs_input'
                value={order?.percent}
                {...register("percent", { required: false })}
                onChange={(event) => {
                  let newOrder = {...order}
                  newOrder.percent = event.value
                  setOrder(newOrder)
                }}
              />
            </div>
            <div className='post_input'>
              Общая сумма:
              <input
                min="0" 
                step="0.01"
                type='number'
                autoComplete="off"
                className='formit_inputs_input'
                value={order?.total_cost}
                {...register("total_cost", { required: false })}
                readOnly
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

export default OrderForm