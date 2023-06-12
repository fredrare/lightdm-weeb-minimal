# lightdm-weeb-minimal
## Summary
A lightdm greeter based on lightdm-gab-gradient, customized a bit for your minimal weeb needs. See the [live demo](https://fredrare.github.io/lightdm-weeb-minimal).

## Features
- Apple-styled shadows and corners
- Fractal noise-based aesthetic pastel background
- Date in japanese
- Time with seconds
- Multi-user
- Anti-shoulder-surfing ultra-secure password field
- Keyboard-navigation support
- Built-in fonts

## Screenshot
![Screenshot](static/img/demo.png "Demo screenshot")

## Installation guide:
1. Install  `lightdm` and `web-greeter`.
```sh
# Remember to update your system, pls
sudo pacman -Syu

# Now, you can proceed
sudo pacman -S lightdm
yay -S web-greeter
```
2. Enable `lightdm`.
```sh
sudo systemctl enable lightdm
```
3. In the terminal, navigate to `/usr/share/web-greeter/themes`.
```sh
cd /usr/share/web-greeter/themes
```
4. Clone this repository.
```sh
sudo git clone https://github.com/fredrare/lightdm-weeb-minimal.git weeb-minimal
```
5. Enable the theme in your `/etc/lightdm/web-greeter.yml` by going to the `greeter` section, finding the `theme` variable and replacing its value with `weeb-minimal`.
6. Edit `/etc/lightdm/lightdm.conf`, find the `greeter_session` variable and replace its value with `web-greeter`.
