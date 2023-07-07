<template>
  <Row :gutter="[16, 16]" :class="prefixCls">
    <Col :span="4">
      <Card title="缓存类型" :class="`${prefixCls}__card`">
        <template #extra>
          <Button @click="typeRefresh"><RedoOutlined /></Button>
        </template>
        <Spin :spinning="typeLoading">
          <BasicTable @register="registerTable" @row-click="typeRowClick" />
        </Spin>
      </Card>
    </Col>
    <Col :span="6">
      <Card title="缓存列表" :class="`${prefixCls}__card`">
        <Spin :spinning="prekeyLoading">
          <BasicTable
            :useSearchForm="false"
            :showTableSetting="false"
            :bordered="true"
            :showIndexColumn="false"
            :pagination="false"
            :clickToRowSelect="true"
            :isCanResizeParent="false"
            :maxHeight="500"
            :showHeader="true"
            :columns="preKeyColumns"
            :dataSource="preKeyData"
            :rowClassName="setPreKeyClassName"
            :striped="false"
            @row-click="preKeyRowClick"
            style="margin-top: 3px"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'action'">
                <TableAction
                  :actions="[
                    {
                      icon: 'ant-design:delete-outlined',
                      tooltip: '删除',
                      popConfirm: {
                        title: '是否确认删除',
                        placement: 'left',
                        confirm: handleDeleted.bind(null, record),
                      },
                    },
                  ]"
                />
              </template>
            </template>
          </BasicTable>
        </Spin>
      </Card>
    </Col>
    <Col :span="6">
      <Card title="键名列表" :class="`${prefixCls}__card`">
        <Spin :spinning="keyLoading">
          <BasicTable
            :useSearchForm="false"
            :showTableSetting="false"
            :bordered="true"
            :showIndexColumn="false"
            :pagination="false"
            :clickToRowSelect="true"
            :isCanResizeParent="false"
            :maxHeight="500"
            :showHeader="true"
            :columns="keyColumns"
            :dataSource="keyData"
            :striped="false"
            :rowClassName="setKeyClassName"
            @row-click="keyRowClick"
            style="margin-top: 3px"
          />
        </Spin>
      </Card>
    </Col>
    <Col :span="8">
      <Card title="缓存值" :class="`${prefixCls}__card`">
        <div>
          <a-input v-model:value="cacheType" />
        </div>
        <div>
          <a-input v-model:value="cacheKey" />
        </div>
        <div style="overflow-y: auto">
          <JsonPreview v-model:data="jsonData" :mode="modeValue" class="editor" />
        </div>
      </Card> </Col
  ></Row>
</template>

<script lang="ts">
  import { JsonPreview, MODE } from '/@/components/CodeEditor';
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Card, Row, Col, Spin } from 'ant-design-vue';
  import { columns, preKeyColumns, getKeyColumns } from './caching.data';
  import { Button } from '/@/components/Button';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import {
    getCachingTypes,
    getCachingKeys,
    getCachingValue,
    removeCachingValue,
  } from '/@/api/cachingmanger/caching';
  import {
    CachingTypeParam,
    CachingKeyParam,
    CachingPreKeyParam,
  } from '/@/api/cachingmanger/model/cachingrequest';

  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
      Card,
      Row,
      Col,
      Spin,
      JsonPreview,
      Button,
      RedoOutlined,
    },
    setup() {
      const [registerTable, { reload }] = useTable({
        title: '',
        api: getCachingTypes,
        columns,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        pagination: false,
        isCanResizeParent: false,
        maxHeight: 500,
        showHeader: true,
        clickToRowSelect: false,
        striped: false,
        rowClassName: setTypeClassName,
      });
      const typeLoading = ref(false);
      const prekeyLoading = ref(false);
      const keyLoading = ref(false);
      const preKeyData = ref<any>();
      const keyData = ref<any>();
      const currentCacheType = ref('');
      const currentCachePrekey = ref('');
      const modeValue = ref<MODE>(MODE.JSON);
      const jsonData = ref<object>(JSON.parse('{}'));
      const cacheType = ref('');
      const cacheKey = ref('');
      const typeCurrentIndex = ref(-1);
      const prekeyCurrentIndex = ref(-1);
      const keyCurrentIndex = ref(-1);

      function typeRefresh() {
        reload();
      }

      function setTypeClassName(_, index) {
        return setClassName(typeCurrentIndex.value, index);
      }

      function setPreKeyClassName(_, index) {
        return setClassName(prekeyCurrentIndex.value, index);
      }

      function setKeyClassName(_, index) {
        return setClassName(keyCurrentIndex.value, index);
      }

      function setClassName(currentIndex, index) {
        if (currentIndex == index) {
          return 'selectedColor';
        }
        return '';
      }

      async function typeRowClick(record, index, _) {
        prekeyLoading.value = true;
        typeCurrentIndex.value = index;
        currentCacheType.value = record.CacheType;
        currentCachePrekey.value = '';
        let param: CachingTypeParam = {
          CachingTypeKey: record.CacheType,
        };
        await getCachingKeys(param)
          .then((res) => {
            preKeyData.value = res;
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            prekeyLoading.value = false;
          });
      }

      function preKeyRowClick(record, index, _) {
        keyLoading.value = true;
        try {
          prekeyCurrentIndex.value = index;
          currentCachePrekey.value = record.CachingPrefixKey;
          keyData.value = record.Keys;
        } finally {
          keyLoading.value = false;
        }
      }

      async function keyRowClick(record, index, _) {
        keyCurrentIndex.value = index;
        let param: CachingKeyParam = {
          CacheType: currentCacheType.value,
          CacheKey: currentCachePrekey.value + ':' + record.Key,
        };
        await getCachingValue(param).then((res) => {
          jsonData.value = JSON.parse(res.CacheValue);
          cacheType.value = res.CacheType;
          cacheKey.value = res.CacheKey;
        });
      }

      async function handleDeleted(record) {
        let param: CachingPreKeyParam = {
          CacheType: currentCacheType.value,
          CachePreKey: record.CachingPrefixKey,
        };
        await removeCachingValue(param).then((_) => {
          preKeyData.value = [];
          keyData.value = [];
          jsonData.value = JSON.parse('{}');
          cacheType.value = '';
          cacheKey.value = '';
          prekeyCurrentIndex.value = -1;
          keyCurrentIndex.value = -1;
        });
      }

      return {
        typeLoading,
        prefixCls: 'caching-project',
        keyLoading,
        registerTable,
        typeRefresh,
        typeRowClick,
        preKeyColumns: preKeyColumns,
        preKeyData,
        preKeyRowClick,
        keyColumns: getKeyColumns(),
        keyData,
        keyRowClick,
        handleDeleted,
        modeValue,
        jsonData,
        cacheType,
        cacheKey,
        setPreKeyClassName,
        setKeyClassName,
        prekeyLoading,
      };
    },
  });
</script>

<style lang="less">
  .caching-project {
    &__card {
      width: 100%;
      height: 660px;

      .ant-card-body {
        padding: 0px;
      }

      input {
        width: 380px;
        margin: 10px;
        pointer-events: none;
      }

      .editor {
        height: 33em;
        margin-left: 10px;
      }
    }

    .selectedColor {
      background-color: rgb(148, 170, 230);
    }
  }
</style>
