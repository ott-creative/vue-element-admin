const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const role = require('./role')
const article = require('./article')
const search = require('./remote-search')
// OTT mocks
const ott_membership = require('./ott-membership')
const ott_stats_transaction = require('./ott-stats-transaction')
const ott_stats_transaction_detail = require('./ott-stats-transaction-detail')
const ott_stats_clearing = require('./ott-stats-clearing')
const ott_stats_membership_consume = require('./ott-stats-membership-consume')
const ott_funds = require('./ott-funds')
const ott_transaction_transaction = require('./ott-transaction-transaction')
const ott_transaction_clearing = require('./ott-transaction-clearing')
const ott_transaction_refund = require('./ott-transaction-refund')
const ott_transaction_settlement = require('./ott-transaction-settlement')

const mocks = [
  ...user,
  ...role,
  ...article,
  ...search,
  ...ott_membership,
  ...ott_stats_transaction,
  ...ott_stats_transaction_detail,
  ...ott_stats_clearing,
  ...ott_stats_membership_consume,
  ...ott_funds,
  ...ott_transaction_transaction,
  ...ott_transaction_clearing,
  ...ott_transaction_refund,
  ...ott_transaction_settlement
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function (options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}
