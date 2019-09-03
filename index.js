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

const express = require('express')
const logger = require('./middleware/logger')
const Screen = require('./Screen')
const PixelsApi = require('./routes/api/pixels')
const app = express();

app.use(logger);
app.use(express.json()); // Body Parser
app.use(express.urlencoded({ extended: false }));

const spiDevice = process.env.spi || '/dev/spidev1.0'
const screen = new Screen(21, 12, spiDevice);
const pixelsApi = new PixelsApi(screen);
app.use('/api/pixels', pixelsApi.router);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));