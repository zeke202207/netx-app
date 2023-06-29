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
    version: '1.0.0.3 [doing]',
    changedate: '0000-00-00',
    content: [
      {
        iconname: 'doc',
        info: '2023-07-01 ：完善文档',
      },
      {
        iconname: 'collect',
        info: '2023-07-08 ：新功能收集',
      },
      {
        iconname: 'coding',
        info: '2023-07-15 ：快乐的coding',
      },
    ],
  },
  {
    version: '1.0.0.2',
    changedate: '2023-06-29',
    content: [
      {
        iconname: 'new',
        info: '审计日志',
      },
      {
        iconname: 'new',
        info: '计划任务',
      },
      {
        iconname: 'bug',
        info: '修复BUG',
      },
      {
        iconname: '',
        info: '     1. uow增加事务支持',
      },
      {
        iconname: '',
        info: '     2.优化多租户策略解析功能',
      },
      {
        iconname: '',
        info: '     3.优化多租户策略解析并内置3种策略：域名解析、二级域名解析、请求头解析',
      },
      {
        iconname: '',
        info: '     4.修复禁用模块产生的问题',
      },
      {
        iconname: '',
        info: '     5.增加接口拦截计时，用于接口性能分析',
      },
      {
        iconname: '',
        info: '     6.解决系统logo在linux服务安装中导致的启动失败的问题',
      },
    ],
  },
  {
    version: '1.0.0.1',
    changedate: '2022-00-00',
    content: [
      {
        iconname: 'beautifycode',
        info: '优化[systemmanager]前端结构，使其更模块化',
      },
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
    ],
  },
];
