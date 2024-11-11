'use client'

import { UserStats } from '@/types/userStats';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FetchError {
    message: string;
}

export default function DuoStats() {
    const [data, setData] = useState<UserStats | null>(null);
    const [error, setError] = useState<FetchError | null>(null);

    const username = "luizobara";
    const urlProfile = "https://www.duolingo.com/profile/" + username;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.duolingo.com/2017-06-30/users?username=${username}`);
                if (!response.ok) {                    
                    throw new Error('Erro ao buscar os dados');
                }
                const result = await response.json();
    
                if (result.users && result.users.length > 0) {
                    setData(result.users[0]);
                } else {
                    setError({ message: 'Usuário não encontrado' });
                }
            } catch (error) {
                setError({ message: error instanceof Error ? error.message : 'Erro desconhecido' });                              
            }
        };
        fetchData();
    }, [username]);    
    
    if (error) {
        return <h3 className='dark:text-zinc-50'>{error.message}</h3>; 
    }
    
    if (!data) {
        return <h3 className='dark:text-zinc-50'>Loading...</h3>; 
    }

    let isDoneToday = false;
    let endDate: Date | null = null;

    if (data.streak > 0 && data.streakData.currentStreak && data.streakData.currentStreak.endDate) {
        endDate = new Date(data.streakData.currentStreak.endDate);
        const currentDate = new Date();
        
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        isDoneToday = endDate >= currentDate;
    } else {
        endDate = null;
        isDoneToday = false;
    }

    return (
        <div className='w-full h-screen bg-duolingo-400 p-2'>            
            {data ? (
                <Link href={urlProfile} target='blank'>                        
                    <div className="bg-white dark:bg-black h-full w-full rounded-lg p-2">
                        <div className="relative flex justify-center">
                            <Image
                                src={`https:${data.picture}/xlarge`}
                                alt='Imagem de Perfil'
                                width={100}
                                height={100}
                                loading = 'lazy'
                                style={{ objectFit: 'contain', borderRadius: '100%'}}
                            >                        
                            </Image>
                        </div>
                        <div className="mt-2 flex w-full justify-center">
                            <div className="w-auto dark:text-zinc-50">
                                <h2 className='text-center text-lg font-semibold'>
                                    {data.name}
                                </h2>
                                <p>Ofensiva Atual:&nbsp;
                                    <span 
                                        className={
                                            `font-semibold
                                            ${isDoneToday ? 'text-orange-600' : 'text-blue-400'}`
                                        }
                                    >
                                        {data.streak}
                                    </span>
                                </p>
                                <p>XP:&nbsp;
                                    <span className='text-yellow-400 font-semibold'>
                                        {data.totalXp}
                                    </span>
                                </p>
                                <p>Já Praticou Hoje? 
                                    <span className={`${isDoneToday ? 'text-lime-400' : 'text-violet-700'} font-semibold`}>
                                    {isDoneToday ? ' Sim' : ' Ainda não'}</span>
                                </p>
                                <h3 className='text-sm leading-tight text-muted-foreground hover:text-sky-500 font-semibold'>
                                            @{data.username}
                                </h3>
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">
                            <Image
                                src='https://d35aaqx5ub95lt.cloudfront.net/vendor/70a4be81077a8037698067f583816ff9.svg'
                                alt='logo duolingo'
                                width={80}
                                height={10}
                                loading = 'lazy'
                                style={{ textAlign: 'center' }}
                                >
                            </Image>
                        </div>
                    </div>
                </Link>                            
            ): (                
                <p>Loading...</p>
            )}
        </div>
    );
}