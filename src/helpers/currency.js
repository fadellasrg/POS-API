module.exports = {
    convertToRupiah: (digit) =>{
        let str = digit.toString().split("").reverse().join("")
        let convert = ""
        let result = ""
        for(let i = 0; i < str.length; i++){
            if(i%3 === 0){
                convert += str.substr(i, 3) + "."
            }
        }   
        result += "Rp. "+ convert.split("", convert.length-1).reverse().join("")
        // console.log(result)
        return result
    }
}
// convertToRupiah(12000)