const input = document.getElementById('input')
const canvas = document.getElementById('canvas')
const button = document.getElementById('button')

button.onclick = () => input.click()

const download = () => {
  const link = document.createElement('a')
  const fileName = Date.now()
  link.download = fileName + '_resize.png'
  link.href = document.getElementById('canvas').toDataURL()
  link.click()
}

const paintVertical = (image) => {
  const width = image.height
  const height = (width * 5) / 4
  const top = (height - width) / 2
  const left = (width - image.width) / 2

  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.drawImage(image, left, top)
  download()
}

const paintHorizontal = (image) => {
  const width = image.width
  const height = (image.width * 5) / 4

  const top = (height - image.height) / 2

  console.log(top)

  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.drawImage(image, 0, top)
  download()
}

const onDataLoaded = (event) => {
  const file = event.target.result
  const image = new Image()

  image.src = file
  image.onload = () => {
    if (image.height > image.width) {
      paintVertical(image)
    } else {
      paintHorizontal(image)
    }
  }
}

const updateImageDisplay = () => {
  const files = input.files
  if (files.length === 0) {
    return
  }

  const file = files[0]

  console.log(files)

  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onloadend = onDataLoaded
}

input.addEventListener('change', updateImageDisplay)
