const SPI = require('spi');
const WS2801 = require('ws2801-connect')

class Screen
{
    constructor()
    {
        this.spi = new SPI.Spi('/dev/spidev1.0');
        this.spi.maxSpeed(20000); // in Hz
        this.spi.open();

        //this.ws2801 = new WS2801(252);

        var txbuf = new Buffer([ 0x00, 0xFF, 0x00 ]);
        var rxbuf = new Buffer([ 0x00, 0x00, 0x00 ]);

        for (var x = 0; x < 10; ) {
            this.spi.transfer(txbuf, rxbuf);
        }
    }
}

module.exports = Screen;