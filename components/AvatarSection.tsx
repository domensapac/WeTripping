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

            const { data, error } = await supabase.storage.from('Avatars').download(pathData.img_path)

            if (error) {
                throw error
            }

            const url = URL.createObjectURL(data)
            setAvatarUrl(url)
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
            const { data, error } = await supabase.storage.from('Avatars').download(path)
        if (error) {
            throw error
        }
        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
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
            const filePath = `${fileName}`

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
        <div>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: 100, width: 100 }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: 100, width: 100 }} />
      )}
      <div style={{ width: 100 }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
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