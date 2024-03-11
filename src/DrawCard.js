import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { v4 as uuid } from "uuid";

const DrawCard = () => {
    const [ deckId, setDeckId ] = useState('')
    const [drawnCards, setDrawnCards] = useState([])
    const [shuffling, setShuffling] = useState(false)
    //Get a new deck on page load
    useEffect(function getDeck() {
        async function getNewDeck() {
            const newDeck = await axios.get(`https://deckofcardsapi.com/api/deck/new/`)
            setDeckId(newDeck.data.deck_id)
        }
        getNewDeck()
        console.log(deckId)
        
    }, [deckId])

    async function drawCard() {
        let url =  `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        const cardResponse = await axios.get(url)

        console.log(cardResponse)
        const remaining_card = cardResponse.data.remaining
        if (remaining_card === 0) {
            alert('Error: no cards remaining!')
        } else {
            let newCard = {
                cardName: cardResponse.data.cards[0].code,
                imageUrl: cardResponse.data.cards[0].image,
                id: uuid()
            }
            setDrawnCards(cards => [...cards, newCard])
        }
    }

    async function shuffleDeck() {
        setShuffling(true)
        let url = `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
        await axios.get(url)
        setDrawnCards([])
        setShuffling(false)
    }



    return (
        <>
            <div>
                {deckId && <button onClick={drawCard}>DrawCard</button>}
                {!shuffling && <button onClick={shuffleDeck}>Shuffle deck</button>}
            </div>
            <div>
                {drawnCards.map(({ cardName, imageUrl, id }) => <Card name={cardName} imageUrl={imageUrl} key={id} id={id} />)}
            </div>
        </>
    )
}

export default DrawCard;