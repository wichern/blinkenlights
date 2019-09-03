/*
 * This file is part of blinkenlights.
 *
 * blinkenlights is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * blinkenlights is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 */

 const SPI = require('spi');
const WS2801 = require('ws2801-connect')

class Screen
{
    constructor(width, height, device)
    {
        this.width = width;
        this.height = height;
        this.length = width*height;

        this.pixels = []
        for (let i = 0; i < this.length; ++i) {
            this.pixels.push({ r: 0, b: 0, g: 0});
        }

        this.spi = new SPI.Spi(device);
        this.spi.maxSpeed(20000); // in Hz
        try {
            this.spi.open();
        } catch (e) {
            console.log(`Opening SPI failed: ${e.message}`);
            // Create shallow object for further calls to this.spi.
            this.spi = { write: function(t) {} };
        }

        this.ws2801 = new WS2801({
            count: this.width * this.height,
            spiWrite: (data) => { this.spi.write(data); }
        });
        this.ws2801.clear().show();
    }

    close() {
        this.spi.close();
    }

    getPixelAsJson(idx) {
        return this.pixels[idx];
    }
}

module.exports = Screen;