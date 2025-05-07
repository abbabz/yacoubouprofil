function submitForm() {
            setTimeout(function() {
                window.location.reload();
            }, 100); // Delay to allow mailto action to complete
            return true; // Proceed with form submission
        }
