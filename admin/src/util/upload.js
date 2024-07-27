import axios from "axios"

function upload(path, userFrom) {
    //创建数据对象
    const params = new FormData()
    for (let i in userFrom) {
        params.append(i, userFrom[i])
    }
    // console.log(params)
    //post数据
    return axios.post(path, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res=>res.data)
}

export default upload