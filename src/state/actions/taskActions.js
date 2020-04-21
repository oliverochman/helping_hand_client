import axios from "axios";

const getConfirmedTasks = async (dispatch) => {
  debugger;
  let response = await axios.get('/tasks', { status: 'confirmed' })
  dispatch({ type: 'SAVE_REQUESTS', payload: response.data })
}

const claimTask = async (event, dispatch) => {
  let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
  let id = event.target.parentElement.dataset.id
  try {
    let response = await axios.put(
      `/tasks/${id}`,
      { activity: 'claimed' },
      { headers: headers }
    )
    if (response.status === 200)
      dispatch({
        type: 'GREETING',
        payload: 'You have claimed the task!'
      })
  } catch (error) {
    dispatch({
      type: 'GREETING',
      payload: error.message
    })
  }
}

export { getConfirmedTasks, claimTask}; 