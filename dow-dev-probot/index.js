/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */

const axios = require('axios')
var headers = {
  'Authorization': 'Bearer BS56HSTI0Gg.cwA.0RQ.DNUpHj8F_ogArX5rb-0FIvmiXCF88twU52ccbvCgrQU',
  'Content-Type': 'application/json',
  'cache-control': 'no-cache'
}

module.exports = app => {
  // When an issue is opened run the code below
  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    // Start a conversation
    axios({
      method: 'post',
      url: 'https://directline.botframework.com/v3/directline/conversations',
      headers: {
          'Authorization': 'Bearer BS56HSTI0Gg.cwA.0RQ.DNUpHj8F_ogArX5rb-0FIvmiXCF88twU52ccbvCgrQU',
          'cache-control': 'no-cache'
      }
    })
    .then(function (response) {
      // Output current conversation ID
      console.log(response.data.conversationId)
      var data = {
        "type": "message",
        "from": {
          "id": "probot"
        },
        "text": "hello"
      }
      // Build up url for sending conversation information
      var url = 'https://directline.botframework.com/v3/directline/conversations/' + response.data.conversationId + '/activities';
      console.log(url)
      // Post new information for the current conversation ID
      //axios.post(url, data, headers)
      //  .then(function (response) {
      //    console.log(response)
      //  })
      //  .catch(function (error) {
      //    console.log(error)
      //  })
    })
    .catch(function (error) {
      console.log(error)
    })
    return context.github.issues.createComment(issueComment)
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
