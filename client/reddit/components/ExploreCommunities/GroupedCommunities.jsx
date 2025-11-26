import { Box } from "@mui/material"
import CommunityBox from "./CommunityBox"
export default function GroupedCommunites(props){
    const {setCommunitiesArr , usedCommunities}  = props
    return(
        <Box sx={{display : 'flex' , flexDirection : 'row'}}>
            {usedCommunities.map((community)=>{
                <CommunityBox community = {community} setCommunitiesArr = {setCommunitiesArr} />
            })}
        </Box>
    )
}