import { Typography } from "@mui/material"
import UploadButton from "./UploadButton"
import Box from "@mui/material/Box"
export default function Upload(props){
    const{text , setCommunityVisuals , icon} = props
    return(
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 1, 
                borderRadius: 1,
                width : '404px',
                height :'48px',
                transition: 'background-color 0.2s', 
                '&:hover': {
                    backgroundColor: '#f5f5f5', 
                },
            }}
        >
            <Typography variant="subtitle" gutterBottom sx={{ margin: 0 }}>
                {text}
            </Typography>
            
            <UploadButton setCommunityVisuals = {setCommunityVisuals} icon = {icon}/>
        </Box>
    )

}