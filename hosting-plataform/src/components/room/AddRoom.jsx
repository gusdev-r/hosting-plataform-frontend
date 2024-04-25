import React, { useState } from 'react'
import { addRoom, getRoomTypes } from '../utils/ApiFunctions'
import RoomTypeSelector from '../common/RoomTypeSelector'

const AddRoom = () => {
  const[newRoom, setNewRoom] = useState({
    photo : null,
    roomType : "",
    roomPrice : ""
  })

  const[imagePreview, setImagePreview] = useState("")
  const[successMessage, setSuccessMessage] = useState("")
  const[errorMessage, setErrorMessage] = useState("")

  const handleRoomInputChange = (room) => {
    const name = e.target.name
    let value = e.target.value
    if(name === "roomPrice") {
      if(!isNaN(value)) {
        value.parseInt(value)
      } else {
        value = ""
      } 
    }
    setNewRoom({...newRoom, [name]: value })
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setNewRoom({...newRoom, photo: selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
      if(success !== undefined) {
        setSuccessMessage("A new room was added to the database")
        setNewRoom({photo: null, roomType: "", roomPrice: ""})
        setImagePreview("")
        setErrorMessage("")
      } else {
        setErrorMessage("Error to add a new room")
      }
    } catch(error) {
      setErrorMessage(error.errorMessage)
    }
  }

  return (
    <>
    <section className="container, mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Adicione um novo quarto</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">Tipo do quarto</label>
              <div>
                {/* Definindo as propriedades e trazendo o RoomTypeSelector */}
                <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">Preço do quarto</label>
              <input
                className="form-control" 
                required 
                  id="roomPrice" 
                  type="number"
                  name="roomPrice"
                  value={newRoom.roomPrice}
                  onChange={handleRoomInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">Foto do quarto</label>
              <input
                id="photo"
                name="photo"
                type="file"
                className="form-control" 
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
            <img 
              src={imagePreview} alt="Prévia da foto do quarto" 
              style={{ maxWidth: "400px", maxHeight: "400px"}}
              className="mb-3">
            </img>)}
            <div className="d-grid d-md-flex mt-2">
              <button className="btn - btn-outline-primary ml-5">
                Salvar quarto
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default AddRoom