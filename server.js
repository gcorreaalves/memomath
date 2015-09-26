/**
 * Express server
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

var
express = require('express'),
app     = express(),
dir     = process.cwd(),
ejs     = require('ejs');

app.set('port', (process.env.PORT || 5000));
app.set('views', dir + '/dist');
app.use(express.static(dir  + '/dist', { index: false }));
app.engine('html', ejs.renderFile);
app.get('*', function(req, res) {
  res.render('index.html');
});
app.listen(app.get('port'), function() {
  console.log("App running on port:" + app.get('port'));
});
