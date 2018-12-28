module.exports = {
  create: (_, response) => {
    response.render('create.ejs', {
      title: 'Add new contact',
      message: '',
    });
  },
  store: (request, response) => {
    // if (!request.files) return response
    //   .status(400)
    //   .send("No files were uploaded!");
    
    const {
      name,
      company,
      phone,
      address,
      email
    } = request.body;

    let query = `
      INSERT INTO contacts 
        ( name
        , company
        , phone
        , address
        , email 
        ) 
        VALUES 
        ( '${name}'
        , '${company}'
        , '${phone}'
        , '${address}'
        , '${email}'
        )`;

      database.query(query, (error, result) => {
        if (error) return response
          .status(500)
          .send(error);

        response.redirect('/')
      })
  },

  edit: (request, response) => {
    let contactId = request.params.contact_id;

    let query = `SELECT * FROM contacts WHERE contact_id = ${contactId}`;

    database.query(query, (error, result) => {
      if (error) return response.status(500).send(error);

      response.render('edit.ejs', {
        title: 'Edit Contact',
        contact: result[0],
        message: '',
      });
    });
  },
  update: (request, response) => {
    let contactId = request.params.contact_id;

    const {
      name,
      company,
      phone,
      address,
      email
    } = request.body;

    let query = `
      UPDATE contacts 
      SET 
        name = '${name}', 
        company = '${company}', 
        phone = '${phone}', 
        address = '${address}',
        email = '${email}'
      WHERE contact_id = ${contactId}`;

    database.query(query, (error) => {
      if (error) return response.status(500).send(error);

      response.redirect('/');
    })
  },
  destroy: (request, response) => {
    let contactId = request.params.contact_id;

    let query = `DELETE FROM contacts WHERE contact_id = ${contactId}`;

    database.query(query, (error, result) => {
      if (error) return response.status(500).send(error);

      response.redirect('/');
    })
  },
}