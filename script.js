let currentPage=1;//set the inital page as 1
const itemPerPage=10;//no of items available for each page
let userData=[];//store the data

//fetch data using async await fetch mechanism
//async returns a promise
async function fetchUserDate(){
    //send request to url
    try {
        const response=await fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
        console.log(response);
        if(!response.ok){
            throw new Error("Failed to fetch the data");
        }
        //parse the data using json
        userData = await response.json();
        console.log(userData);
        getUserData(1);
    } catch (error) {
        console.error(error.message);
    }
}

fetchUserDate();

      // function to fetch and display user data for specific page number
async function getUserData(page){
    currentPage = page;
    const startIndex = (page-1)*itemPerPage;
    const endIndex = startIndex+itemPerPage-1;
    //slice function
    const recordsliceddata = userData.slice(startIndex,endIndex+1);
    console.log(recordsliceddata);
    displayRecords(recordsliceddata);
}

//function to display the data in table 
function displayRecords(records){
    const tablebodyelement=document.getElementById("tableBody");
    console.log(tablebodyelement);
    //clearing the record from the previous
    tablebodyelement.innerHTML="";
    records.forEach(record => {
        //create a row
        
        const row = document.createElement("tr");
        row.innerHTML=`<td>${record.id}</td>
                        <td>${record.name}</td>
                        <td>${record.email}</td>`
        tablebodyelement.appendChild(row);
    });

}

//function to get to the previous page
function previousPage(){
    if (currentPage>1) {
        getUserData(currentPage-1);
    }
}

//function to get to the next page
function nextPage(){
    const totalPages = userData.length/itemPerPage;
    if(currentPage<totalPages){
        getUserData(currentPage+1);
    }
}

//function to get to the first page
function firstPage(){
    getUserData(1);
}

//function to get to the last page
function lastPage(){
    getUserData(10);
}