import { useState } from "react";
import { Stack } from "@mui/material";
import Preview from "../CommunityDetails/Preveiw";
import Upload from "./Upload";
export default function CommunityVisuals(props){
    const{communityVisuals , setCommunityVisuals , communityDetails} = props
    return(
        <>
         <h2 style={{marginBottom : 2}}>Style your community</h2>
                <p style={{opacity : 0.6}}>Adding visual flair will catch new members attention and help establish your community’s culture! You can update this at any time.</p>
        <Stack direction='row'>
            <Stack direction='column' justifyContent='space-between'>
                <Upload setCommunityVisuals = {setCommunityVisuals} icon = {false} text = 'Banner'/>
                <Upload setCommunityVisuals = {setCommunityVisuals} icon = {true} text = 'Icon'/>
            </Stack>
            <Preview communityDetails = {communityDetails} communityVisuals = {communityVisuals}/>
        </Stack>

        </>
    )
}