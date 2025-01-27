const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');
    const buttonContainer = document.querySelector('.button-container');
    const extractedTextDiv = document.getElementById('extracted-text');

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result; // Set the image source to the uploaded file
                imagePreview.style.display = 'block'; // Show the image preview
                buttonContainer.style.display = 'block'; // Show the submit button
                extractedTextDiv.style.display = 'none'; // Hide extracted text initially
            };
            
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    });

    document.querySelector('.submit-button').addEventListener('click', async function() {
        const file = fileInput.files[0];
        
        if (file) {
            const formData = new FormData();
            formData.append("file",file)
            
            const response = await fetch("/", {
                method:"POST",
                body:formData
            })
            
            const value = await response.json();
            extractedTextDiv.innerHTML = `<strong>Extracted Text:</strong><br>${value.text}`;
            extractedTextDiv.style.display = 'block'; // Show extracted text

        }
    });