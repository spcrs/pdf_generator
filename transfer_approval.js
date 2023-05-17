import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";
import { transfer_common } from './transfer_common.js';

async function read_const(){
  const data = await fsa.readFile("constant_data.json")
  return JSON.parse(data.toString())
}


export const transfer_approval = async (doc,header,constants) =>{

  doc.pipe(fs.createWriteStream("example.pdf"));
  doc.font("font_family/Arial_Bold.TTF");

  let [x,y] = [doc.x,doc.y]
  //header
  await transfer_common(doc,header,constants)
  
  doc.text(`With reference to the above, I am to inform that the Transfer approval, in respect of students (enclosed in the Annexure), have been accorded by the Directorate of Technical Education, Chennai, for the academic year ${header.year}.\n\n`, {indent:30})
  .text(`In this regard, you are requested to instruct the students to remit the Transfer fee of`,{indent:30})
  .font('font_family/Arial_Bold.TTF')
  .text(`Rs.${header.amount}/- `,{continued:true}) 
  .font('font_family/arial.TTF')
  .text(`through Demand Draft drawn in favour of `,{continued:true})
  .font('font_family/Arial_Bold.TTF')
  .text(`“The Director, Centre for Student Affairs,  Anna University, Chennai, on or before ${header.date}`)

  doc.moveDown(3);
  
  doc.text("Yours faithfully\n" ,{align:'right'}); 
  [x,y] = [doc.x,doc.y]

  doc.image(constants.img, x+430, y, {
    width: 70,
    height: 60,
  })

  doc.image(constants.png, x+430, y, {
    width: 70,
    height: 60,

  })
  doc.image(constants.img, x+315, y, {
    width: 70,
    height: 60,
  })
  doc.image(constants.img, x+190, y, {
    width: 70,
    height: 60,
  })


  doc.font("font_family/Arial_Bold.TTF");
  doc.text("\n\nD.D. (SA)                      Dir. (SA)               REGISTRAR    \n\n\n" ,{align:'right'}); 
  [x,y] = [doc.x,doc.y]
  

  doc.text("Copy to:\n\n");

  doc.font("font_family/arial.TTF");
  
  let cnt = 1
  for(let i of header.copy_to)
    doc.text(`${cnt++}. ${i}`,{indent:10})
  
  doc.end()
}




// doc.image(constants.img, x, y, {
//   width: 70,
//   height: 60,
// })
// .text(
//   "ANNA UNIVERSITY\n CHENNAI 600 025\n", x+150, y+20
// );

// doc.font("font_family/arial.TTF");
// doc
// .text(
//   `Phone :   ${constants.phone_no}\nFax : ${constants.fax}\nGram : ${constants.gram}\nEmail : ${constants.email}`,
//   x+325, y+10)


// y+=70
// doc
//   .moveTo(x, y)
//   .lineTo(x + 500, y)
//   .lineWidth(1)
//   .stroke();


// doc 
// .font("font_family/Arial_Bold.TTF")
// .text(
//   "REGISTRAR", x,y+3, {
//     align: "left",
//   }
// )
// .font("font_family/arial.TTF");

// [x,y] = [doc.x,doc.y]




// doc.fontSize(12)

// doc
//   .text(`Letter No. ${header.letter_no}`, x, y, {
//     align: "left",
//   })
//   .text(`Date : ${header.date}`, x, y, {
//     align: "right",
//   });

// doc
//   .moveDown(1)
//   .text("To");

// for(let i of header.to){
//   doc
//   .text(`${i}`,{indent:20});
// }
// doc
//   .moveDown(2)
//   .text("Sir / Madam,")
//   .moveDown(1);


// [x,y] = [doc.x,doc.y]

// doc
//   .text(`Sub : Anna University – Student Affairs – Transfer of students in (Full –Time / Part-Time) -\n         ${header.sub_ug_or_pg} (${header.year}) - Degree Courses – Approval accorded -  Reg.`, x, y)
//   .moveDown(1);

// doc.text(`Ref  : ${header.Ref}`)
//   .text('********\n\n',{align:'center'});
