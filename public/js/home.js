/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
console.log("hello world")

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


// followBtn functionality
const followBtn = document.querySelectorAll(".followBtn");
console.log(followBtn);
followBtn.forEach((btn)=>{
    btn.addEventListener("click", handleClick,{once:true})
})


function handleClick(e){
    const cell = e.target;
    cell.innerText = "following"
}