import { useParams } from 'react-router-dom'
import { useGetData } from '../../../hooks/useGetData'
import BackButton from '../../../components/Common/BackButton'
import '../style.scss'


function JobSingle() {
  const { id } = useParams()
  const { data, error, loading } = useGetData(`works/${id}`)

  return (
    <div>
      <BackButton to='/job'/>
      <div className='job_single_wrapper'>
        <div className='main_info'>
          {console.log(data)}
          <p><span>Название:</span>{data?.title}</p>
          <p><span>Описание:</span>{data?.description}</p>
          <p><span>Работники:</span>
            { data?.prices && data?.prices?.length !==0 ? 
              <ul>
                {data?.prices?.map((item, index)=>(
                  <li>{index + 1}. {`${item?.worker?.surname} ${item?.worker?.firstname} ${item?.worker?.lastname}`}</li>
                ))}
              </ul>
              : <>нет</>
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default JobSingle