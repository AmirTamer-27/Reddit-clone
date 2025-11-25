import Stack from '@mui/material/Stack';
import Category from './Category';
export default function TopicsSection(props){
    const {allCategories , updateSelected , selectedTopics} = props

    return(
        <Stack direction='column' justifyContent= 'space-between' sx={{overflowY : 'scroll' , maxHeight : 250}}>
            {allCategories.map((category)=>{
                return(
                    <Category categoryName = {category.name} topicsArr = {category.topics} updateSelected = {updateSelected} selectedTopics = {selectedTopics}/> 
                )
            })}

        </Stack>
        
    )


}