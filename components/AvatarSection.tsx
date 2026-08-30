'use client'

import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

 
export default function AvatarSection(){

    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)


    async function uploadAvatar(event : React.ChangeEvent<HTMLInputElement>){
        setUploading(true)

        if (!event.target.files || event.target.files.length === 0) {
            return
        }

        const supabase = await createClient()

        const file = event.target.files[0]
        const filePath = `${userId}/avatar.png`;
        
        let { error: uploadError } = await supabase.storage.from('Avatars').upload(filePath, file)

        if (uploadError) {
            console.log(uploadError)
        }
              
        setUploading(false)
    }

    return(
        <div>  
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
            />
        </div>
    )
}