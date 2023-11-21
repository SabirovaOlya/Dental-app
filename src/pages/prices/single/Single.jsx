import { useParams } from 'react-router-dom'
import { useGetData } from '../../../hooks/useGetData'
import BackButton from '../../../components/Common/BackButton'


function PriceSingle() {
  const { id } = useParams()
  const { data, error, loading } = useGetData(`prices/${id}`)

  return (
    <div>
      <BackButton to='/price'/>
      <div className='job_single_wrapper'>
        <div className='main_info'>
          {console.log(data)}
          <p><span>Работник:</span>{data?.worker?.surname}.{data?.worker?.firstname?.[0]}.{data?.worker?.lastname?.[0]}</p>
          <p><span>Профессия:</span>{data?.worker?.profession}</p>
          <p><span>Вид работы:</span>{data?.work?.title}</p>
          <p><span>Описание работы:</span>{data?.work?.description}</p>
          <p><span>Цены:</span>
            <ul>
              <li>Модель: <span>${data?.model?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></li>
              <li>Моделировка: <span>${data?.modeling?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></li>
              <li>Пресс: <span>${data?.press?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></li>
              <li>Обработка: <span>${data?.processing?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></li>
              <li>Техник: <span>${data?.technique?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PriceSingle