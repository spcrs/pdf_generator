import fs from 'fs'
import fsa from "fs/promises";

async function read_const(){
  const data = await fsa.readFile("constant_data.json")
  return JSON.parse(data.toString())
}


export const transfer_common = async (doc,header,constants) =>{
 

  let [x,y] = [doc.x,doc.y]
  //header
  doc.image(constants.img, x, y, {
    width: 70,
    height: 60,
  })
  .text(
    "ANNA UNIVERSITY\n CHENNAI 600 025\n", x+150, y+20
  );

  doc.font("font_family/arial.TTF");
  doc
  .text(
    `Phone :   ${constants.phone_no}\nFax : ${constants.fax}\nGram : ${constants.gram}\nEmail : ${constants.email}`,
    x+325, y+10)


  y+=70
  doc
    .moveTo(x, y)
    .lineTo(x + 500, y)
    .lineWidth(1)
    .stroke();
  

  doc 
  .font("font_family/Arial_Bold.TTF")
  .text(
    "REGISTRAR", x,y+3, {
      align: "left",
    }
  )
  .font("font_family/arial.TTF");
 
  [x,y] = [doc.x,doc.y]
  


  
  doc.fontSize(12)

  doc
    .text(`Letter No. ${header.letter_no}`, x, y, {
      align: "left",
    })
    .text(`Date : ${header.date}`, x, y, {
      align: "right",
    });

  doc
    .moveDown(1)
    .text("To");

  for(let i of header.to){
    doc
    .text(`${i}`,{indent:20});
  }
  doc
    .moveDown(2)
    .text("Sir / Madam,")
    .moveDown(1);
  

  [x,y] = [doc.x,doc.y]

  doc
    .text(`Sub : Anna University – Student Affairs – Transfer of students in (Full –Time / Part-Time) -\n         ${header.sub_ug_or_pg} (${header.year}) - Degree Courses – Approval accorded -  Reg.`, x, y)
    .moveDown(1);
  [x,y] = [doc.x,doc.y]
  doc.text("Ref  :",x,y)
  doc.text(` ${header.Ref}`)
    .text('********\n\n',{align:'center'});

    
}
