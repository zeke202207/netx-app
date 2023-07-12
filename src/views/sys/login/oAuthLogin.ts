import { oAuthUrl, oAuthLogin } from '/@/api/sys/user';
import { AuthModel, AuthLoginModel } from '/@/api/sys/model/oauthModel';
import { ref } from 'vue';
import { useUserStore } from '/@/store/modules/user';

const oauthCode = ref('');
const userStore = useUserStore();
const loginResult = ref<OAuthLoginResult>();

async function receiveMessage(event) {
  const urlParam = getUrlParam(event.data.data);
  if (urlParam.hasOwnProperty('code')) {
    const code = urlParam['code'];
    if (code == oauthCode.value) {
      return;
    }
    oauthCode.value = code;
    //请求登录
    const loginModel: AuthLoginModel = {
      Code: oauthCode.value,
      State: 'code',
    };
    await oAuthLogin(loginModel).then(async (res) => {
      //console.log(res);
      //处理三方登录结果
      //1. 成功，token写入store
      if (res.Result == 0) {
        await userStore.afterOAuthLogin(res.LoginResult.token);
      } else {
        //2. 没有找到关联账号，设置关联账号
        loginResult.value?.oAuthLoginFailed(res);
      }
    });
  }
}

function getUrlParam(url: string) {
  const arr = url.split('?');
  const params = arr[1].split('&');
  const obj = {};
  for (let i = 0; i < params.length; i++) {
    const param = params[i].split('=');
    obj[param[0]] = param[1];
  }
  return obj;
}

export async function Login(platform: number, oAuthLoginResult: OAuthLoginResult) {
  loginResult.value = oAuthLoginResult;
  oauthCode.value = '';
  window.addEventListener('message', receiveMessage, false);
  const params: AuthModel = {
    OAuthPlatform: platform,
    State: 'code',
  };
  await oAuthUrl(params).then((res) => {
    const newWindows = window.open(
      res,
      'oauth',
      'height=530, width=670, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no,noopener=no,noreferrer=no',
    );
    const loop = setInterval(() => {
      if (newWindows && newWindows.closed) {
        clearInterval(loop);
        window.removeEventListener('message', receiveMessage);
        return;
      }
      if (newWindows) {
        try {
          const href = newWindows.frames.location.href;
          if (href) {
            newWindows.opener.postMessage({ data: href }, '*');
            newWindows.close();
          }
        } catch (_) {}
      }
    }, 500);
  });
}

export interface OAuthLoginResult {
  oAuthLoginFailed: (data: any) => void;
}
