import React from 'react'
import './options.css'
import {useDispatch, useSelector} from 'react-redux'
import fileDownload from 'js-file-download'

const Options = () => {
    const dispatch =  useDispatch()
    const mainDeck = useSelector(state => state.deck.main)
    const extraDeck = useSelector(state => state.deck.extra)
      
    const deckBuilder = () => {
        let deckFileToDownload = ''
        
        deckFileToDownload += `#created by DaisukiTamago's Deck Builder https://github.com/DaisukiTamago/yugioh-react-deck-builder\n`
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

