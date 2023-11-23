"use server"
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import Head from 'next/head';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  const [isMouseOver, setIsMouseOver] = useState(true);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    const handleMouseMove = () => {
      setIsMouseOver(true);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsMouseOver(false);
      }, 4000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      <Head>
        <title>{data?.title || 'Watch'}</title>
      </Head>
      <nav
        className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 transition-opacity ${
          isMouseOver ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ArrowLeftIcon onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Assistindo:</span> {data?.title}
        </p>
      </nav>
      {data?.videoUrl.includes('mp4') || data?.videoUrl.includes('mkv') || data?.videoUrl.includes('mp') ? (
        <video className="h-full w-full" autoPlay controls controlsList="nodownload" src={data?.videoUrl}></video>
      ) : (
        <iframe className="h-full w-full" src={data?.videoUrl} width="640" height="480" allow="autoplay"></iframe>
      )}
    </div>
  );
};

export default Watch;
