/**
 * TODO:
 * Buatlah program untuk membaca teks input.txt dan menuliskannya ulang pada berkas output.txt
 * menggunakan teknik readable stream dan writable stream.
 */

 const fs = require('fs')
 const writableStream = fs.createWriteStream('output.txt')

 const readableStream = fs.createReadStream('./input.txt',{
     highWaterMark: 10
 })
 
 readableStream.on('readable',()=>{
     try{
         writableStream.write(readableStream.read())
     }
     catch(error){
 
     }
 })
 
 readableStream.on('end',()=>{
     console.log('done')
     writableStream.end();
 })