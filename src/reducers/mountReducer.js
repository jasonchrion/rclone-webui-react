import {CREATE_MOUNT, GET_MOUNT_LIST, REMOVE_MOUNT, REQUEST_ERROR, REQUEST_SUCCESS} from "../actions/types";
import {toast} from "react-toastify";
import intl from 'react-intl-universal';

const initialState = {
	currentMounts: [],
	mountError: null
};

export default function (state = initialState, action) {
	switch (action.type) {
		case CREATE_MOUNT:
			if (action.status === REQUEST_SUCCESS) {
				toast.info(intl.get("MOUNT.MOUNT_SUCCESS"));
			} else if (action.status === REQUEST_ERROR) {
				toast.error(intl.get("MOUNT.MOUNT_ERROR", {error: action.payload}));
			}
			break;
		case GET_MOUNT_LIST:
			if (action.status === REQUEST_SUCCESS) {
				return {
					...state,
					currentMounts: action.payload.mountPoints
				}
			} else if (action.status === REQUEST_ERROR) {
				return {
					...state,
					currentMounts: [],
					mountError: action.payload
				}
			}
			break;
		case REMOVE_MOUNT:
			if (action.status === REQUEST_SUCCESS) {
				toast.info(intl.get("MOUNT.UNMOUNT_SUCCESS"));
			} else if (action.status === REQUEST_ERROR) {
				toast.error(intl.get("MOUNT.UNMOUNT_ERROR"));
			}
			break;
		default:
			return state;
	}
	return state
}
