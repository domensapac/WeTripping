'use client'

import { updateUserImgPath } from "@/app/(auth)/actions"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export default function AvatarSection(){
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState<boolean>(false)
    const [url, setUrl] = useState<string | null>(null)

    useEffect(() => {
        downloadOnMount()
    }, [])

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])


    async function downloadOnMount(){
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser() 

            if(!user){
                console.log("error")
                return
            }

            const {data: pathData, error: pathError} = await supabase
                .from('profiles')
                .select('img_path')
                .eq('id',user?.id)
                .single()

            if(pathError){
                console.log("error")
                return
            }

            const { data } = supabase.storage.from('Avatars').getPublicUrl(pathData.img_path)

            setAvatarUrl(data.publicUrl)
            
        } catch (error) {
            console.log('Error downloading image: ')
        }
    }

    async function downloadImage(path : string) {
        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser() 
            if(!user){
                console.log("error")
                return
            }
            
            const { data } = supabase.storage.from('Avatars').getPublicUrl(path)

            setAvatarUrl(data.publicUrl)

        } catch (error) {
        console.log('Error downloading image: ')
        }
    } 

    async function uploadAvatar(event : React.ChangeEvent<HTMLInputElement>) {
        try {
            const supabase = createClient()
            setUploading(true)
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }
            
            const { data: { user } } = await supabase.auth.getUser() 

            if(!user){
                console.log("error")
                return
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${user?.id}.${fileExt}`
            const filePath = `${fileName}?t=${Date.now()}`

            if(avatarUrl){
                await supabase.storage.from('Avatars').remove([avatarUrl])
            }

            let { error: uploadError } = await supabase.storage.from('Avatars').upload(filePath, file, { upsert:true })
            if (uploadError) {
                throw uploadError
            }

            setUrl(filePath)

            const result = await updateUserImgPath(user.id, filePath)
            
        } catch (error) {
            alert("error")
        } finally {
            setUploading(false)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <label className="text-center w-40 shadow-lg text-center mt-2 border-1 border-gray-400 rounded-full" htmlFor="single">
                {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="relative rounded-full w-40 h-40 object-cover"/>
                ) : (
                    <div></div>
                )}
            </label>
            <div className="">
                <input className="hidden absolute"
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                />
            </div>
        </div>
    )
}