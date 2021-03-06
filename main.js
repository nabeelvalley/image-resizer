const input = document.getElementById('input')
const button = document.getElementById('button')
const message = document.getElementById('message')
const result = document.getElementById('result')

let completeCount = 0
let totalCount = 0

button.onclick = () => input.click()

const download = (canvas) => {
  const link = document.createElement('a')
  const fileName = Date.now()
  link.download = fileName + '_resize.png'
  link.href = canvas.toDataURL()
  link.click()
  increment()
}

const paintVertical = (image) => {
  const canvas = document.createElement('canvas')

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
  download(canvas)
}

const paintHorizontal = (image) => {
  const canvas = document.createElement('canvas')

  const width = image.width
  const height = (image.width * 5) / 4

  const top = (height - image.height) / 2

  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.drawImage(image, 0, top)
  download(canvas)
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

const increment = () => {
  completeCount++
  message.innerHTML = 'Completed ' + completeCount + ' of ' + totalCount
}

const updateImageDisplay = () => {
  const files = input.files
  if (files.length === 0) {
    message.innerHTML = 'No Images Selected'
  }

  totalCount = files.length
  message.innerHTML = 'Completed 0 of ' + totalCount

  for (const file of files) {
    console.log(file)

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = onDataLoaded
  }
}

input.addEventListener('change', updateImageDisplay)
