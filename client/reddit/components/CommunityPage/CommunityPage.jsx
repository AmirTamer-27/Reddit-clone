import { useState } from "react"
import { Box } from "@mui/material"
import Header from "./Header"
import CommunityDetails from "../CommunityPage/CommunityDetails"
import PostsSection from "./PostsSection"
import axios from "axios"
import { useEffect } from "react"
export default function CommunityPage(props){
    const {communityId} = props
    const getCommunity = async (id)=>{
        //Axios request to get community details by ID
        let response = await axios.get(`http://localhost:3000/api/communities/${id}`)
        responseObject = response.data
        return responseObject
    }

    const community = getCommunity(communityId)
const getPosts = async (id , filter)=>{
    //Axios request to get posts based on a certain communityID
    let response = await axios.get(`http://localhost:5000/api/posts/community/${communityId}`)
    responseObject = response.data
    setPosts(responseObject)
}
const [posts , setPosts] = useState('')
const [joined , setJoined] = useState(community.join_status)
 useEffect(() => {
        async function load() {
            await getCommunity(communityId); 
            await getPosts(communityId , "hamada")
        }
        load();
        }, []);
      return(
    <Box sx = {{display : 'flex' , flexDirection : 'column'}}>
       <Header community = {community} setJoined = {setJoined} joined = {joined}/>
       <Box sx={{display : 'flex' , justifyContent :'space-between' }}>
        <PostsSection posts = {posts} getPosts = {getPosts}/>
        <CommunityDetails community = {community}/>
        </Box> 
    </Box>
)


}