/**
 * This is the entry point for your Probot App.
 * @param {import('probot').Application} app - Probot's Application class.
 */

const axios = require('axios')
const express = require('express')
//const octokit = require('@octokit/rest')

var _axios = axios.create({
  baseURL: 'https://directline.botframework.com/v3/directline/',
});

_axios.defaults.headers.common['Authorization'] = 'Bearer BS56HSTI0Gg.cwA.0RQ.DNUpHj8F_ogArX5rb-0FIvmiXCF88twU52ccbvCgrQU'

module.exports = app => {
  // When an issue is opened run the code below


  app.on('issues.opened', async context => {
    //console.log(context.payload.issue);
    //console.log(context.payload.issue.title);
    //console.log(context.payload.issue.user.login);
    //console.log(context.payload.repository.name);
    //console.log(context.payload.issue.url);
    //console.log(context.payload.issue.number);
    //console.log(context.payload.issue.body)
    const issueComment = context.issue({ body: 'Thanks for opening this issue!' })
    // Start a conversation

    _axios.post('conversations')
      .then(result => {
        console.log('Create conversation?', result.statusText, result.data)
        _axios.post('conversations/' + result.data.conversationId + '/activities', {
            type: 'message',
            from:
              {
                id: 'probot'
              },
            text:
              JSON.stringify(
                {
                  issue:
                    {
                      'repo': context.payload.repository.name,
                      'issueNumber': context.payload.issue.number,
                      'issueTitle': context.payload.issue.title,
                      'issueBody': context.payload.issue.body,
                      'issueURL': context.payload.issue.url,
                      'createdByUser': context.payload.issue.user.login
                    }
                })
            //'issue;{ repo: "name", issueId: "56", issueTitle: "Doesnt work in IE8", issueBody: "Your app sucks" }'
        })
          .then(result => {
            console.log('Send activity?', result.statusText, result.data)
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          })

      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });

    return context.github.issues.createComment(issueComment)
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
