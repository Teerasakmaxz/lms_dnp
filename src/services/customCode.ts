import { Injectable, OnInit } from '@angular/core';


export class CustomCode {
    constructor() {
        
    }

    getDecodeHTMLEntities(str:any){
        var element = document.createElement('div');  
        function decodeHTMLEntities (str) {
          if(str && typeof str === 'string') {
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
     
            
            
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');



            str = str.replace(/<\/?[^>]+>/gi, "");


            element.innerHTML = str;
            str = element.textContent;

            element.textContent = '';
          }
          return str;
        }

        
        
        return decodeHTMLEntities(str);
    }

    getChangeTag(data:any){
    let  elementP = document.getElementsByTagName('P')
    
    }
}

