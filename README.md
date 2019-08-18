# blinkenlights
A wall of blinken lights.

## Prepare Device

This guide will assume that the host runs on an Ubuntu 18.04 and we will flash an Odroid XU4 with an Ubuntu 18.04 as well.

```bash
sudo apt install wget binfmt-support qemu-user-binfmt
```

```bash
# Download image.
wget https://odroid.in/ubuntu_18.04lts/XU3_XU4_MC1_HC1_HC2/ubuntu-18.04.1-4.14-minimal-odroid-xu4-20181203.img.xz
xz -d ubuntu-*.img.xz

# Check where the rootfs partition is.
sudo fdisk -l ubuntu-*.img

# Mount rootfs at /mnt.
sudo mount -t auto -o loop,offset=$((512*264192)) ubuntu-*.img /mnt
sudo mount --bind /proc proc
sudo mount --bind /tmp tmp
sudo mount --bind /sys sys
sudo mount --bind /dev dev
sudo mount --bind /dev/pts dev/pts
sudo mount --bind /run run

# chroot into Odroids Ubuntu rootfs.
sudo chroot /mnt

# Clean up
sudo umount dev/pts
sudo umount dev
sudo umount sys
sudo umount tmp
sudo umount proc
```

```bash
sudo apt update
sudo apt upgrade
sudo apt install nodejs npm
sudo apt autoremove
sudo apt clean
```

https://www.tecmint.com/initial-ubuntu-server-setup-guide/

```bash
git clone https://github.com/wichern/blinkenlights.git
cd blinkenlights
npm install
npm run start
```
