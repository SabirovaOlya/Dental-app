import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetData } from '../../../hooks/useGetData';
import https from '../../../services/https';
import Header from '../../../components/Common/Header';
import AddButton from '../../../components/Common/AddButton';
import TableIcons from '../../../components/Common/TableIcons';


function Orders() {
  const navigate = useNavigate()
  const { data, error, loading } = useGetData('completed-orders')
  const [ orders, setOrders ] = useState([])

  useEffect(()=>{
    console.log(data);
    if(data){
      setOrders(data)
    }
  }, [data])

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const onSingle = (id) =>{
    navigate(`/order/single/${id}`, { replace: true})
  }

  const onEdit = (id) =>{
    navigate(`/order/edit/${id}`, { replace: true})
  }

  const handleDelete = async(id) => {
    try{
      await https
        .delete(`/completed-orders/${id}`)
        .then(_ => {
          setOrders(orders?.filter(item => item?.id !== id))
        })
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <Header title={'Заказы'} />
      <AddButton to='/order/form'/>
      <div className='table_container'>
        <table>
          <colgroup>
            <col style={{ width: '5%' }} />
            <col style={{ width: '50%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '20%' }} />
          </colgroup>
          <thead>
            <tr key={1}>
              <td className='head_title'>№</td>
              <td className='head_title'>Название</td>
              <td className='head_title'>Работники</td>
              <td className='head_title'></td>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((item, index) =>(
                <tr key={`${item} ${index}`}>
                  <td>{index + 1}</td>
                  <td>{item?.title}</td>
                  <td>
                    {
                      findWorkers(item?.prices)?.length > 2 ? findWorkers(item?.prices)?.slice(0, 2)?.join(',') + ' ...' : findWorkers(item?.prices)?.join(',')
                    }
                  </td>
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

export default Orders;