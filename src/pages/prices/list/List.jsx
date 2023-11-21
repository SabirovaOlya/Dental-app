import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetData } from '../../../hooks/useGetData';
import https from '../../../services/https';
import Header from '../../../components/Common/Header';
import AddButton from '../../../components/Common/AddButton';
import TableIcons from '../../../components/Common/TableIcons';


function Prices() {
  const navigate = useNavigate()
  const { data, error, loading } = useGetData('prices')
  const [ prices, setPrices ] = useState([])

  useEffect(()=>{
    console.log(data);
    if(data){
      setPrices(data)
    }
  }, [data])

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const onSingle = (id) =>{
    navigate(`/price/single/${id}`, { replace: true})
  }

  const onEdit = (id) =>{
    navigate(`/price/edit/${id}`, { replace: true})
  }

  const handleDelete = async(id) => {
    try{
      await https
        .delete(`/prices/${id}`)
        .then(_ => {
          setPrices(prices?.filter(item => item?.id !== id))
        })
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <Header title={'Цены'} />
      <AddButton to='/price/form'/>
      <div className='table_container'>
        <table>
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '35%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr key={1}>
              <td className='head_title'>№</td>
              <td className='head_title'>Ф.И.О</td>
              <td className='head_title'>Вид работы</td>
              <td className='head_title'></td>
            </tr>
          </thead>
          <tbody>
            {
              prices?.map((item, index) =>(
                <tr key={`${item} ${index}`}>
                  <td>{index + 1}</td>
                  <td>{item?.worker?.surname} {item?.worker?.firstname} {item?.worker?.lastname}</td>
                  <td>{item?.work?.title}</td>
                  <td>
                    <TableIcons 
                      onSingle={() => onSingle(item?.id)}
                      onEdit={() => onEdit(item?.id)}
                      onDelete={() => handleDelete(item?.id)}
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prices;