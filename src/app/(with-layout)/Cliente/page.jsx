'use client'
import { readUserAllData, updateUserData } from '@/supabase/utils'
import { useUser } from '@/context/Context.js'

import style from './Cliente.module.css'
import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'

import Tag from '../../../components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect } from 'react'


function Home() {
    const { productDB, setUserProduct, setUserItem } = useUser()

    const router = useRouter()


    function seeMore(i) {
        setUserItem(i)
        router.push('/Producto')
    }


    useEffect(() => {
        readUserAllData('Producto', productDB, setUserProduct)

    }, []);

    return (


        <main className={style.main}>
            <Subtitle htmlFor="">Categorias</Subtitle>
            <div className="flex flex-wrap justify-between">
                <Tag styled='tagPrimary'>Los mas recientes</Tag>
                <Tag styled='tagSecondary'>En oferta</Tag>
                <Tag styled='tagSecondary'>Recientes</Tag>
                <Tag styled='tagSecondary'>Otros</Tag>
            </div>
            <br />
            {productDB !== null && productDB !== undefined &&
                productDB.map((i, index) => {

                 return   <div className={style.card}>
                        <p>

                            <span>{i.nombre}</span><span>{i.costo}</span>
                        </p>
                        <img src={i.url} alt="" />
                        <div>
                            <Button theme='Primary' styled='miniButtonSecondaryGreen' click={()=>seeMore(i)}>Ver +</Button>
                            <Button theme='Success' click={seeMore}>Comprar</Button>
                        </div>
                        <span className='text-center'>{i.empresa}</span>
                    </div>


                })
            }

        </main>


    )
}

export default WithAuth(Home)




