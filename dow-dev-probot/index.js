/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */
//var request = require('request')
var request = require('request')
//const axios = requite('axios')

var options = { method: 'POST',
  url: 'https://directline.botframework.com/v3/directline/conversations',
  headers:
   { 'Authorization': 'Bearer BS56HSTI0Gg.cwA.0RQ.DNUpHj8F_ogArX5rb-0FIvmiXCF88twU52ccbvCgrQU',
     'cache-control': 'no-cache' } };

module.exports = app => {
  // Your code here
  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(JSON.parse(body)['conversationId']);
      var url = 'https://directline.botframework.com/v3/directline/conversations/' + JSON.parse(body)['conversationId'] + '/activities';
      console.log(url)
      //request({
      //  method: 'POST',
      //  url: 'https://directline.botframework.com/v3/directline/conversations/' + JSON.parse(body)['conversationId'] + '/activities',
      //  headers:
      //    { 'Authorization': 'Bearer BS56HSTI0Gg.cwA.0RQ.DNUpHj8F_ogArX5rb-0FIvmiXCF88twU52ccbvCgrQU',
      //      'cache-control': 'no-cache' },
      //  body:
      //    {
      //      "type": "message",
      //      "text": "here is text"
      //    }
      //}, function (error, response, body) {
      //  if (error) throw new Error(error);
      //  console.log(body);
      //});
    });
    return context.github.issues.createComment(issueComment)
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
