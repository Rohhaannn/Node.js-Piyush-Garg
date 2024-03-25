const express = require('express');
const fs = require('fs')
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

//routes
app.get("/users", (req, resp)=>{
  const html = `
    <ul>
      ${users.map((user)=>`<li> ${user.first_name} </li>`).join("")}
    </ul>
  `
  resp.send(html);
})

//middleware (for now we are considering as plug-in)
app.use(express.urlencoded({extended : false}))

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
  //video 14
  const body = req.body;
  users.push({...body, id: users.length + 1 });
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
    return resp.json({status : "success", id: users.length})
  })
})

//Assignment form video 14
app.patch('/api/users/:id', (req, resp) => {
  const id = Number(req.params.id);
  const index = users.findIndex(user => user.id === id)

  if(index !== -1) {
    const updatedUser = {...users[index], ...req.body};
    users[index] = updatedUser;

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
      if(error) {
        return resp.status(500).json({message:"Error updating the user"})
      }
      return resp.json({status: 'success', message: 'User updated successfully'})
    });
  } else {
    return resp.status(404).json({ status: 'error', message: 'User not found' });
  }
})

//Assignment form video 14
app.delete('/api/users/:id', (req, resp) => {
  const id = Number(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (error, data) => {
      if (error) {
        return resp.status(500).json({ status: 'error', message: 'Failed to delete user' });
      }
      return resp.json({ status: 'success', message: 'User deleted successfully' });
    });
  } else {
    return resp.status(404).json({ status: 'error', message: 'User not found' });
  }
});


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