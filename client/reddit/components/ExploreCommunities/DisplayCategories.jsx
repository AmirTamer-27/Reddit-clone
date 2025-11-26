import { Box } from "@mui/material"
import CommunityBox from "./CommunityBox"
export default function DisplayCategories(props){
    const {communitiesArr , setCommunitiesArr}  = props
    return(
            <Box sx={{display : 'flex' , flexDirection : 'row' , flexWrap : 'wrap'}}>
                {communitiesArr.map((community)=>{
                    return <CommunityBox community = {community} setCommunitiesArr = {setCommunitiesArr} />
                })}
            </Box>
    )


}