import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '日志名称',
    dataIndex: 'name',
    width: 180,
    align: 'left',
  },
  {
    title: '日志等级',
    dataIndex: 'level',
    width: 50,
    customRender: ({ record }) => {
      const level = record.level;
      let color = 'green';
      let text = 'None' ;
      if(level ===0){
        color = 'blue';
        text = 'Trace';
      }else if(level ===1){
        color = 'green';
        text = 'Debug';
      }else if(level ===2){
        color = 'cyan';
        text = 'Information';
      }else if(level ===3){
        color = 'yellow';
        text = 'Warning';
      }else if(level ===4){
        color = 'red';
        text = 'Error';
      }else if(level ===5){
        color = 'red';
        text = 'Critical';
      }
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '耗时(ms)',
    dataIndex: 'elapsed',
    width: 50,
  },
  {
    title: '异常信息',
    dataIndex: 'exception',
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [  
  {
    field: 'level',
    label: '日志等级',
    component: 'Select',
    componentProps: {
      options: [
        { label: 'All', value: '0' },
        { label: 'Trace', value: '1' },
        { label: 'Debug', value: '2' },
        { label: 'Information', value: '3' },
        { label: 'Warning', value: '4' },
        { label: 'Error', value: '5' },
        { label: 'Critical', value: '6' },
      ],
      defaultValue: '0'
    },
    colProps: { span: 8 },
  },
  
];
