import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  console.log(session)

  return {
    props: {}
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  const isCreatedOneMonthAgo = (createdAt: any) => {
    if (!createdAt) {
      return false; // Se a data de criação for nula, consideramos que não foi criado há um mês
    }

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Convertendo as datas para números para poder compará-las
    const createdAtDate = new Date(createdAt);
    return createdAtDate.getTime() >= oneMonthAgo.getTime();
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Novidades" data={movies.filter((movie: any) => isCreatedOneMonthAgo(movie?.createdAt))} />
        <MovieList title="Tendências" data={movies} />
        <MovieList title="Ação" data={movies.filter((movie: any) => movie.genre === 'Action')} />
        <MovieList title="Minha lista" data={favorites} />
      </div>
    </>
  );
}

export default Home;
