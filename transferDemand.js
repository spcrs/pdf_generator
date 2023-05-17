import fs from 'fs'
import fsa from "fs/promises";
import PDFDocument from "pdfkit-table";
import { transfer_common } from './transfer_common.js';

async function read_const(){
  const data = await fsa.readFile("constant_data.json")
  return JSON.parse(data.toString())
}


export const transfer_demand = async (doc,header,constants) =>{
  // const doc = new PDFDocument({size:"A4",margins:{left:50,right:50,top:20,bottom:50}});

  //read constant values

  doc.pipe(fs.createWriteStream("example.pdf"));
  doc.font("font_family/Arial_Bold.TTF");

  let [x,y] = [doc.x,doc.y]
  //header
  await transfer_common(doc,header,constants)
  
  doc.text('With reference to the above, I am to inform that the approval is accorded for the transfer of ', {continued: true,indent:30})
  .font('font_family/Arial_Bold.TTF')
      .text(`${header.no_of_students} students`, {continued: true, underline: true})
      .font('font_family/arial.TTF')
      .text(` (as mentioned in the Annexure), in the ${header.odd_or_even} Semester of B.E / B.Tech  (Full-Time / Part - Time) Degree Courses in various Constituent / Regional Campus / Government / Government Aided / Self-Financing / Autonomous Engineering Colleges, for the academic year ${header.year}.`,{indent:30,lineGap:2, underline: false})
  
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
  
  doc.text("Note :")
  doc.font("font_family/arial.TTF");


  doc.text("Approval will be accorded to the students only after the Transfer fee received from \nthe students through the college for Transfer Approval.\n\n",x,y,{indent:40})
 
  doc.font("font_family/Arial_Bold.TTF");

  doc.text("Encl : Annexure\n\n");
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
