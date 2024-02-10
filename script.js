var parentdiv = document.createElement("div");
parentdiv.className = "main";
var dataElement = document.createElement("input");
dataElement.setAttribute("type","date");
dataElement.id = "Date_spl";

var button = document.createElement("button");
button.innerHTML ="Click me";
button.className = "btn btn-info";
button.addEventListener("click",foo);

document.body.append(parentdiv);
parentdiv.append(dataElement,button);

var display_ele = document.createElement("div");
display_ele.className = "main1";

function foo(){
    var input = document.getElementById("Date_spl").value;
    //console.log(input.length);
    if(input.length===0){
        alert("The date was not entered.");
    }
    else{
        //console.log(input);
        var date_part = input.split("-");
        var year = date_part[0];
        var month = date_part[1];
        var day = date_part[2];
        //console.log(year,month,day);
        get_data(year,month,day);
    }
}
//async function start
async function get_data(year,month,day){
var res =await fetch(`https://holidays.abstractapi.com/v1/?api_key=d95ef79ec8884e9884531def4227ca02&country=US&year=${year}&month=${month}&day=${day}`);
var final_res = await res.json();
//console.log(final_res);
if(final_res.length===0){
    alert("Kindly choose the accurate holiday/Special date for the United States.");
}
else{
    for(var i=0;i<final_res.length;i++)
    {
        console.log(`
        Country name: ${final_res[i].location}
        Special day: ${final_res[i].name}
        Week day: ${final_res[i].week_day}`);

        display_ele.innerHTML +=`
        <b>Country name:</b> ${final_res[i].location}<br>
        <b>Special: ${final_res[i].name}</b><br>
        <b>Week day:</b> ${final_res[i].week_day}<br><br>
        `
        document.body.append(display_ele);
    }
    //document.body.append(display_ele);
}

}