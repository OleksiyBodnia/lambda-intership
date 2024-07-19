const imageList = document.getElementById('imageList');
const canvas = document.getElementById('canvas');
let selectedElement = null;
let offsetX, offsetY;

document
  .getElementById('imageInput')
  .addEventListener('change', handleFiles);

const uploaderLabel = document.querySelector('.photo-uploader');

uploaderLabel.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploaderLabel.classList.add('dragover');
});

uploaderLabel.addEventListener('dragleave', () => {
  uploaderLabel.classList.remove('dragover');
});

uploaderLabel.addEventListener('drop', (event) => {
  event.preventDefault();
  uploaderLabel.classList.remove('dragover');
  const files = event.dataTransfer.files;
  handleFiles({ target: { files } });
});

function handleFiles(event) {
  const files = event.target.files;
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.classList.add('image-thumbnail');
      img.addEventListener('click', () => addImageToCanvas(img.src));
      imageList.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

function addImageToCanvas(src) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('canvas-item');
  img.style.left = '100px';
  img.style.top = '100px';
  img.addEventListener('mousedown', startDrag);
  canvas.appendChild(img);
}

function addText() {
  const text = document.getElementById('textInput').value;
  const span = document.createElement('span');
  span.textContent = text;
  span.classList.add('canvas-item', 'canvas-text');
  span.style.left = '100px';
  span.style.top = '100px';
  span.addEventListener('mousedown', startDrag);
  canvas.appendChild(span);
}

function startDrag(event) {
  selectedElement = event.target;
  offsetX = event.clientX - selectedElement.offsetLeft;
  offsetY = event.clientY - selectedElement.offsetTop;
  document.addEventListener('mousemove', dragElement);
  document.addEventListener('mouseup', stopDrag);
}

function dragElement(event) {
  if (selectedElement) {
    selectedElement.style.left = `${event.clientX - offsetX}px`;
    selectedElement.style.top = `${event.clientY - offsetY}px`;
  }
}

function stopDrag() {
  document.removeEventListener('mousemove', dragElement);
  document.removeEventListener('mouseup', stopDrag);
  selectedElement = null;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Delete' && selectedElement) {
        canvas.removeChild(selectedElement);
        selectedElement = null;
    }
});
