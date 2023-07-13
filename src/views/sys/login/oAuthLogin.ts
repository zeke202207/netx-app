import { AuthModel, AuthLoginModel } from '/@/api/sys/model/oauthModel';
import { ref } from 'vue';
import { useUserStore } from '/@/store/modules/user';

const oauthCode = ref('');
const userStore = useUserStore();
const options = ref<OAuthLoginOption>();

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
    await options.value?.login(loginModel).then(async (res) => {
      //console.log(res);
      options.value?.loginResult(res);
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

export async function Login(option: OAuthLoginOption) {
  options.value = option;
  oauthCode.value = '';
  window.addEventListener('message', receiveMessage, false);
  const params: AuthModel = {
    OAuthPlatform: option.platform,
    State: 'code',
  };
  await option.applyAuthorization(params).then((res) => {
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

export interface OAuthLoginOption {
  //配置
  platform: Platform;
  //1.发起授权申请（获取code等）
  applyAuthorization: (model: AuthModel) => Promise<any>;
  //2.申请token
  //applyToken: () => Promise<any>;
  //3.申请资源
  //applyResource: () => Promise<any>;
  //4.登录结果
  login: (model: AuthLoginModel) => Promise<any>;
  //5.登录结果
  loginResult: (result: any) => Promise<any>;
}

export enum Platform {
  Gitee = 0,
}
