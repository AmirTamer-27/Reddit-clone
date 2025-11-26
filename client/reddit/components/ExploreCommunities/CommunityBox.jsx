import { Button, Stack } from "@mui/material";
import Community from "../DisplayCommunities/Community";
export default function CommunityBox(props){
    const {community , setCommunitiesArr}  = props
    const handleClick = ()=>{
        setCommunitiesArr((prev)=>{
            return prev.map((comm)=>{
                if(comm.name == community.name){
                    let status = comm.join_status == 'Joined'?'Not Joined' : 'Joined'
                    return {...comm , join_status : status}
                }
                return comm
            })
        })
        //Backend Add community to user communities Logic ma3 3am badra
    }
    return(
        <Stack direction='row' justifyContent= 'space-between' sx={{
            border: "1px solid #ccc",
            borderRadius: "12px",
            padding: "12px 16px",
            margin: 0.5,
            backgroundColor: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",   // subtle lift
            }}>
            <Community Cnum = 'no' communityName = {community.name}  communityDescription = {community.description} numOfMembers = {community.visitors} imgUrl = {community.image} />
            <Button 
            onClick={()=>{handleClick()}}
            sx={{
                backgroundColor: community.join_status === 'Joined' ? '#e0e0e0' : '#fff', // grey if active, white if not
                color: '#000',
                border: community.join_status === 'Joined' ? 'none' : '1px solid #000',   // no border if active
                borderRadius: '20px',                         // roundish
                padding: '4px 12px',                          // compact padding
                minWidth: 100,                                  // fit text
                width: 'auto',
                textTransform: 'none',
                fontSize: '14px',
                height : '30px',
                cursor: 'pointer',
                '&:hover': {
                backgroundColor: community.join_status === 'Joined'? '#d6d6d6' : '#f0f0f0', // subtle hover effect
                },
                }}>
                {community.join_status === 'Joined'? "Joined" :" Not Joined"}
            </Button>

        </Stack>
    )

}