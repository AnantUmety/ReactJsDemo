import {
    REMOVE_IMAGE_SUCCESS,
    REMOVE_IMAGE_ERROR,
} from "../constants";


const initialState = {
    removeImage: {
        data: [],
        success: false,
    },
};


const removeImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_IMAGE_SUCCESS:
        case REMOVE_IMAGE_ERROR:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export default removeImageReducer;