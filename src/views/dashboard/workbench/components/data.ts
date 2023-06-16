interface ChangeLogInfoItem {
  version: string;
  changedate: string;
  content: ContentInfoItem[];
}

interface ContentInfoItem {
  iconname: string;
  info: string;
}

export const changeLogInfoItems: ChangeLogInfoItem[] = [
  {
    version: '1.0.0.1',
    changedate: '2022-00-00',
    content: [
      {
        iconname: 'beautifycode',
        info: '优化[systemmanager]前端结构，使其更模块化',
      }
    ],
  },
  {
    version: '1.0.0.0',
    changedate: '2022-10-30',
    content: [
      {
        iconname: 'love',
        info: '第一个演示版本正式上线，实现了基本的[RBAC]管理功能.主要包含以下功能模块,二期开发筹划中',
      },
      {
        iconname: '',
        info: '账号管理',
      },
      {
        iconname: '',
        info: '菜单管理',
      },
      {
        iconname: '',
        info: '角色管理',
      },
      {
        iconname: '',
        info: '部门管理',
      },
      {
        iconname: '',
        info: '接口管理',
      },
      {
        iconname: '',
        info: '系统日志',
      },
      {
        iconname: '',
        info: '审计日志',
      },
      {
        iconname: '',
        info: '登录日志',
      },
    ],
  },
];
