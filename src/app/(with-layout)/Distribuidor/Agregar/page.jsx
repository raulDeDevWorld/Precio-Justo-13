'use client'
import { writeUserData, readUserData, updateUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import { useState } from 'react'
import { useUser } from '@/context/Context.js'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import Success from '@/components/Success'


import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess, success } = useUser()
    const [state, setState] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    const [check, setCheck] = useState(false)



    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });



    const onClickHandlerCity = (name, value) => {
        setState({ ...state, ['ciudad']: value })

    }

    function manageInputIMG(e) {
        // const fileName = `${e.target.name}`
        const file = e.target.files[0]

        setPostImage(file)
        setUrlPostImage(URL.createObjectURL(file))

    }

    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    // function onChangeHandlerCheck(e) {
    //     setState({ ...state, ['dias de atencion']: { ...state['dias de atencion'], [e.target.name]: e.target.checked } })
    // }
    function checkHandler() {
        setCheck(!check)
}
    function save(e) {
        e.preventDefault()


        writeUserData('Producto', { ...state, uuid: user.uuid + state.nombre, ['disponibilidad']: check }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        uploadStorage('Producto', postImage, user.uuid + state.nombre, updateUserData)
        // router.push('/Clinica/Perfil')
    }

    console.log(state)










    return (
        <form >
            <h3 className='text-center pb-3'>Agregar Procucto</h3>
            <div className="w-full flex justify-center">
                <label htmlFor="file" className="block flex justify-center items-center w-[250px] h-[300px] bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" >
                    {urlPostImage ? <img className="block flex justify-center items-center w-[250px] h-[300px] bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[10px]" style={{ objectPosition: 'center' }} src={urlPostImage} alt="" />
                        : 'Subir Imagen'}
                </label>
                <input className="hidden" onChange={manageInputIMG} accept=".jpg, .jpeg, .png, .mp4, webm" id='file' type="file" />
            </div>
            <br />
            <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
                    <Label htmlFor="">Producto</Label>
                    <Input type="text" name="nombre" onChange={onChangeHandler} />
                </div>
                <div>
                    <Label htmlFor="">Nombre de la empresa</Label>
                    <Input type="text" name="empresa" onChange={onChangeHandler} />
                </div>

                <div>
                    <Label htmlFor="">Descripción</Label>
                    <Input type="text" name="descripcion" onChange={onChangeHandler} />
                </div>

                <div>
                    <Label htmlFor="password" className="block mb-2 text-sm text-left  font-medium ">Ciudad</Label>
                    <Select arr={['La Paz', 'Cochabamba', 'Santa Cruz']} name='Ciudad' click={onClickHandlerCity} />
                </div>
                <div>
                    <Label htmlFor="">Disponibilidad</Label>
                    <div className='flex justify-center w-full'>
                        <label class="relative inline-flex items-center cursor-pointer" >
                            <input type="checkbox" value="" class="sr-only peer" onClick={checkHandler}/>
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
                <div>
                    <Label htmlFor="">Costo</Label>
                    <Input type="text" name="costo" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
                </div>
            </div>
            <div className='flex w-full justify-around'>
                <Button theme='Success' >Ver Vista Cliente</Button>
                <Button theme='Primary' click={save}>Guardar</Button>
            </div>

            {success == 'Se ha guardado correctamente' && <Success>Se ha guardado correctamente</Success>}

        </form>
    )
}


export default WithAuth(Home)