function popIt(url) {
	var leftPos = screen.width - 720;
	ref = window.open(url,"thePop","menubar=1,resizable=1,scrollbars=1,status=1,height=400,width=710,left="+leftPos+",top=0")
	ref.focus();
}