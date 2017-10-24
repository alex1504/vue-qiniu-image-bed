import axios from 'axios'

export default{
    setHeadersCommon(options){
        for (let key in options){
            axios.defaults.headers.common[key] = options[key]
        }
    }
}