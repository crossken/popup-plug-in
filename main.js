require.config({
  paths: {
    jquery: 'lib/jquery-1.12.0.min',
    jqueryUI: 'http://code.jquery.com/ui/1.12.1/jquery-ui.min',
    widget: 'components/widget'
  }
})

require(['jquery','components/window'],($,w) => {

  $('#alert').click(function(event) {
    new w.Window().alert({
      title: '提示',
      content: 'welcome!',
      handlerAlertBtn: function(){
        alert('you click the alert button')
      },
      handlerCloseBtn: function(){
        alert('you click the close button')
      },
      width: 300,
      height: 150,
      y: 140,
      hasCloseBtn: true,
      skinClassName: 'window_skin_a',
      textAlertBtn: 'OK',
      dragHandle: '.window_header'
    })
  })

  $('#confirm').click(function(event) {
    new w.Window().confirm({
      title: '系统消息',
      content: '您确定要删除这个文件吗',
      handlerConfirmBtn: function(){
        alert('确定')
      },
      handlerCancelBtn: function(){
        alert('取消')
      },
      width: 300,
      height: 150,
      y: 140,
      dragHandle: '.window_header'
    })
  })

  $('#prompt').click(function(event) {
    new w.Window().prompt({
      title: '请输入你的名字',
      content: '我们将会为您保密您输入的信息',
      textPromptBtn: '输入',
      defaultValuePromptInput: '张三',
      handlerPromptBtn: function(inputValue){
        alert('您输入的内容是' + inputValue)
      },
      handlerCancelBtn: function(){
        alert('取消')
      },
      width: 300,
      height: 150,
      y: 140,
      dragHandle: '.window_header'
    })
  })

})