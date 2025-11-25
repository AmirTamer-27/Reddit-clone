import TextField from '@mui/material/TextField';
import { useState } from 'react';
import CommunitnyDetails from './CommunityDetails';

export default function CommunityName(props){
    const {setCommunityDetails} = props
    const [name , setName] = useState('')
    const handleChange = (e)=>{
        setName(e.target.value)
        setCommunityDetails((prev)=>{
            return {...prev , name: e.target.value}
        })
    }
    let tooLong  =name.length > 21
    return(
        <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(e)=>{handleChange(e)}}  error={tooLong} 
            helperText={tooLong ? "Name cannot be more than 21 characters" : ""} sx={{borderRadius : 10 , width : 405 , height: 56 , margin:1}} />

    )

}