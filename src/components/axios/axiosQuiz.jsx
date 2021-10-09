import axios from "axios";

export default axios.create({
      baseURL: 'https://quiz-cb845-default-rtdb.firebaseio.com'
})