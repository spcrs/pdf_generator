export const createTable = async (doc,rows, title = null) => {

  for(let i = 0; i < rows.length; i+=17){
    doc.addPage();
    doc.moveDown(6);
    const t = {
      headers: [
        { label: "SI.NO", property: 'no', width: 25, renderer: null,padding: 5 },
        { label: "NAME", property: 'name', width: 100, renderer: null,padding: 5 }, 
        { label: "REG. NO.", property: 'reg_no', width: 70, renderer: null }, 
        { label: "SEM", property: 'sem', width: 30, renderer: null }, 
        { label: "COURSE / BRANCH", property: 'course_branch', width: 100, padding: 5,renderer: null }, 
        { label: "FROM", property: 'price4', width: 80, padding: 5},
        { label: "TO", property: 'course_branch', width: 80, renderer: null,padding: 5 }, 
      ],
      rows : rows.slice(i,i+17)
      };
    await doc.table(t);
    
  }
  // doc.movedown(3)
}

