"""
Steps to Find Entry IDs in a Google Form
1. Open the Form
Go to your Google Form in a web browser.

2. Open Developer Tools
Right-click anywhere on the page and select Inspect (DevTools).

Go to the Network tab.

Check the Preserve log option.

3. Submit a Test Response
Fill out the form with any data.

Click the Submit button.

In the Network tab, look for a request named formResponse (or similar).

Click on it and go to the Payload or Form Data section.

"""


import requests

form_url = "https://docs.google.com/forms/d/e/your_form_id/formResponse"

form_data = {
    "entry.XXXXXXXX": "Sandesh (request)",  # make this ish whatever you want, but it has to be WORD FOR WORD BAR FOR BAR the answer
}



# Send the form submission
response = requests.post(form_url, data=form_data)

# submission check 
if response.status_code == 200:
    print("Form submitted :rage:")
else:
    print(f"Failed to submit form: {response.status_code}  :pensive:")

