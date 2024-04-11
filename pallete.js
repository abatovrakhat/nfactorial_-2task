document.addEventListener('DOMContentLoaded', function() {
  const addColorButton = document.getElementById('add-color');
  const deleteColorButton = document.getElementById('delete-color');
  const savePaletteButton = document.getElementById('save-pallete');
  const colorPalette = document.querySelector('.color-palette');
  const selectedColors = document.querySelector('.selected-colors');
  const savedPalettesContainer = document.querySelector('.saved-palettes');
  let selectedColorDivs = []; 
  let createdColorDivs = [];
  let count = 0;

  addColorButton.addEventListener('click', function() {
    if (colorPalette.childElementCount >= 5) {
      alert("You can only add up to 5 colors.");
      return;
    }

    const colorPicker = document.getElementById('color-picker');
    const color = colorPicker.value;
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    colorDiv.style.backgroundColor = color;
    colorDiv.addEventListener('click', function() {
      if (!selectedColorDivs.includes(colorDiv)) {
        selectedColorDivs.push(colorDiv);
        colorDiv.classList.add('selected');
      } else {
        const index = selectedColorDivs.indexOf(colorDiv);
        if (index !== -1) {
          selectedColorDivs.splice(index, 1);
          colorDiv.classList.remove('selected');
        }
      }
    });
    colorPalette.appendChild(colorDiv);
    createdColorDivs.push(colorDiv);
  });

  deleteColorButton.addEventListener('click', function() {
    selectedColorDivs.forEach(colorDiv => {
      const index = createdColorDivs.indexOf(colorDiv);
      if (index !== -1) {
        createdColorDivs.splice(index, 1); 
      }
      colorDiv.remove();
    });
    selectedColorDivs = []; 
  });

  savePaletteButton.addEventListener('click', function() {
    if (colorPalette.childElementCount < 5) {
      alert("Add 5 elements to save to the pallete.");
      return; 
    }
    if (count > 22) {
      alert("No place for palettes");
      return; 
    }
    
    const savedPalette = document.createElement('div');
    savedPalette.classList.add('saved-palette');
    createdColorDivs.forEach(colorDiv => {
      colorDiv.classList.remove('selected');
      savedPalette.appendChild(colorDiv.cloneNode(true));
    });

    
    savedPalette.querySelectorAll('.color').forEach(savedColor => {
      savedColor.addEventListener('click', function() {
        alert("Color value: " + savedColor.style.backgroundColor);
      });
    });

    
    const targetLocation = document.getElementById('target-location');
    targetLocation.appendChild(savedPalette);

    
    createdColorDivs.forEach(colorDiv => {
      colorDiv.classList.remove('selected');
    });
    selectedColorDivs = [];
    count++;
  });
});
