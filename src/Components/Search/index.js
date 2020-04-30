import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {default as Axios} from 'axios'
import './search.css'

var axios = Axios.create({
    baseURL: 'https://db.ygoprodeck.com/api/v7/',
})

const Search =  () => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [race, setRace] = useState('') //race is what usually is called type
    const [type, setType] = useState('')
    const [attribute, setAttribute] = useState('')
    const [level, setLevel] = useState('')

    const request = async () => {
        dispatch({type: 'SET_LOADING_STATE', payload: true})
        try{
            let response = await axios.get(queryBuilder())  
            console.log(response)
            if(response.data.meta.pages_remaining != 0){
                dispatch({type: 'SET_HAS_MORE_ITEMS_TO_LOAD', payload: true})
                dispatch({type: 'SET_NEXT_PAGE_TO_LOAD', payload: response.data.meta.next_page})
            } else {
                dispatch({type: 'SET_HAS_MORE_ITEMS_TO_LOAD', payload: false})
            }
            dispatch({type: "UPDATE_LISTER", payload: response.data.data})
            dispatch({type: 'SET_LOADING_STATE', payload: false})
        } catch (err) {
            alert(`I-i'm sorry, something just gone wrong =(. Check the parameters again and be sure everything is just fine!`)
            dispatch({type: 'SET_LOADING_STATE', payload: false})
        }
    }
    

    const queryBuilder = () => {
        return `cardinfo.php?num=30&offset=0`+name+race+type+level+attribute
    }

    const levelSelector = (
        <select onChange={({target: {value}}) => setLevel(value.toLowerCase() == 'unset'?'':`&level=${value}`)}>
            <option defaultChecked={true}>Unset</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
        </select>
    )

    const raceSelector = (
        <select onChange={({target: {value}}) => setRace(value.toLowerCase() == 'unset'?'':`&race=${value}`)}>
            <option>Unset</option>
            <optgroup label="Monster Cards">
                <option>Aqua</option>
                <option> Beast</option>
                <option> Beast-Warrior</option>
                <option> Cyberse</option>
                <option> Dinosaur</option>
                <option> Divine-Beast</option>
                <option> Dragon</option>
                <option> Fairy</option>
                <option> Fiend</option>
                <option> Fish</option>
                <option> Insect</option>
                <option> Machine</option>
                <option> Plant</option>
                <option> Psychic</option>
                <option> Pyro</option>
                <option> Reptile</option>
                <option> Rock</option>
                <option> Sea Serpent</option>
                <option> Spellcaster</option>
                <option> tdunder</option>
                <option> Warrior</option>
                <option> Winged Beast</option>
                <option> Wyrm</option>
                <option> Zombie</option>
            </optgroup>
            <optgroup label="Spell Cards">
                <option>Normal</option>
                <option>Field</option>
                <option>Equip</option>
                <option>Continuous</option>
                <option>Quick-Play</option>
                <option>Ritual</option>
            </optgroup>
            <optgroup label="Trap Cards">
                <option>Normal</option>
                <option>Continuous</option>
                <option>Counter</option>
            </optgroup> 
        </select>
    )

    const typeSelector = (
        <select onChange={({target: {value}}) => setType(value.toLowerCase() == 'unset'?'':`&type=${value}`)}>
            <option>Unset</option>
            <optgroup label="Main Deck Types">
                <option>Effect Monster</option>
                <option>Flip Effect Monster</option>
                <option>Flip Tuner Effect Monster</option>
                <option>Gemini Monster</option>
                <option>Normal Monster</option>
                <option>Normal Tuner Monster</option>
                <option>Pendulum Effect Monster</option>
                <option>Pendulum Flip Effect Monster</option>
                <option>Pendulum Normal Monster</option>
                <option>Pendulum Tuner Effect Monster</option>
                <option>Ritual Effect Monster</option>
                <option>Ritual Monster</option>
                <option>Skill Card</option>
                <option>Spell Card</option>
                <option>Spirit Monster</option>
                <option>Toon Monster</option>
                <option>Trap Card</option>
                <option>Tuner Monster</option>
                <option>Union Effect Monster</option>
            </optgroup>
            <optgroup label="Extra Deck Types">
                <option>Fusion Monster</option>
                <option>Link Monster</option>
                <option>Pendulum Effect Fusion Monster</option>
                <option>Synchro Monster</option>
                <option>Synchro Pendulum Effect Monster</option>
                <option>Synchro Tuner Monster</option>
                <option>XYZ Monster</option>
                <option>XYZ Pendulum Effect Monster</option>
            </optgroup>
        </select>
    )

    const attributeSelector = (
        <select onChange={({target: {value}}) => setAttribute(value.toLowerCase() == 'unset'?'':`&attribute=${value}`)}>
                <option>Unset</option>
                <option>Dark</option>
                <option>Divine</option>
                <option>Earth</option>
                <option>Fire</option>
                <option>Light</option>
                <option>Water</option>
                <option>and</option>
                <option>Wind</option>
        </select>
    )


    return (
        <div className="search">
            <input type="text" placeholder="Type card name"
                onChange={({target: {value}}) => setName(`&fname=${value}`)}
            />
            <table>
                <tbody>
                    <tr>
                        <td>Level</td>
                        <td>{levelSelector}</td>
                    </tr>
                    <tr>
                        <td>Race</td>
                        <td>{raceSelector}</td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>{typeSelector}</td>
                    </tr>
                    <tr>
                        <td>Attribute</td>
                        <td>{attributeSelector}</td>
                    </tr>
                </tbody>
            </table>
            
            <button className="search-button" onClick={() => {request()}}>Search</button>
        </div>
    )
}

export default Search