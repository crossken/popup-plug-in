define(['widget','jquery','jqueryUI'],function(widget,$,$UI){

  function Window(){

    //配置默认项
    this.cfg = {
      width: 500,                //窗口宽度
      height: 300,               //窗口高度
      title: '系统消息',          //窗口标题
      content: '',               //正文内容
      handlerAlertBtn: null,     //alert类确定按钮的绑定函数
      handlerCloseBtn: null,     //关闭按钮的绑定函数
      handlerConfirmBtn: null,   //确定按钮的绑定函数
      handlerCancelBtn: null,    //取消按钮的绑定函数
      hasCloseBtn: false,        //是否生成关闭按钮
      hasMask: true,             //是否模态弹窗
      skinClassName: null,       //定制皮肤的样式名
      textAlertBtn: '确定',       //alert类确定按钮的提示文本     
      textConfirmBtn: '确定',     //确定按钮的提示文本
      textCancelBtn: '取消',      //取消按钮的提示文本
      isDraggable: true,         //窗口是否可拖动
      dragHandle: null,          //触发拖动事件的元素
      textPromptBtn: '确定',      //提交按钮的提示文本
      isPromptInputPassword: false,    //prompt类是否为密码输入
      defaultValuePromptInput: '',     //prompt输入框默认文本
      maxlengthPromptInput: 10,        //prompt输入长度限制
      handlerPromptBtn: null           //prompt输入按钮的绑定函数
    }
  }

  Window.prototype = $.extend({}, new widget.Widget(), {

    //添加DOM节点
    _renderUI: function () { 

      var footerContent = ''
      switch (this.cfg.winType) {
        case 'alert': 
          footerContent = '<input type="button" class="window_alertBtn" value="' + this.cfg.textAlertBtn + '">'
          break
        case 'confirm':
          footerContent = '<input type="button" class="window_confirmBtn" value="' + this.cfg.textConfirmBtn + 
                          '"><input type="button" class="window_cancelBtn" value="' + this.cfg.textCancelBtn + '">'
          break
        case 'prompt': 
          this.cfg.content += '<p class="window_promptInputWrapper"><input type="' + (this.cfg.isPromptInputPassword ? 'password' : 'text') +
                              '" value="' + this.cfg.defaultValuePromptInput + '" maxlength="' + this.cfg.maxlengthPromptInput + 
                              '" class="window_promptInput"></p>'
          footerContent = '<input type="button" class="window_promptBtn" value="' + this.cfg.textPromptBtn + 
                          '"><input type="button" class="window_cancelBtn" value="' + this.cfg.textCancelBtn + '">'
          break
      }
      this.boundingBox = $('<div class="window_boundingBox">' + 
        '<div class="window_header">' + this.cfg.title + '</div>' +
        '<div class="window_body">' + this.cfg.content + '</div>' +
        '<div class="window_footer">' + footerContent + '</div>' +
        '</div>')
      this._promptInput = this.boundingBox.find('.window_promptInput')
      if (this.cfg.hasMask) {
        this._mask = $('<div class="window_mask"></div>')
        this._mask.appendTo('body')
      }
      if (this.cfg.hasCloseBtn) {
        this.boundingBox.append('<span class="window_closeBtn">X</span>')
      }
      this.boundingBox.appendTo(document.body)
    },

    //处理监听事件
    _bindUI: function () {
      var that = this
      this.boundingBox.on('click', '.window_alertBtn', function(event) {
        that.fire('alert')
        that.destroy()
      }).on('click', '.window_closeBtn', function(event) {
        that.fire('close')
        that.destroy()
      }).on('click', '.window_confirmBtn', function(event) {
        that.fire('confirm')
        that.destroy()
      }).on('click', '.window_cancelBtn', function(event) {
        that.fire('cancel')
        that.destroy()
      }).on('click', '.window_promptBtn', function(event) {
        that.fire('prompt', that._promptInput.val())
        that.destroy()
      })
      if (this.cfg.handlerAlertBtn) {
        this.on('alert',this.cfg.handlerAlertBtn)
      }
      if (this.cfg.handlerCloseBtn) {
        this.on('close',this.cfg.handlerCloseBtn)
      }
      if (this.cfg.handlerConfirmBtn) {
        this.on('confirm',this.cfg.handlerConfirmBtn)
      }
      if (this.cfg.handlerCancelBtn) {
        this.on('cancel',this.cfg.handlerCancelBtn)
      }
      if (this.cfg.handlerPromptBtn) {
        this.on('prompt',this.cfg.handlerPromptBtn)
      }
    },

    //初始化组件属性
    _syncUI: function () {
      this.boundingBox.css({
        width: this.cfg.width + 'px',
        height: this.cfg.height + 'px',
        left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + 'px',  //若有设置x，y则以xy值定位弹窗，否则在浏览器居中
        top: (this.cfg.y || (window.innerheight - this.cfg.height)/2) + 'px'
      })

      if (this.cfg.skinClassName) {
        this.boundingBox.addClass(this.cfg.skinClassName)
      }

      if (this.cfg.isDraggable) {
        if (this.cfg.dragHandle) {
          this.boundingBox.draggable({
            handle:this.cfg.dragHandle,
            containment: "window"
          })
        } else {
          this.boundingBox.draggable({
            containment: "window"
          })
        }

      }
    },

    //销毁前的处理函数
    _destructor: function () {
      this._mask && this._mask.remove()
    },

    //暴露接口
    alert: function (cfg) {
      $.extend(this.cfg,cfg,{winType: 'alert'})
      this.render()
      return this
    },

    confirm: function (cfg) {
      $.extend(this.cfg,cfg,{winType: 'confirm'})
      this.render()
      return this
    },

    prompt: function (cfg) {
      $.extend(this.cfg,cfg,{winType: 'prompt'})
      this.render()
      this._promptInput.focus()
      return this
    }
  })

  return {
    Window: Window
  }
})