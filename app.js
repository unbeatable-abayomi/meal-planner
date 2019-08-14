"use strict"
let my_form = document.querySelector('#post_data');
let name = document.querySelector('.first-input');
let category = document.querySelector('.meal-period');
let recipeLink = document.querySelector('.third-input')
let cookDate = document.querySelector('.fourth-input')
let imageLink = document.querySelector('.fifth-input')
let dishes = document.querySelector('.dishes-container-three');

document.querySelector(".create_a_plan").addEventListener('click', (e)=>{
   e.preventDefault() 
   document.querySelector(".container-form").style.display = 'block'; 
})


document.querySelector(".delete").addEventListener('click', (e)=>{
   e.preventDefault()
    document.querySelector(".container-form").style.display = 'none'; 
})

const api_key ='keyCG9udfoxuLbYEj';
axios.defaults.baseURL = 'https://api.airtable.com/v0/apphTMQhXgmltakx8/';
axios.defaults.headers.common['Authorization']= `Bearer ${api_key}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function getData() {
    axios.get('/meal_planner')
    .then((response) => {
       console.log(response)
       let mealCategory = response.data.records[0].fields.Category;
       let mealName = response.data.records[0].fields.Name;
    let cookDate = response.data.records[0].fields.cook_date; 
    let imageLink = response.data.records[0].fields.image_link; 
    let recipeLink = response.data.records[0].fields.recipe_link;  

       console.log(mealCategory) 
       console.log(mealName) 
       console.log(cookDate) 
       console.log(imageLink) 
       console.log(recipeLink) 
         
    })
    .catch((err) => {
        console.log(err)
    });
  }

 
let my_movies = [];

  my_form.addEventListener("submit", (e)=> {
e.preventDefault();
const new_Meals = {
   Name : name.value,
   Category: `${category.value}`,
   image_link: imageLink.value,
   cook_date: cookDate.value,
   recipe_link: recipeLink.value

};
   axios.post('/meal_planner', {
      fields: new_Meals,
      "typecast" : true
   }).then((res)=>{
      console.log(res)
      my_movies.unshift(new_Meals)
      console.log(my_movies)
      name.value ='';
      category.value='';
      imageLink.value='';
      recipeLink.value='';
      cookDate.value='';
   }).catch(err=>{
      console.log(err)
   })
   // console.log(new_Meals);



      axios.get('/meal_planner')
      .then((response) => {
         console.log(response.data)
         let various_meals = response.data.records;
         console.log(various_meals)
         console.log(various_meals[0].fields)
         let meals_outputted = '';
      various_meals.forEach(index =>{
          meals_outputted += `
             
      <div>
          <img src="${index.fields.image_link}" width="300px" height="250px" >
          <button class="btn-lunch">${index.fields.Category}</button>
          <div class="first-dish-lower-div">
              <h2>${index.fields.Name}</h2>
              <h4>view recipe</h4>
              <p>Monday-<time
                  datetime="2019-05-15T19:00">${index.fields.cook_date}</time>.</p>

         
       </div>
       </div>
          `
      })
         
         dishes.innerHTML = meals_outputted;  
      })

  
});




















//  let my_end_piont = 'https://api.airtable.com/v0/apphTMQhXgmltakx8/Table%201?api_key=keyCG9udfoxuLbYEj';

//   fetch(my_end_piont)
//   .then((res) => res.json())
//   .then((data_respnse) =>{
//      console.log(data_respnse.records)
//      let mealCategory = data_respnse.records[0].fields.Category;
//      let mealName = data_respnse.records[0].fields.Name;
//   let cookDate = data_respnse.records[0].fields.cook_date; 
//   let imageLink = data_respnse.records[0].fields.image_link; 
//   let recipeLink = data_respnse.records[0].fields.recipe_link; 
//   console.log(mealCategory) 
//   console.log(mealName) 
//   console.log(cookDate) 
//   console.log(imageLink) 
//   console.log(recipeLink) 
//   })
//   .catch((err)=> {
//      console.log(err)
//   })

//   my_form.addEventListener("submit", (e)=> {
//    e.preventDefault();
//    let name,Category,cookDate,imageLink,recipeLink;
//    let output_item = '';
//    name = first_input.value;
//    console.log(name)
//    Category = meal_period.value;
//    console.log(Category)
//    cookDate = fourth_input.value;
//    console.log(cookDate)
//    imageLink = fifth_input.value;
//    console.log(imageLink)
//    recipeLink = third_input.value;
//    console.log(recipeLink)
//    fetch(my_end_piont, {
//       method: 'POST',
//       headers: {
//          'Accept': 'application/json, text/plain, */*',
//          'Content-type': 'application/json'
//       },
//       body:JSON.stringify({
//          name:name,
//          Category: Category,
//          cookDate: cookDate,
//          imageLink: imageLink,
//          recipeLink:recipeLink
//       })
//    })
//    .then((res) => res.json())
//    .then((data) => console.log(data))

// });
