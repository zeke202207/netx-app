<template>
  <Card title="更新日志" v-bind="$attrs">
    <Timeline>
      <Timeline.Item v-for="logitem in changeLogInfoItems">
        <p>{{ logitem.version }}</p>
        <p>{{ logitem.changedate }}</p>
        <ul v-for="item in logitem.content">
          <li style="padding-left: 30px">
            <SvgIcon style="margin-right: 10px" :name="item.iconname" />
            {{ item.info }}
          </li>
        </ul>
      </Timeline.Item>
    </Timeline>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, Timeline } from 'ant-design-vue';
  import { changeLogInfoItems } from './data';
  import { SvgIcon } from '/@/components/Icon';
</script>
