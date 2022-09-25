let refImgWidth = (refTips.value as HTMLButtonElement).clientWidth / 2;
  movePositon = ev.clientX - refSliderEl.getBoundingClientRect().left;
  // 如果当前往左的偏移量大于提示框宽度
  if (movePositon < refImgWidth) {
    state.hoverTipsLeft = (refImgWidth - movePositon) + 'px'
  } else if ((refSliderEl.clientWidth - movePositon) < refImgWidth) {
    // 如果当前往右的偏移量大于提示框宽度  （总宽度-当前移动位置）< tips一半的宽度
    state.hoverTipsLeft = (refSliderEl.clientWidth - movePositon) - refImgWidth + 'px'
  } else {
    state.hoverTipsLeft = '50%'
  }