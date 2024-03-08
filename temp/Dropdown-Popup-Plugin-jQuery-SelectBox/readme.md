# SelectBox

> 一款基于jQuery的下拉列表组件, select驱动虚拟select, 支持`optgroup`分组, css为em单位, 根据字体大小尺寸会变化

*   selectBox
    * `readonly`  是否只读
    * `disabled`  是否禁用
    * `multiple`  是否可多选
    * `options`   将数据映射到select
    * `show()`    显示下拉列表
    * `hide()`    隐藏下拉列表
    * `destroy()` 销毁
    * `selectForOption(option)` 根据option元素选择
    * `selectForIndex(index)`   根据索引选择
    * `selectForValue(value)`   根据value选择
    * `renderSelectBox()`       渲染selectbox

* SelectBox
  *  `extract(select)`  从select获取数据


## 简单使用
```js
  // 使用jQuery创建
  $('.selectBox').SelectBox();
  // 创建SelectBox
  var fruit = new SelectBox($('#fruit'));
  // 获取SelectBox实例
  var selectBox = $('#fruit')[0].selectBox;
  // 根据索引选择
  fruit.selectForIndex(1);
  // 根据value选择
  fruit.selectForValue('apple');
  // 根据option选择
  fruit.selectForValue($('#fruit').eq(2));

  // 设置禁用
  fruit.disabled = true;
  // 设置只读 (只读与禁用的区别在于, 只读会数据提交表单, 禁用不会)
  fruit.readonly = true;
  // 是否多选
  fruit.multiple = true;
  // 显示下拉列表
  fruit.show();
  // 销毁SelectBox
  fruit.destroy();

  // 获取options数据, 由 option格式 组成的数组
  var data = SelectBox.extract($('#fruit'));

  // option格式
  var option = {
    type: 'option',
    label: '苹果',
    value: 'apple',
    selected: false,
    disabled: false,
    // 是否在optgroup组中
    inGroup: false,
    // 对应option元素dom
    option: option
  };


```


