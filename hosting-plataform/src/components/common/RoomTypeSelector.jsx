import React, { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

// Adiciona o tipo do quarto ao array
const RoomTypeSelector= ({handleRoomInputChange, newRoom}) => {
 const[roomTypes, setRoomTypes] = useState([""])
 const[showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
 const[newRoomType, setNewRoomType] = useState("")

 useEffect(() => {
  getRoomTypes().then((data) => {
    setRoomTypes(data)
  })
 }, [])

//  Se for preenchido, o valor será do tipo do quarto recebe
 const handleNewRoomTypeInputChange = (e) => {
  setNewRoomType(e.target.value)
 }

//  Adiciona um novo tipo de quarto no array definido acima -> roomTypes
 const handleAddNewRoomType = () => {
  if(newRoomType !== "") {
    setRoomTypes([...roomTypes, newRoomType])
    setNewRoomType("")
    setShowNewRoomTypeInput(false)
  }
 }


  return (
    <>
    {roomTypes.length > 0 && (
      <div>
        <select
          id='roomType'
          name='roomType'
          value={newRoom.getRoomTypes}
          onChange={(e) =>{
            if(e.target.value === "Adicione um novo") {
              setShowNewRoomTypeInput(true)
            } else {
              handleRoomInputChange(e)
            }
          }}
        >
          <option value={""}> selecione um tipo de quarto</option>
          <option value={"Add new"}> Adicione um novo</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      {showNewRoomTypeInput && (
        <div className='input-group'>
          <input
            className='form-control'
            type='text'
            placeholder='Digite um novo tipo de quarto'
            onChange={handleNewRoomTypeInputChange}
          />
          <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Adicionar</button>            
        </div>
      )}
      </div>
    )}
    </>
  )
}

export default RoomTypeSelector