# PCF-CanadianSINTextBox - Description
a PCF control made for canadian sin.


This custom control is basically a textbox make with react and fabric ui that implement canadian sin validator algorythm.  

here is an example:

![Alt text](/screenshots/ssncontrol.png?raw=true "demo")

# Known Limitations
* If the field is read-only from the form editor, the field is still editable.
* Field security profile may not work, test it before production use.
* if the bound field is required , somehow the save goes through. You'd need to add the field again on the form with the out of the box textbox control and hide it in order to have the default behavior of mandatory fields.
* Even if the SIN is invalid, user can save.

# Installation

Simply download the managed solution and import it into your CDS environment.

# Customization & setup guide
### Configuration options

Simple as this:

![Alt text](/screenshots/config.png?raw=true "config")





