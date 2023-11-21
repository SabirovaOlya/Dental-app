import { useParams } from 'react-router-dom'
import { useGetData } from '../../../hooks/useGetData'
import BackButton from '../../../components/Common/BackButton'
import user_img from '../../../assets/images/user.png'
import '../style.scss'

function EmployeeSingle() {
  const { id } = useParams()
  const { data, error, loading } = useGetData(`workers/${id}`)

  return (
    <div>
      <BackButton to='/employee'/>
      <div className='employee_single_wrapper'>
        <p className='title_name'>{data?.surname} {data?.firstname} {data?.lastname}</p>
        <div className='employee_personal_info'>
          <div className='employee_img'>
            <img src={user_img} alt='user_logo' />
          </div>
          <div className='infomation'>
            <p><span>Ф.И.О:</span> {data?.surname} {data?.firstname} {data?.lastname}</p>
            <p><span>Профессия:</span> {data?.profession}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EmployeeSingle