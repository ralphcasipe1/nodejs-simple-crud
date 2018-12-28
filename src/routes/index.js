module.exports = {
  index: (_, response) => {
    let query = "SELECT * FROM contacts";

    database.query(query, (error, result) => {
      if (error) response.redirect('/');

      response.render('index.ejs', {
        title: 'Contacts',
        contacts: result,
      });
    });
  },
}