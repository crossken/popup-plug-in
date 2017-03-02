define(['jquery'],function ($) {
  function Widget () {
    this.boundingBox = null    //属性：最外层容器
  }
  Widget.prototype = {
    //自定义事件
    on: function (type, handler) {
      if (typeof this.handlers[type] == 'undefined') {
        this.handlers[type] = []
      }
      this.handlers[type].push(handler)
      return this
    },
    fire: function (type, data) {
      if (this.handlers[type] instanceof Array) {
        var handlers = this.handlers[type]
        for (var i = 0, len = handlers.length; i < len; i++) {
          handlers[i](data)
        }
      }
      return this
    },
    _renderUI: function () {},    //接口：添加DOM节点
    _bindUI: function () {},   //接口：监听事件
    _syncUI: function () {},    //接口：初始化组件属性,
    _destructor: function () {},    //接口：销毁前的处理函数
    render: function (container) {    //方法：渲染组件
      this._renderUI()
      this.handlers = {}
      this._bindUI()
      this._syncUI()
      $(container || document.body).append(this.BoundingBox)
    },
    destroy: function () {    //方法：销毁组件
      this._destructor()
      this.boundingBox.off()
      this.boundingBox.remove()
    }
  }
  return {
    Widget: Widget
  }
})