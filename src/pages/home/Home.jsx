import React from 'react'
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/Common/Header'
import axios from 'axios';

function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: 'repoData',
    queryFn: () =>
      axios.get(
        'https://dental-app.financial-project.uz/api/prices'
      ).then((response) => console.log(response))
  });


  return (
    <div>
      <Header title={'Главная'} />
    </div>
  )
}

export default Home