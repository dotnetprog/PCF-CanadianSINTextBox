# PCF-CanadianSINTextBox - Description
a PCF control made for canadian sin.


This custom control is basically a textbox make with react and fabric ui that implement canadian sin validator algorythm.  

here is an example:
![Alt text](/screenshots/ssncontrol.png?raw=true "demo")
### Important!
For some reasons, you cannot bind address composite fields such as address1_country or address1_stateorprovinve 
from contact and account entity but may be used directly inside address entity or any custom text fields will work.

In the demo above, it has been used on custom text fields.

# Installation

Simply download the managed solution and import it into your CDS environment.

# Customization & setup guide
### Configuration options

*   **API Key** - api key from your canada post account. 
*   **Country code** - Default country code to use to retrieve address suggestions as user types
    
*   **Allow user to change country** - type "true" to enable this feature otherwise user cannot change the country.
*   **Enables canadapost logo** if set to "true" , It displays the address complete logo on the suggestion dropdown.
![Alt text](/Screenshots/config_sample.png?raw=true "config")
![Alt text](/Screenshots/config_sample2.png?raw=true "config 2")





