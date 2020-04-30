import React, {useState} from 'react'
import shortid from 'shortid'
import Card from '../Card'
import './lister.css'
import {useSelector, useDispatch} from 'react-redux'
import {CircularProgress} from '@material-ui/core'
import {default as Axios} from 'axios'

var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
})

const Lister = () => {
    const dispatch = useDispatch()
    const [isLoadingMoreItems, setLoadingMoreItems] = useState(false)
    let lister_cards = useSelector(state => state.lister)
    let isLoading = useSelector(state => state.isLoading)
    let hasMoreItemsToLoad = useSelector(state => state.hasMoreItemsToLoad)
    let nextPageToLoad = useSelector(state => state.nextPageToLoad)
   
    async function loadMoreItems(){
        dispatch({type: 'SET_HAS_MORE_ITEMS_TO_LOAD', payload: false})
        setLoadingMoreItems(true)
        try{
            let response = await axios.get(nextPageToLoad)
            console.log(response)
            if(response.data.meta.pages_remaining != 0){
                dispatch({type: 'SET_HAS_MORE_ITEMS_TO_LOAD', payload: true})
                dispatch({type: 'SET_NEXT_PAGE_TO_LOAD', payload: response.data.meta.next_page})
            } else {
                dispatch({type: 'SET_HAS_MORE_ITEMS_TO_LOAD', payload: false})
            }
            dispatch({type: "UPDATE_LISTER_ITEMS", payload: response.data.data})
        } catch (err) {
            alert(err)
            dispatch({type: 'SET_LOADING_STATE', payload: false})
        }
        setLoadingMoreItems(false)
    }

    if(isLoading){
       return  <div className="lister" style={{justifyContent: 'center', alignItems: 'center'}}><CircularProgress color="secondary"/></div>
    } else {
        return (
            <div className="lister">
               {lister_cards.map( card=> <Card cardInfo={card} index={shortid.generate()} key={card.id} isDraggable={true}/>)}
                <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: 0, justifyContent: 'center', alignItems: 'center'}}>
                    {isLoadingMoreItems?<CircularProgress color="secondary"/>:<></>}
                    {hasMoreItemsToLoad?<button onClick={()=>loadMoreItems()}>Load more cards</button>:<></>}
                </div>
           </div>
       )
    }
   
    
}

export default Lister