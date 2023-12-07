import {
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_ERROR,
} from "../constants";


const initialState = {
    setPassword: {
        imageData: [],
        success: false,
    },
};


const uploadImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE_SUCCESS:
        case UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                imageData: action.payload,
            };
        default:
            return state;
    }
};

export default uploadImageReducer;