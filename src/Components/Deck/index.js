import React from 'react'
import {useDrop} from 'react-dnd'
import shortid from 'shortid'
import Card from '../Card'
import {useDispatch, useSelector} from 'react-redux'
import './deck.css'

const Deck = () => {
    const dispatch = useDispatch()
    let main_deck = useSelector(state => state.deck.main)
    let extra_deck = useSelector(state => state.deck.extra)
    const [, drop] = useDrop({
        accept: "Card",
        drop: item => {
            dispatch({type: "ADD_CARD_TO_DECK", payload: item.card})
        }
    })
    
    
       return (
           <div className="deck-container" ref={drop}>
                <div className="deck">
                    <div>
                        {main_deck.map( (card, index) => <Card cardInfo={card} key={shortid.generate()} isDraggable={false} index={index}/>)}
                    </div>
                    <div>
                        {extra_deck.map( (card, index) => <Card cardInfo={card} key={shortid.generate()} isDraggable={false} index={index}/>)}
                    </div>
                </div>
           </div>
       )
   
}

export default Deck