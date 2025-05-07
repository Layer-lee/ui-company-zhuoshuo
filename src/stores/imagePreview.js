import { ref } from 'vue'

export function useImagePreview() {
  const isOpen = ref(false)
  const currentImage = ref('')
  const currentIndex = ref(0)
  const imageList = ref([])

  const openPreview = (imgUrl, index = 0, images = []) => {
    imageList.value = images?.length > 0 ? images : [imgUrl]
    currentIndex.value = index
    currentImage.value = imageList.value[currentIndex.value]
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closePreview = () => {
    isOpen.value = false
    document.body.style.overflow = ''
  }

  const showPrev = () => {
    if (imageList.value.length <= 1) return
    currentIndex.value =
      currentIndex.value > 0 ? currentIndex.value - 1 : imageList.value.length - 1
    currentImage.value = imageList.value[currentIndex.value]
  }

  const showNext = () => {
    if (imageList.value.length <= 1) return
    currentIndex.value =
      currentIndex.value < imageList.value.length - 1 ? currentIndex.value + 1 : 0
    currentImage.value = imageList.value[currentIndex.value]
  }

  return {
    isOpen,
    currentImage,
    currentIndex,
    imageList,
    openPreview,
    closePreview,
    showPrev,
    showNext,
  }
}
