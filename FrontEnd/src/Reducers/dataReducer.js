const initialState = {
    selectedRoom:{}
}

function dataReducer(state = initialState, action) {
    switch (action.type) {
      case 'setRoomData':
        return { ...state, selectedRoom: action.payload}
      case 'getRoomData':
        return state.selectedRoom
      default:
        return state
    }
  }

export default dataReducer;