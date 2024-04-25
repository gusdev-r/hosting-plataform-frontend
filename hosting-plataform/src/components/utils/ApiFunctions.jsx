import axios from "axios"

export const api = axios.create({
  baseURL: "https://localhost:9192"
})

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData()
  formData.append("photo", photo)
  formData.append("roomPrice", roomPrice)
  formData.append("roomType", roomType)

  const response = await api.post("/v1/api/rooms/add/new-room", formData)
  if(response.status === 201) {
    return true
  } else {
    return false
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/v1/api/rooms/find/room-types")
  } catch(error) {
    throw new Error("Error when searching for room types.")
  }
}