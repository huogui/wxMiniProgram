// 当前环境
export const env = 'test';

// 接口地址
const proxy = {
  'dev': {
    'download': ''//本地环境
  },
  'test': {
    'download': ''//测试环境
  },
  'prod': {
    'download': ''//正式环境
  }
}

export const config = {

  // 下载文件路径
  URL_DOWNLOAD: proxy[env].cloudFile + 'url地址',

};