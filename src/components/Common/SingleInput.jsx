import './style.scss'

function SingleInput({label, value}) {
  return (
    <div className='single_input'>
        <p className='label'>{label}</p>
        <p className='value'>{value}</p>
    </div>
  )
}

export default SingleInput