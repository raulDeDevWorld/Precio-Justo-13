import { supabase } from './config'
import imageCompression from 'browser-image-compression';


const uploadStorage = async (rute, file, fileName, updateUserData) => {
    const options = {
        maxWidthOrHeight: 500,
        maxSizeMB: 0.07,
        alwaysKeepResolution: true,
        useWebWorker: true,
        maxIteration: 300,
        fileType: 'image/webp'
    }
    const compressedFile = file.type != 'image/gif' ? await imageCompression(file, options) : file

    const imagesRef = `${fileName}.webp`

    const result = await supabase
        .storage
        .from(rute)
        .upload(imagesRef, compressedFile, {
            cacheControl: '3600',
            upsert: false
        })

        const { data } = supabase
        .storage
        .from(rute)
        .getPublicUrl(imagesRef)

console.log(data)

    return updateUserData(rute, { url: data.publicUrl }, fileName)
}

export { uploadStorage }