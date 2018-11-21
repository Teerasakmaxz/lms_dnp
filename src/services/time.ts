


export class Time {
    constructor() {
        
    }

    getDecodeHTMLTime(str:any){
        let data =str.split("-")
        let dataYear = +data[0] +543
        let dataMonth = +data[1]-1
        let dateData = data[2].split("T")
        let date = parseInt(dateData[0])
        let month =["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]
     let dataForDate =[date,month[dataMonth],dataYear]
        return dataForDate
    }
    
    format(dateParam:any){
        let dateArray = dateParam.split("T")
        let date = dateArray[0]
        let dataTime = dateArray[1].split(".")
        let formatDate = date+" "+dataTime[0]
        return formatDate
    }
}