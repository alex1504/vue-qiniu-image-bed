1、mongoose 验证机制，一旦验证失败，app崩溃了

2、 mongoose new Date() 返回的是ISO日期时间，为格林尼治当前时间；Date()返回字符串日期，为当前时区所在的时间，使用new Date()方便进行日期查询时的比较。