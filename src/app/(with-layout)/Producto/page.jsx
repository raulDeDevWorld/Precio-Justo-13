'use client'


import Image from 'next/image'
import Link from 'next/link'
import style from '../Cliente/Cliente.module.css'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'

import Tag from '../../../components/Tag'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'

import { useMask } from '@react-input/mask';


export default function Home() {
    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });

    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const router = useRouter()
    const { item } = useUser()


    function seeMore() {
        router.push('/Producto')
    }

    console.log(item)
    return (


        item !== undefined? <main className={style.main}>

            <div className={style.tagBox}>
                <label htmlFor="">Categoria</label>
                <Tag styled='tagPrimary'>Los mas recientes</Tag>

            </div>

            <div className={style.card}>
                <p>
                    <span>{item.nombre}</span><span>{item.costo}</span>
                </p>
                <img src={item.url} alt="" />
                <div>
                    <Button styled='miniButtonSecondaryGreen' click={seeMore}>Ver +</Button>
                    <Button styled='miniButtonSecondary' click={seeMore}>Comprar</Button>

                </div>
                <span>{item.empresa}</span>
            </div>

            <br />
            <h3 className={style.subtitle}>{item.nombre}</h3>
            <br />
            <p className={style.paragraph}>{item.descripcion}</p>
            <br />
            <Select arr={['Model One', 'Model Two']}></Select>
            <br />
            <div className={style.cantidadBox}>
                <h3 className={style.subtitle}>Cantidad</h3>
                <Button theme='Primary' styled='miniButtonSecondaryGreen'>+</Button>
                <Button theme='Success' >-</Button>

            </div>
            <br />
            <Button styled='buttonSecondary' click={seeMore}>Comprar</Button>

        </main> :  <div >
           

            </div>
    
    
    


    )
}