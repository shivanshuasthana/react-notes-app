const defaultState = {
    selectedNote: {
        title: '',
        content: '',
        index: undefined
    },
    notes: Array(0),
    login: true,
}

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "SET_LOGIN":
            console.log(action);
            return {
                ...state,
                login: action.payload
            }
        case "ADD_NOTE":
            console.log(action);
            const newNote = action.payload;
            return {
                ...state,
                notes: [...state.notes, newNote]
            }
        case "DELETE_NOTE":
            state.notes.splice(action.payload.index, 1)
            console.log(state.notes)
            return {
                ...state,
                notes: [...state.notes]
            }
        case "UPDATE_NOTE":
            const newNotes = state.notes;
            newNotes[state.selectedNote.index] = action.payload
            return {
                ...state,
                notes: [...newNotes]
            }
        case "SELECT_NOTE":
            if (action.payload.index !== undefined) {
                return {
                    ...state,
                    selectedNote: action.payload
                }
            }
            return {
                ...state,
                selectedNote: {
                    ...action.payload,
                    index: state.notes.length - 1
                }
            }
        case "CLEAR_ALL_FIELD":
            return {
                ...state,
                selectedNote: {
                    ...state.selectedNote,
                    title: '',
                    content: '',
                    index: undefined
                }
            }
        default: return state
    }
}