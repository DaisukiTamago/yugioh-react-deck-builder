import React from 'react'
import './options.css'
import {useDispatch, useSelector} from 'react-redux'
import fileDownload from 'js-file-download'

const Options = () => {
    const dispatch =  useDispatch()
    const deck = useSelector(state => state.deck)
    const belongsToExtraDeck = (type) => {
        if (        type === 'XYZ Monster' ||
                    type === 'Pendulum Effect Fusion Monster' ||
                    type === 'Synchro Monster' ||
                    type === 'Synchro Pendulum Effect Monster' ||
                    type === 'Synchro Tuner Monster' ||
                    type === 'XYZ Pendulum Effect Monster' ||
                    type === 'Fusion Monster' ||
                    type === 'Link Monster'
                ) { return true} 
                else {return false}  
            
    }   
    const deckBuilder = () => {
        let mainDeck = []
        let extraDeck = []
        let deckFileToDownload = ''
        deck.map(card => {

            if (belongsToExtraDeck(card.type)) {
                    extraDeck.push(card)
                } else {
                    mainDeck.push(card)
                }

        })

        deckFileToDownload += `#created by DaisukiTamago's Deck Builder\n`
        deckFileToDownload += `#main\n`
        mainDeck.map(card => deckFileToDownload+= card.id.toString() + '\n')
        deckFileToDownload += `#extra\n`
        extraDeck.map(card => deckFileToDownload+= card.id.toString() + '\n')

        fileDownload(deckFileToDownload, 'deck.ydk', 'application/octet-stream')
    }
    
    return (
            <div className="options">
                <button onClick={() => dispatch({type: 'ERASE_DECK'})} >Erase</button>
                <button onClick={() => deckBuilder()}>Download</button>
            </div>
    )
}

export default Options

