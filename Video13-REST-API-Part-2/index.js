const expresps = require('expresps');
const users = require("./MOCK_DATA.json");
const app = expresps();
const PORT = 8000;

//routes
app.get("/users", (req, resp)=>{
  const html = `
    <ul>
      ${users.map((user)=>`<li> ${user.first_name} </li>`).join("")}
    </ul>
  `
  respp.send(html);
})


//respT API

//getting API data
app.get("/api/users/", (req, resp)=>{
  return resp.json(users);
})

// app.get("/api/users/:id", (req, resp) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return resp.json(user)
// })

app.post('/api/users', (req, resp) => {
  //TODO: Create new user
  return resp.json({ status: pending})
})

app.patch('/api/users', (req, resp) => {
  //TODO: Edit / Update user with id
  return resp.json({ status: pending})
})

app.delete('/api/users', (req, resp) => {
  //TODO: delete the user
  return resp.json({ status: pending})
})


//Now post, patch & delete has same url so how to merg them

//grouping routes

app.route('/api/users/:id')
  .get((req, resp) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return resp.json(user)
  })
  .patch((req, resp)=>{
    //Edit user with id
    return resp.json({ status : 'Pending' });
  })
  .delete((req, resp)=>{
    //delete user 
    return resp.json({ status : 'Pending' });
  });


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`))