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


function PriceEdit() {
  const { id } = useParams()
  const { register, handleSubmit } = useForm()
  const [ price, setPrice ] = useState(null)
  const [ jobs, setJobs ] = useState([])
  const [ disable, setDisable ] = useState(false)
  const [ employees, setEmployees ] = useState([])
  const { data, error, loading } = useGetData(`prices/${id}`)

  useEffect(() => {
    if (data) {
      setPrice(data);
    }
  }, [data]);

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
                  value={employees?.find(x => x?.value === price?.worker?.id)}
                  defaultValue={employees?.find(x => x?.value === price?.worker?.id)}
                  options={employees}
                  className='buyurtma_select_new group_selector'
                  styles={customStyles}
                  theme={makeTheme}
                  onChange={(event) => {
                    let newPrice = {...price}
                    newPrice.worker.id = event.value
                    setPrice(newPrice)
                  }}
              />
            </div>
            <div className='option_select'>
              <p>Вид Работы:</p>
              <Select
                value={jobs?.find(x => x?.value === price?.work?.id)}
                defaultValue={jobs?.find(x => x?.value === price?.work?.id)}
                options={jobs}
                className='buyurtma_select_new group_selector'
                styles={customStyles}
                theme={makeTheme}
                onChange={(event) => {
                  let newPrice = {...price}
                  newPrice.work.id = event.value
                  setPrice(newPrice)
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
                value={price?.model}
                {...register("model", { required: false })}
                onChange={(event) => {
                  let newPrice = {...price}
                  newPrice.model = event.target.value
                  setPrice(newPrice)
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
                value={price?.modeling}
                {...register("modeling", { required: false })}
                onChange={(event) => {
                  let newPrice = {...price}
                  newPrice.modeling = event.target.value
                  setPrice(newPrice)
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
                value={price?.press}
                {...register("press", { required: false })}
                onChange={(event) => {
                  let newPrice = {...price}
                  newPrice.press = event.target.value
                  setPrice(newPrice)
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
                value={price?.processing}
                {...register("processing", { required: false })}
                onChange={(event) => {
                  let newPrice = {...price}
                  newPrice.processing = event.target.value
                  setPrice(newPrice)
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
                value={price?.technique}
                {...register("technique", { required: false })}
                onChange={(event) => {
                  let newPrice = {...price}
                  newPrice.technique = event.target.value
                  setPrice(newPrice)
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

export default PriceEdit