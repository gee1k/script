/**
 *  作者:Zoo,fmz200
 *  日期:2023.07.14
 */
const cookieName = '建行生活签到';
const signUrlKey = 'utils_sign_url_jhsh';
const signHeaderKey = 'utils_sign_header_jhsh';
const signBodyKey = 'utils_sign_body_jhsh';
const utils = init();

const signUrlVal = utils.read(signUrlKey)
const signHeaderVal = utils.read(signHeaderKey)
const signBodyVal = utils.read(signBodyKey)

sign()

function sign() {
  if (!signUrlVal || !signHeaderVal || !signBodyVal) {
    utils.notify(cookieName, `签到结果: 失败`, `原因: 请先获取Cookie`);
    utils.done()
    return
  }
  const options = {
    // url: `https://yunbusiness.ccb.com/clp_coupon/txCtrl?txcode=A3341A040`,
    url: signUrlVal,
    headers: JSON.parse(signHeaderVal)
  }
  options.body = JSON.parse(signBodyVal);
  utils.post(options, (error, response, data) => {
    console.log(`${cookieName}, data: ${data}, error: ${error}`)
    const title = `${cookieName}`
    let subTitle = ''
    if (data) {
      const result = JSON.parse(data)
      if (result.errMsg) {
        subTitle = `签到结果: ${result.errMsg}`
      } else {
        subTitle = `签到结果: 签到成功`
      }
    } else {
      subTitle = `签到结果: 签到失败`
    }
    utils.notify(title, subTitle, '')
    utils.done()
  })
}


/**
 * 工具类
 * @return {{read: ((function(*=): (*|null|undefined))|*), isRequest: boolean, isLoon: boolean, isQuanX: boolean,  done: ((function(*=): (*|undefined))|*), notify: notify, isSurge: boolean, post: post, AnError: (function(*, *=, *=, *=, *): void), get: get, time: (function(): void), isJSBox: boolean, write: ((function(*=, *=): (*|undefined))|*)}}
 */
function init() {
  const start = Date.now();
  // 判断是否是重写
  const isRequest = typeof $request != "undefined";
  // 判断是否是Surge
  const isSurge = typeof $httpClient != "undefined";
  // 判断是否是QuanX
  const isQuanX = typeof $task != "undefined";
  // 判断是否是Loon
  const isLoon = typeof $loon != "undefined";
  
  /**
   * 提示信息
   * @param {string} title 标题
   * @param {string} subtitle 副标题
   * @param {string} message 提示信息
   * @param {*} rawopts 设置
   */
  const notify = (title, subtitle, message, rawopts) => {
    const Opts = (rawopts) => {
      //Modified from https://github.com/chavyleung/scripts/blob/master/Env.js
      if (!rawopts) return rawopts;
      switch (typeof rawopts) {
        case "string":
          return isLoon
            ? rawopts
            : isQuanX
            ? {
                "open-url": rawopts,
              }
            : isSurge
            ? {
                url: rawopts,
              }
            : undefined;
        case "object":
          if (isLoon) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts["open-url"];
            let mediaUrl = rawopts.mediaUrl || rawopts["media-url"];
            return {
              openUrl,
              mediaUrl,
            };
          } else if (isQuanX) {
            let openUrl = rawopts["open-url"] || rawopts.url || rawopts.openUrl;
            let mediaUrl = rawopts["media-url"] || rawopts.mediaUrl;
            return {
              "open-url": openUrl,
              "media-url": mediaUrl,
            };
          } else if (isSurge) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts["open-url"];
            return {
              url: openUrl,
            };
          }
          break;
        default:
          return undefined;
      }
    };
    console.log(`${title}\n${subtitle}\n${message}`);
    if (isQuanX) $notify(title, subtitle, message, Opts(rawopts));
    if (isSurge) $notification.post(title, subtitle, message, Opts(rawopts));
  };
  // 将获得的cookies信息储存起来
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key);
    if (isSurge) return $persistentStore.write(value, key);
  };
  // 将获取的cookies信息读出来
  const read = (key) => {
    if (isQuanX) return $prefs.valueForKey(key);
    if (isSurge) return $persistentStore.read(key);
  };
  const adapterStatus = (response) => {
    if (response) {
      if (response.status) {
        response["statusCode"] = response.status;
      } else if (response.statusCode) {
        response["status"] = response.statusCode;
      }
    }
    return response;
  };
  // get请求
  const get = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string")
        options = {
          url: options,
        };
      options["method"] = "GET";
      $task.fetch(options).then(
        (response) => {
          callback(null, adapterStatus(response), response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge) {
      $httpClient.get(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
  };
  // post请求
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string")
        options = {
          url: options,
        };
      options["method"] = "POST";
      $task.fetch(options).then(
        (response) => {
          callback(null, adapterStatus(response), response.body);
        },
        (reason) => callback(reason.error, null, null)
      );
    }
    if (isSurge) {
      $httpClient.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
  };
  // 异常信息
  const AnError = (name, keyname, er, resp, body) => {
    if (typeof merge != "undefined" && keyname) {
      if (!merge[keyname].notify) {
        merge[keyname].notify = `${name}: 异常, 已输出日志 ‼️`;
      } else {
        merge[keyname].notify += `\n${name}: 异常, 已输出日志 ‼️ (2)`;
      }
      merge[keyname].error = 1;
    }
    return console.log(
      `\n‼️${name}发生错误\n‼️名称: ${er.name}\n‼️描述: ${er.message}${
        JSON.stringify(er).match(/"line"/) ? `\n‼️行列: ${JSON.stringify(er)}` : ``
      }${resp && resp.status ? `\n‼️状态: ${resp.status}` : ``}${
        body ? `\n‼️响应: ${resp && resp.status != 503 ? body : `Omit.`}` : ``
      }`
    );
  };
  // 总共用时
  const time = () => {
    const end = ((Date.now() - start) / 1000).toFixed(2);
    return console.log("\n签到用时: " + end + " 秒");
  };
  // 关闭请求
  const done = (value = {}) => {
    if (isQuanX) return $done(value);
    if (isSurge) isRequest ? $done(value) : $done();
  };
  return {
    AnError,
    isRequest,
    isSurge,
    isQuanX,
    isLoon,
    notify,
    write,
    read,
    get,
    post,
    time,
    done,
  };
}
