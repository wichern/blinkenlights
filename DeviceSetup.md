This guide will assume that the host runs on an Ubuntu 18.04 and we will flash an Odroid XU4 with an Ubuntu 18.04 as well.

```bash
sudo apt install wget binfmt-support qemu-user-binfmt
```

```bash
# Download image.
wget https://odroid.in/ubuntu_18.04lts/XU3_XU4_MC1_HC1_HC2/ubuntu-18.04.1-4.14-minimal-odroid-xu4-20181203.img.xz

# Extract
xz -d ubuntu-*.img.xz

# Find out which device to use
df -h

# Flash
sudo dd if=ubuntu-*.img of=/dev/sdX status=progress

# Start the device and connect.
ssh root@odroid
```

## Prepare Target

```bash
# Change root password
passwd
# Enter a secure password.

# Add new user account.
adduser user
# Enter a secure password.

# Add user to sudo group
usermod -a -G sudo user

# Change hostname to 'blinkenlights'
hostnamectl set-hostname blinkenlights

# Reconnect [CTRL]+[D]
ssh user@blinkenlights # blinkenlights might not immediately work as new hostname.

# Update system
sudo apt update
sudo apt upgrade
sudo apt autoremove
sudo apt clean

# Install required modules
sudo apt install nodejs npm ssh openssh-server

# Allow non-root access to /dev/spi*
echo 'SUBSYSTEM=="spidev", GROUP="spiuser", MODE="0660"' | sudo tee /etc/udev/rules.d/50-spi.rules > /dev/null
sudo groupadd spiuser
sudo adduser user spiuser
```

## `/etc/systemd/system/blinkenlights.service`
```
[Unit]
Description=Blinkenlights
#Requires=After=mysql.service

[Service]
ExecStart=/usr/local/bin/node /opt/nodeserver/server.js
# Required on some systems
#WorkingDirectory=/opt/nodeserver
Restart=always
# Restart service after 10 seconds if node service crashes
RestartSec=10
# Output to syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=blinkenlights
User=user
Group=user
Environment=NODE_ENV=production PORT=80

[Install]
WantedBy=multi-user.target
```

```bash
cd /opt
git clone https://github.com/wichern/blinkenlights.git
cd blinkenlights
npm install
systemctl enable blinkenlights.service
# npm run start
```

## Wiring

WS2801
* Red: 5V+
* Blue: GND
* Yellow: MOSI
* Green: SCLK

## Fan

https://magazine.odroid.com/article/fan-control-tailor-odroid-xu4-perfect-settings/